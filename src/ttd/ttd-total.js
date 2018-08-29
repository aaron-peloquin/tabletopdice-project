/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './../-ttd-sharedStyles.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-total`
 * Display the total of all dice rolled, possibly adding an exclusion dropdown for a type of dice
 *
 * @customElement
 * @polymer
 */
class TtdTotal extends TtdChildHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
        :host{
          text-align: center;
          display: table;
          height:100%;
          width: 100%;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */

          display: grid;
          grid-gap: 5px;
          grid-template-columns: 1fr;
          align-items: center;
        }

        .results-text{
          display: grid;
          overflow: hidden;
          position: relative;
          height: 100%;
          align-items: center;
        }

        select{
          border: 0;
          display: table-cell;
          font-size: inherit;
          font-weight: inherit;
          font-family: inherit;
          height: 100%;
        }

        .invisible-text{
          font-size: 0px;
        }
      </style>
      <span class="results-text" aria-label="Total of all dice rolled">
        <span class="readout-text">Total</span>
        <span class="sum">
          [[sum]]
        </span>
      </span>
      <template is="dom-if" if="[[exclude]]">
        <select aria-label="Excluding dice with this many sides" value="{{excludeDie::change}}">
          <option value="0" selected$="{{isExclude(0)}}">All Dice</option>
          <option value="4" selected$="[[isExclude(4)]]">Skip d4s</option>
          <option value="6" selected$="[[isExclude(6)]]">Skip d6s</option>
          <option value="8" selected$="[[isExclude(8)]]">Skip d8s</option>
          <option value="10" selected$="[[isExclude(10)]]">Skip d10s</option>
          <option value="12" selected$="[[isExclude(12)]]">Skip d12s</option>
          <option value="20" selected$="[[isExclude(20)]]">Skip d20s</option>
        </select>
      </template>
    `;
  }

  /**
   * Tag attributes
   * @param {num} sum The current total of all rolled results
   * @param {array} results Storage of all dice rolled
   * @param {bool} exclude If this attribute is set, it will show a
   * select input box of types of dice.
   * @param {num} excludeDie The number of sides to exclude by default
   * @param {array} excludeSides Automatically filled with the tray's supported dice types
   */
  static get properties() {
    return {
      sum: {
        type: Number,
        value: 0,
      },
      results: {
        type: Array,
        value: function() { return []; },
        observer: 'recalculateSum',
      },
      exclude: {
        type: Boolean,
        value: 0,
        notify: true,
      },
      excludeDie: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
        observer: 'recalculateSum',
      },
      /** Removed for now due to issues with MSIE11 */
/*      excludeSides: {
        type: Array,
        value: function() { return []; },
      },
*/
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Update this.diceTypes with <ttd-tray>.standardPolyhedrons
   * Add [_updateHistory] to update the local results
   * @returns {void}
   */
	ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    /** 
     * Reminder: <template> dom-repeat does not work in MSIE11 on <option> tags at the moment.
     * Have to just write normal <option> tags for now.
     * */
    //this.excludeSides = this.trayElement.standardPolyhedrons;
    this.trayElement.addEventListener('_updateHistory', e => {this.updateHistory(e)});
  }

  /**
   * Update (and reverse) the local results
   * @param {obj} e holds the new data dispatched from <ttd-tray>
   * @returns {void}
   */
  updateHistory(e) {
    this.results = [];
    this.results = e.detail.data;
  }

  /**
   * @param {var} s The sides of the <option> in this element's template to check
   * @returns {bool} true if s is exactly equal to this.exclude
   */
  isExclude(s) {
    return s===this.excludeDie;
  }

  /**
   * Updates the local sum, formatting with comas
   * Listen to the current this.excludedDie if one is set.
   * @param {obj} e contains the new sum of all dice rolled
   * @returns {num} Returns the new sum
   */
  recalculateSum(e) {
    this.sum = 0;
    var newSum = 0;
    let skipSides = this.excludeDie;

    if(this.results.length>0) {
      for(let r of this.results) {
        if(r.sides!=skipSides) {
          newSum += r.result;
        }
      };
    }
    this.sum = newSum.toLocaleString();
    return this.sum;
  }
}

window.customElements.define('ttd-total', TtdTotal);
