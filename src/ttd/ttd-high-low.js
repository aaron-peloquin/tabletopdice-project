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
 * `ttd-high-low`
 * Displays the highest and lowest result from a specific die type.
 *
 * @customElement
 * @polymer
 */
class TtdHighLow extends TtdChildHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
      :host{
          text-align: center;
          font-size: smaller;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }

        div{
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
        }

        span.result,
        img{
          justify-self: center;
          align-self: center;
        }

        img{
          width: 50%;
        }

        .results-wrapper {
          margin-top: 20px
        }

        .results-wrapper .max {
          align-self: end;
        }

        .results-wrapper .min {
          align-self: start;
        }

        .invisible-text{
          font-size: 0px;
        }

        /* IE10+ CSS styles go here */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          img {
            width: inherit;
          }
          span {
            font-size: inherit;
          }
        }

      </style>
      <div class="results-wrapper" aria-live="polite">
        <span class="readout-text">High/Low</span>
        <span class="result max">{{max}}<span class="invisible-text">(high), </span></span>
        <img src="[[dieImageURI(die)]]" alt="[[die]] sided die image" />
        <span class="result min">{{min}}<span class="invisible-text">(low), [[avg]](average)</span></span>
      </div>
    `;
  }

  /**
   * @param {num} die The number of sides on the die you want to report for
   * @param {num} min The current minimum result of your chosen die,
   * updated automatically on _updateHistory listener
   * @param {num} max The current maximum result of yoru chosen die,
   * updated automatically on _updateHistory listener
   */
  static get properties() {
    return {
      die: {
        type: Number,
        value: 20,
        reflectToAttribute: true,
      },
      min: {
        type: Number,
        value: '',
        reflectToAttribute: true,
      },
      max: {
        type: Number,
        value: '',
        reflectToAttribute: true,
      },
      avg: {
        type: Number,
        value: '',
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
   * Updates this.min, this.max, and this.avg values
   * @param {obj} e eventListener contains the updated data from _updateHistory listener.
   * @returns {void}
   */
  updateResults(e) {
    this.min = 0;
    this.max = 0;
    this.avg = 0;
    let dieSides = this.die;

    /** Get an array of the new result values, limited to only the dieSides */
    let newResults = e.detail.data
      .filter((r)=>{ return r.sides==dieSides; })
      .map(r=>{return r.result});

    if(newResults.length<1) {
      return;
    }

    this.max = Math.max(...newResults);
    this.min = Math.min(...newResults);
    this.avg = this.getAverage(newResults);
  }

  /**
   * Processes an array of numbers, returning their average.
   * @param {array} arr An array of numbers
   */
  getAverage(arr) {
    return arr.reduce((a,b) => a + b, 0) / arr.length;
  } 


}

window.customElements.define('ttd-high-low', TtdHighLow);
