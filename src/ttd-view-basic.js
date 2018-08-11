/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class TtdViewBasic extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          --num-cols: 1;
          display: block;
          padding: 10px;
        }

        /* Tiny Mobile Styles */
        ttd-tray{
          width: 100%;
          display: inline-grid;
          grid-gap: 5px;
          grid-template-rows: auto;
          grid-template-columns: --num-cols 1fr;
        }

        ttd-tray > *{
          border: 1px solid black;
        }

        ttd-history{
          grid-column: 1 / span --num-cols;
        }

        /* Mobile Styles */
        @media (min-width: 350px) {
          :host{
            --num-cols: 2;
          }
        }

        /* Mobile Styles */
        @media (max-width: 850px) {
          :host{
            --num-cols: 3;
          }
        }


      </style>

        <div class="card">
          <slot>
            <ttd-tray>
              <ttd-history></ttd-history>
              <ttd-sum></ttd-sum>
              <ttd-die sides="4"></ttd-die>
              <ttd-die></ttd-die>
              <ttd-die sides="8"></ttd-die>
              <ttd-die sides="10"></ttd-die>
              <ttd-die sides="12"></ttd-die>
              <ttd-die sides="20"></ttd-die>
              <ttd-exclude></ttd-exclude>
              <ttd-custom></ttd-custom>
              <ttd-custom-roll></ttd-custom-roll>
              <ttd-clear></ttd-clear>
            </ttd-tray>
          </slot>
        </div>
    `;
  }
}

window.customElements.define('ttd-view-basic', TtdViewBasic);
