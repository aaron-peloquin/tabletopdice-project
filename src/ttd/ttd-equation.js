/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-equation`
 * Allows the user to input a string of "dice logic", then "roll" that string
 * It feels odd, but seems to be intuative to  me and my alpha testers, and it was
 * independently requested by two of them, so I have a feeling it will be popular
 *
 * @customElement
 * @polymer
 */
class TtdEquation extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          height:100%;
          width:100%;
          flex-wrap: nowrap;
          text-align: center;
          height:100%;
          width: 100%;

          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
            "string__ string__ roll__"
            "exclude_ exclude_ result";
          align-items: center;
        }

        form{
          display: inline-grid;
          grid-area: string__;
          height: 100%;
        }

        form > *{
          grid-column: 1;
          height: 100%;
        }

        div{
          height: 100%;
          width: 100%;
          display: inline-grid;
          align-items: center;
        }

        div > *{
          grid-row: 1;
        }

        input{
          height: 100%;
          width: 100%;
          margin-right: -1px;
          font-size: inherit;
          border: 0;
          min-width: 0;
          font-family: var(--app-font-family);
          font-weight: var(--app-font-weight);
          background-color: var(--app-ttd-clean-background-color);
          color: var(--app-ttd-clean-color);
        }
        input:focus{
          outline: none;
        }

        .result{
          grid-area: result;
        }

        .roll{
          grid-area: roll__;
        }

        .exclude{
          grid-area: exclude_;
        }

        select{
          border: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          grid-column: 1;
          grid-row: 1;
          height: 100%;
          margin-right: -1px;
          min-width: 0;
          width: 100%;
        }

        span{
          padding: .25em;
          display: table-cell;
          vertical-align: middle;
        }

        /* [Responsive] Medium Styles */
        @media (min-width: 600px) {
          :host{
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas: "string__ string__ string__ exclude_ result roll__";
          }
          select{
            border-left: 1px solid;
          }
        }

        /* IE10+ CSS styles go here */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          :host {
            display: flex;
          }
        }

        </style>
        <form>
          <div>
            <input
              aria-label="Dice command string (example: 1d8+3+(2d20*0)). Note: The maximum dice to roll is 999d999"
              title="Max: 999d999"
              placeholder="{{placeholder}}"
              value="{{customString::input}}" />
          </div>
        </form>
        <template is="dom-if" if="[[exclude]]">
          <div class="exclude">
            <select aria-label="Select die to exclude from the this equation's result" value="{{excludeDie::change}}">
              <option value="0" selected$="{{parseSelected(0)}}">All Dice</option>
              <option value="4" selected$="[[isExclude(4)]]">Skip d4s</option>
              <option value="6" selected$="[[isExclude(6)]]">Skip d6s</option>
              <option value="8" selected$="[[isExclude(8)]]">Skip d8s</option>
              <option value="10" selected$="[[isExclude(10)]]">Skip d10s</option>
              <option value="12" selected$="[[isExclude(12)]]">Skip d12s</option>
              <option value="20" selected$="[[isExclude(20)]]">Skip d20s</option>
              </select>
          </div>
        </template>
        <span class="result">{{result}}</span>
        <span class="roll" on-click="roll"><slot>Roll</slot></span>
      </form>
      `;
  }

  /**
   * @param {str} customString Binded to the input element in this template
   * automatically updates on user input
   * triggers this.stringChanged() on change
   * @param {num} result The current result from running this dice equation
   * @param {str} parsedEquation This displays the most recently
   * parsed (and randomly rolled) equation
   * @param {str} defaultLanguage The default language used in the <option> when no die is selected
   * @param {str} prefix The default language used in <options> before the number of sides written to markup
   * @param {str} append The default language used in <options> after the number of sides is written to markup
   * @param {str} placeholder Placeholder text for the <input /> tag
   * @param {num} excludeDie An optional die to exclude from this equation's result.
   * Note, this die is still rolled, it just always equates to a sum of 0
   * @param {num} exclude Boolean attribute that enables a user select to change the excludeDie to one of the standard die
   */
  static get properties() {
    return {
      customString: {
        type: String,
        value: '',
        observer: 'stringChanged',
      },
      result: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
      },
      parsedEquation: {
        type: String,
        value: "",
        reflectToAttribute: true,
      },
      diceTypes: {
        type: Array,
        value: function() { return []; },
      },
      placeholder: {
        type: String,
        value: "",
      },
      excludeDie: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
      },
      exclude: {
        type: Boolean,
        value: 0,
      }
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] listener to clear results
   * Update this.diceTypes with <ttd-tray>.standardPolyhedrons
   * Add [submit] to also roll this custom die
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }

    this.diceTypes = this.trayElement.standardPolyhedrons;
    this.trayElement.addEventListener('_clearResults', e => {this.clearResults(e)});
    this.shadowRoot.querySelector('form').addEventListener('submit', e=>{this.submitRoll(e)});
	}

  /**
   * Updates customString only have allowed characters and no spaces for visual
   * formatting and to make it clear to the user what will happen on "roll"
   * @returns {void}
   */
  stringChanged() {
    var parseLite = this.customString.replace(/([^\d|d|\+|\-|\*|\/|\(|\)])/gi, '').toLowerCase();
    this.customString = parseLite;
  }

  /**
   * @param {obj} e eventListener contains the updated data from the <form>'s submit event
   * @returns {void}
   */
  submitRoll(e) {
    e.preventDefault();
    this.roll();
  }

  /**
   * @param {var} s The sides of the <option> in this element's template to check
   * @returns {bool} true if s is exactly equal to this.excludeDie
   */
  parseSelected(s) {
    return s===this.excludeDie;
  }

  /**
   * Parse and 'roll' the custom dice equation string (customString)
   * Push dice results into tray element, but do not use it's method to roll
   * Instead use our own internally to better track button clicks vs 
   * die equation strings in google analytics
   * @returns {str} The new this.result value;
   */
  roll() {
    var rollResult = 0;
    var tray = this.trayElement;
    var exclude = this.excludeDie;
    if(this.customString=='') {
      this.result = 0;
      this.shadowRoot.querySelector('input').focus();
    }
    else {
      tray.dispatchEvent(new CustomEvent('_clearResults'));

      var diceEquation = this.customString.replace(/(\d+d+?\d+)/gi, function(m){
        rollResult = 0
        /** Get the number of dice and number of sides */
        var diceNumSides = m.split('d');
        if(diceNumSides.length!=2) {
          /** invalid dice string (eg. 1d4 and 20d100), return matched string */
          return m;
        }
        else {
          var diceNum = parseInt(diceNumSides[0]);
          var diceSides = parseInt(diceNumSides[1]);

          /** Don't allow a user to roll more than 999 dice in one set */
          if(diceNum > 999) {
            diceNum = 999;
          }

          /** Don't allow a user to roll a die with more than 999 sides */
          if(diceSides > 999) {
            diceSides = 999;
          }

          for(var i=0; i<diceNum;i++) {
            var value = tray.random(diceSides);
            if(diceSides!=exclude) {
              rollResult += value;
            }
            tray.results.push({"sides":diceSides, "result":value});
          }
          return rollResult;
        }
      });
      tray.fullRefresh();
      this.parsedEquation = diceEquation;
      try {
        /**
         * It should be reasonably safe to run eval() here, since we have already stripped out everything except
         * for digits, the lowercase letter 'd', and equation symbols (+, -, *, /)
        */
        let equationResult = Math.round(eval(diceEquation));
        if(isNaN(equationResult)) {
          throw "Invalid equation (NaN)";
        }
        this.result = equationResult.toLocaleString();
        /** Report equation results to google analytics */
        if(typeof gtag=='function') {
          gtag('event', 'rollEquation', {
            "event_category":"roll",
            'event_label': this.customString,
            'dieEquation': diceEquation,
            'rollResult': this.result
          });
        }
      }
      /** Throw custom error on failure to parse. */
      catch(e) {
        console.error('Invalid Dice String Equation: ',diceEquation);
        this.result = "ERR";
        /** Report error to Google Analytics */
        if(typeof gtag=='function') {
          gtag('event', 'rollEquationError', {
            "event_category":"error",
            'dieEquation': diceEquation
          });
        }
      }
    }
      
    return this.result;
  }

  /**
   * Clears the result of this dice equation 'roll'.
   * @returns {void}
   */
  clearResults() {
    this.result = 0;
  }
}

window.customElements.define('ttd-equation', TtdEquation);
