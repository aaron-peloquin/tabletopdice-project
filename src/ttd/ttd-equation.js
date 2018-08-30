/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './../-ttd-sharedStyles.js';
import {TtdEquationHelper} from './-ttd-equationHelper.js';

/**
 * `ttd-equation`
 * Allows the user to input a string of "dice logic", then "roll" that string
 * It feels odd, but seems to be intuative to  me and my alpha testers, and it was
 * independently requested by two of them, so I have a feeling it will be popular
 *
 * @customElement
 * @polymer
 */
class TtdEquation extends TtdEquationHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
        :host {
          height:100%;
          width:100%;
          flex-wrap: nowrap;
          text-align: center;

          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
            "string__ string__ roll____"
            "result__ result__ roll____";
          align-items: center;
        }

        form{
          display: inline-grid;
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
          background-color: var(--ttd-clean-background-color);
          color: var(--ttd-clean-color);
        }
        input:focus{
          outline: none;
        }

        form        { grid-area: string__; }
        .result     { grid-area: result__; }
        .roll       { grid-area: roll____; }

        .roll {
          border-radius: 5px;
          margin: 3px;
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
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas: "string__ string__ string__ result__ roll____";
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
        <span class="result" aria-live="polite">{{result}}</span>
        <span class="roll button animate-shake" on-click="roll" role="button"><slot>Roll</slot></span>
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
    this.customString = this.cleanseEquationStr(this.customString);
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
   * Parse and 'roll' the custom dice equation string (customString)
   * Push dice results into tray element, but do not use it's method to roll
   * Instead use our own internally to better track button clicks vs 
   * die equation strings in google analytics
   * @returns {str} The new this.result value;
   */
  roll() {
    var rollResult = 0;
    if(this.customString=='') {
      this.result = 0;
      this.shadowRoot.querySelector('input').focus();
    }
    else {
      this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
      let diceEquation = this.rollEquationDice(this.customString);
      this.trayElement.fullRefresh();
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
