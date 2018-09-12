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
          display: table;
          height:100%;
          text-align: center;
          width: 100%;
        }
        div{
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <div on-click="clear" role="button"><slot>Clear</slot></div>
    `;
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * @returns {void}
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
    if(typeof gtag=='function') {
      gtag('event', 'clearResults', {
        "event_category":"clear"
      });
    }
    this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
  }
}

window.customElements.define('ttd-clear', TtdClear);
