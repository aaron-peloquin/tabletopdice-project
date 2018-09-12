/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './../-ttd-sharedStyles.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-average`
 * Displays the average of all dice rolled
 *
 * @customElement
 * @polymer
 */
class TtdAverage extends TtdChildHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
      :host{
          font-size: smaller;
          position: relative;
          text-align: center;

          /* Text selection */
          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }

        .results-wrapper {
          align-items: center;
          display: grid;
          height: 100%;
        }

        .average {
          margin-top: 20px;
        }

        /* IE10+ CSS styles go here */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          span {
            font-size: inherit;
          }
        }

      </style>
      <div class="results-wrapper" aria-live="polite" title="Note: The average of 1d20 is 10.5">
        <span class="readout-text">Average</span>
        <span class="average">[[avg]]</span>
      </div>
    `;
  }

  /**
   * @param {num} avg The current average of all dice results
   */
  static get properties() {
    return {
      avg: {
        type: Number,
        value: 0,
        reflectToAttribute: true,
      }
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] to reset the rolled count
   * @returns {void}
   */
	ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    this.trayElement.addEventListener('_updateHistory', e => {this.updateResults(e)});
  }

  /**
   * Updates the this.avg value using the dice results
   * @param {obj} e eventListener contains the updated data from _updateHistory listener.
   * @returns {void}
   */
  updateResults(e) {
    this.avg = 0;
    let dieSides = this.die;

    /** Get an array of the new result values, limited to only the dieSides */
    let newResults = e.detail.data.map(r=>r.result);

    if(newResults.length<1) {
      return;
    }

    this.avg = this.getAverage(newResults).toFixed(2);
  }

  /**
   * Processes an array of numbers, returning their average.
   * @param {array} arr An array of numbers
   */
  getAverage(arr) {
    return arr.reduce((a,b)=>a+b, 0) / arr.length;
  } 


}

window.customElements.define('ttd-average', TtdAverage);
