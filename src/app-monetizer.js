/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `app-monetizer`
 * Internal ads element
 *
 * @customElement
 * @polymer
 */
class AppMonetizer extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          padding-top: 10px;
          text-align: center;
          display: none;      /*table;*/
          height: 100%;
          width: 100%;
          padding: 0px;
        }
        div{
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background-color: lightgrey;
        }
      </style>
      <!-- div on-click="track"><slot>&#123; Ad Placeholder &#125;</slot></div -->
    `;
  }

  /**
   * {Placeholder method}
   * @returns {void}
   */
  track() {
    console.log('ad clicked');
  }
}

window.customElements.define('app-monetizer', AppMonetizer);
