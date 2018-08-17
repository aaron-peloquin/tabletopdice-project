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
 * `ttd-string-parser`
 * Allows the user to input a logical string
 *
 * @customElement
 * @polymer
 */
class TtdStringParser extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          flex-wrap: nowrap;
          text-align: center;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-areas: "input input result roll";
          height:100%;
          width: 100%;
        }

        form{
          display: table-cell;
          vertical-align: middle;
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
        form{
          grid-area: input
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
          <label class="invisible-text" for="custom-string">Dice command string (eg: 1d4 + 2d6 + 3)</label>
          <input id="custom-string" placeholder="eg: 1d4 + 2d6 + 3" value="{{customString::input}}" />
        </form>
          <span class="result"> = {{result}}</span>
        <span class="roll" on-click="roll"><slot>Roll</slot></span>
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
   * Add [_clearResults] to reset the rolled count
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
    var parseLite = this.customString.replace(/([^\d|d|\+|\-])/gi, '').toLowerCase();
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
   * Parses and "rolls" this string of dice
   * @returns {void}
   */
  roll() {
    this.rolled++;
    var modifier = 0;

    var dice = this.customString.match(/(\+|\-)|(\d+d?\d+)(\1)/gi);
    console.log('dice', dice);
    // this.customSides = Math.round(this.customSides);
    // this.trayElement.roll(parseInt(this.customSides));
  }

  /**
   * Clears the result of this dice string 'roll'.
   * @returns {void}
   */
  clearResults() {
    this.result = 0;
  }
}

window.customElements.define('ttd-string-parser', TtdStringParser);
