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
          /* [Responsive] Tiny Styles */
          --cols-num: 4;
          --cols-grid-template: 1fr 1fr 1fr 1fr;
          --cols-default-child: span 2;
          --cols-ttd-exclude: span 3;
          --cols-ttd-custom: var(--cols-default-child);
          --cols-ttd-clear: span 4;
          --cols-ttd-sum: span 1;

          --font-size-all: 8vw;

          display: block;
          padding: 10px;
          font-size: var(--font-size-all);
          max-width: 800px;
          margin: 0 auto;
        }

        ttd-tray{
          width: 100%;
          display: inline-grid;
          grid-gap: 1rem;
          grid-template-rows: auto;
          grid-template-columns: var( --cols-grid-template);
        }

        ttd-tray > *{
          background-color: black;
          grid-column-end: var(--cols-default-child);
          overflow: hidden;
        }

        /* History always takes up 1 whole row */
        ttd-tray ttd-history{
          grid-column-end: span var(--cols-num);
        }

        ttd-tray ttd-exclude{
          grid-column-end: var(--cols-ttd-exclude);
        }

        ttd-tray ttd-clear{
          grid-column-end: var(--cols-ttd-clear);
        }

        ttd-tray ttd-sum{
          grid-column-end: var(--cols-ttd-sum);
        }

        ttd-tray ttd-custom{
          grid-column-end: var(--cols-ttd-custom);
        }

        /* [Responsive] Small Styles */
        @media (min-width: 500px) {
          :host{
            --cols-num: 6;
            --cols-grid-template: 1fr 1fr 1fr 1fr 1fr 1fr;
            --cols-default-child: span 2;
            --cols-ttd-exclude: span 4;
            --cols-ttd-clear: var(--cols-default-child);
            --cols-ttd-sum: var(--cols-default-child);

            --font-size-all: 2.7rem;
            }
        }

        /* [Responsive] Medium + Styles */
        @media (min-width: 640px) {
          :host{
            --cols-ttd-custom: span 4;
            --cols-ttd-clear: span 6;
          }
        }

        /* [Responsive] Large + Styles */
        @media (min-width: 800px) {
          :host{
            --cols-ttd-custom: var(--cols-default-child);
            --cols-ttd-clear: var(--cols-default-child);
          }
      </style>

        <div class="card">
          <slot>
            <ttd-tray>
              <ttd-history></ttd-history>
              <ttd-sum></ttd-sum>
              <ttd-exclude></ttd-exclude>
              <ttd-die sides="4"></ttd-die>
              <ttd-die></ttd-die>
              <ttd-die sides="8"></ttd-die>
              <ttd-die sides="10"></ttd-die>
              <ttd-die sides="12"></ttd-die>
              <ttd-die sides="20"></ttd-die>
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
