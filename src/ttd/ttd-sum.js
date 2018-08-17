/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-sum`
 * Display the sum of all dice rolled, possibly excluding any results that the
 * user selected to exclude with <ttd-exclude>
 *
 * @customElement
 * @polymer
 */
class TtdSum extends TtdChildHelper {
  static get template() {
    return html`
      <style>
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
        }
        span{
          display: table-cell;
          vertical-align: middle;
          overflow: hidden;
        }
        .invisible-text{
          font-size: 0px;
        }
      </style>
      <span title="Roll results sum"><slot></slot>[[sum]]<span class="invisible-text">(Total)</span></span>
    `;
  }

  /**
   * @param {num} sum The current total of all rolled results
   */
  static get properties() {
    return {
      sum: {
        type: Number,
        value: 0,
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_updateSum] to update the local sum
   * @returns {void}
   */
	ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    this.trayElement.addEventListener('_updateSum', e => {this.updateSum(e)});
  }

  /**
   * Updates the local sum, formatting with comas
   * @param {obj} e contains the new sum of all dice rolled
   * @returns {void}
   */
  updateSum(e) {
    this.sum = 0;
    this.sum = e.detail.data.toLocaleString();
  }
}

window.customElements.define('ttd-sum', TtdSum);
