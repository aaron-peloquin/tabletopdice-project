/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-clear`
 * Clears all rolled value data from the application
 *
 * @customElement
 * @polymer
 */
class TtdClear extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          text-align: center;
          display: table;
          height:100%;
          width: 100%;
        }
        div{
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <div on-click="clear"><slot>Clear</slot></div>
    `;
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   */
  ready() {
		super.ready();
		this.findTray();
		if (!this.trayElement) {
			return false;
		}
	}

  /**
   * Dispatches the [_clearResults] event on the <ttd-tray> element
   * @returns {void}
   */
  clear() {
		if (!this.trayElement) {
			return false;
		}
    this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
  }
}

window.customElements.define('ttd-clear', TtdClear);
