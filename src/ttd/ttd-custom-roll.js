/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-custom`
 * Allow the app user to define a custom sided die (ie 1d100 or 1d32), then roll that die
 *
 * @customElement
 * @polymer
 */
class TtdCustomRoll extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          display: table;
          height:100%;
          text-align: center;
          width: 100%;
        }
        span{
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <span role="button"><slot>Roll</slot></span>
    `;
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [click] that will roll all custom die elements
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    this.addEventListener('click',e => {this.rollCustomDie(e)});
	}

  /**
   * Dispatch event [_rollCustomDie] on <ttd-tray>
   * @returns {void}
   */
  rollCustomDie() {
  if (!this.trayElement) {
    return false;
  }
  this.trayElement.dispatchEvent(new CustomEvent('_rollCustomDie'));
  }
}

window.customElements.define('ttd-custom-roll', TtdCustomRoll);
