/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

/**
 * `ttd-view-home`
 * View for the catch-all 404 page.
 * Note: Does not send a 404 header.. That's a problem with SPA, since no pages actually exist until we load JS.
 *
 * @customElement
 * @polymer
 */
class MyView404 extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      <p>Oops you rolled a 404. Please head back <a href="[[rootPath]]">home</a> or use the navigation.</p>
      <p>If you feel you have reached this error in error, try clearing your web browser's cache &and data, then reload this page.</p>
    `;
  }
}

window.customElements.define('my-view404', MyView404);
