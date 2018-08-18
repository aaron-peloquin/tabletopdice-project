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
 * indipendantly requested by two of them, so I have a feeling it will be popular
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
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-template-areas: "input input input result result roll";
          grid-gap: 5px;
          align-items: center;
        }

        form{
          display: inline-grid;
          grid-area: input;
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
          grid-area: roll;
        }

        span{
          padding: .25em;
          display: table-cell;
          vertical-align: middle;
        }

        .invisible-text{
          font-size: 0px;
        }

      </style>
        <form>
          <div>
            <label class="invisible-text" for="custom-string">Dice command string (eg: 1d8+3+(2d20*0))</label>
            <input id="custom-string"
              title="Maximum 1,000 rolls of a 1,000 sided die per set, but no limit on string length or number of sets.. be careful!"
              placeholder="eg: 1d8+3+(2d20*0)"
              value="{{customString::input}}" />
          </form>
          </div>
          <span class="result">{{result}}</span>
        <span class="roll" on-click="roll"><slot style="font-size:smaller">Roll</slot></span>
      </form>
      `;
  }

  /**
   * @param {str} customString Tied to the input#custom-string element in this template
   * automatically updates on user input
   * triggers this.stringChanged() on change
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
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] listener to clear results
   * Add [submit] to also roll this custom die
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
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
   * Parse and "roll" this string of dice
   * Push dice results into tray element, but do not use it's method to roll
   * Instead use our own internally to better track button clicks vs 
   * die equation strings in google analytics
   * @returns {str} The new this.result value;
   */
  roll() {
    var rollResult = 0;
    var tray = this.trayElement;
    if(this.customString=='') {
      this.result = '';
    }
    else {
      tray.dispatchEvent(new CustomEvent('_clearResults'));

      var diceEquation = this.customString.replace(/(\d+d+?\d+)/gi, function(m){
        rollResult = 0
        /** Get the number of dice and number of sides */
        var diceNumSides = m.split('d');
        if(diceNumSides.length!=2) {
          //invalid dice string, return match.
          return m;
        }
        else {
          var diceNum = parseInt(diceNumSides[0]);
          var diceSides = parseInt(diceNumSides[1]);

          /** Don't allow a user to roll more than 999 times */
          if(diceNum > 999) {
            diceNum = 999;
          }

          /** Don't allow a user to roll a die with more than 999 times */
          if(diceSides > 99) {
            diceSides = 999;
          }

          for(var i=0; i<diceNum;i++) {
            var value = Math.floor(Math.random() * Math.floor(diceSides)) + 1;
            rollResult += value;
            tray.results.push({"sides":diceSides, "result":value});
          }
          return rollResult;
        }
      });
      tray.fullRefresh();
      try {
        /**
         * It should be reasonably safe to run eval() here, since we have already stripped out everything except
         * for digits, the lowercase letter 'd', and equation symbols (+, -, *, /)
        */
        var equationResult = Math.round(eval(diceEquation));
        this.result = equationResult.toLocaleString();
        /** Report equation results to google analytics */
        gtag('event', 'rollEquation', {
          'dieEquation': diceEquation,
          'rollResult': this.result
        });
      }
      catch(e) {
        console.error('Invalid Dice String Equation: ',diceEquation);
        this.result = "ERR";
        /** Report error to Google Analytics */
        gtag('event', 'rollEquationError', {
          'dieEquation': diceEquation,
        });
      }
    }
      
    return this.result;
  }

  /**
   * Clears the result of this dice string 'roll'.
   * @returns {void}
   */
  clearResults() {
    this.result = 0;
  }
}

window.customElements.define('ttd-equation', TtdEquation);
