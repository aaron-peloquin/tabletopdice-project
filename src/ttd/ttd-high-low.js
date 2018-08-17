/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
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
      <style>
      :host{
          padding: 10px;
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
          font-size: 1.25rem;
          grid-row: 1fr;
        }

        img{
          width: 50%;
        }

        .invisible-text{
          font-size: 0px;
        }
      </style>
      <div class="results-wrapper">
        <span class="result">{{max}}<span class="invisible-text">(high), </span></span>
        <img src="[[dieImageURI(die)]]" />
        <span class="result">{{min}}<span class="invisible-text">(low)</span></span>
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
      },
      min: {
        type: Number,
        value: '',
      },
      max: {
        type: Number,
        value: '',
      },
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
    this.trayElement.addEventListener('_updateHistory', e => {this.updateMinMax(e)});
  }

  /**
   * Updates this.min and this.max
   * @param {obj} e eventListener contains the updated data from _updateHistory listener.
   * @returns {void}
   */
  updateMinMax(e) {
    this.min = 0;
    this.max = 0;
    var dieSides = this.die;
    var min = null;
    var max = null;

    e.detail.data.forEach(function(r) {
      if(dieSides==r.sides) {
        if (max === null || max < r.result) {
          max = r.result;
        }
        if (min === null || min > r.result) {
          min = r.result;
        }
      }
    });
    this.min  = min;
    this.max  = max;
  }

}

window.customElements.define('ttd-high-low', TtdHighLow);
