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
    <style include="shared-styles">
      :host {
        align-items: center;
        display: grid;
        flex-wrap: nowrap;

        grid-template-areas:
          "string__ string__ roll____"
          "result__ result__ roll____";
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;

        height:100%;
        text-align: center;
        width:100%;
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
        align-items: center;
        display: inline-grid;
        height: 100%;
        width: 100%;
      }

      div > *{
        grid-row: 1;
      }

      input{
        background-color: var(--ttd-clean-background-color);
        border: 0;
        color: var(--ttd-clean-color);

        font-family: var(--app-font-family);
        font-size: inherit;
        font-weight: var(--app-font-weight);

        height: 100%;
        margin-right: -1px;
        min-width: 0;
        width: 100%;
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
        display: table-cell;
        padding: .25em;
        vertical-align: middle;
      }

      /* [Responsive] Medium Styles */
      @media (min-width: 600px) {
        :host{
          grid-template-areas: "string__ string__ string__ result__ roll____";
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr;
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
      placeholder: {
        type: String,
        value: "",
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Ensure that this.ProcessingEquation is set to false
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

    this.processingEquation = false;
    this.trayElement.addEventListener('_clearResults', e => {this.clearResults(e)});
    this.shadowRoot.querySelector('form').addEventListener('submit', e=>{
      e.preventDefault();
      this.submitRoll();
    });
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
   * Handles <form> submissions, prevents default form submission, and stops
   * users from locking up their browser with multiple submissions of complex dice equations (ie: 999d999*999d999/999d999)
   * @returns {void}
   */
  submitRoll() {
    clearTimeout(this.debounceRoll);
    this.debounceRoll = this.setTimeout(() => {this.roll()}, 100);
  }

  /**
   * Parse and 'roll' the custom dice equation string (customString)
   * Push dice results into tray element, but do not use it's method to roll
   * Instead use our own internally to better track button clicks vs 
   * die equation strings in google analytics
   * @returns {str} The new this.result value. This is usually a number,
   * but could be formatted with commas, a string of "ERR", or an infinity symbol
   */
  roll() {
    let rollResult = 0;
    if(this.customString=='') {
      this.result = 0;
      this.shadowRoot.querySelector('input').focus();
    }
    else {
      this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
      let diceEquation = this.rollEquationDice(this.customString);
      this.trayElement.fullRefresh();
      this.parsedEquation = diceEquation;
      this.result = this.runEquation(diceEquation, this.customString);
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
