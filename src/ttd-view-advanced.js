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
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './shared-styles.js';
import './app-monetizer.js';
import './ttd/ttd-tray.js';
import './ttd/ttd-history.js';
import './ttd/ttd-sum.js';
import './ttd/ttd-die.js';
import './ttd/ttd-clear.js';
import './ttd/ttd-exclude.js';
import './ttd/ttd-custom.js';
import './ttd/ttd-custom-roll.js';

class TtdViewAdvanced extends PolymerElement {
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
          margin: 0 auto;
        }

        .tray-wrapper{
          margin: 21px;

        }

        ttd-tray{
          width: 100%;
          display: inline-grid;
          grid-gap: 1rem;
          grid-template-rows: auto;
          grid-template-columns: var(--cols-grid-template);
        }

        ttd-tray > *{
          border-radius: 5px;
          background-color: var(--app-ttd-default-background-color);
          color: var(--app-ttd-child-color);
          grid-column-end: var(--cols-default-child);
          overflow: hidden;
        }

        ttd-tray ttd-history,
        ttd-tray ttd-sum,
        ttd-tray ttd-clear{
          background-color: var(--app-ttd-secondary-background-color);
          color: var(--app-ttd-secondary-color);
        }

        ttd-tray ttd-custom,
        ttd-tray ttd-custom-roll{
          background-color: var(--app-ttd-special-background-color);
        }

        /* History always takes up 1 whole row */
        ttd-tray ttd-history{
          grid-column-end: span var(--cols-num);
        }

        ttd-tray ttd-exclude{
          grid-column-end: var(--cols-ttd-exclude);
          font-family: var(--app-font-family);
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
          <div class="tray-wrapper">
            <template is="dom-if" if="[[!browserSupported]]">
              <h1>Unsupported Browser</h1>
              <p>
                <div>Supported Browsers:</div>
                <ul>
                  <li>Google Chrome</li>
                  <li>Microsoft Edge</li>
                  <li><em>Firefox</em></li>
                </ul>
            </template>
            <template is="dom-if" if="[[browserSupported]]">
              <slot>
                <ttd-tray>
                  <ttd-history excited></ttd-history>
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
            </template>
          </div>
          <app-monetizer>Ads for high rollers</app-monetizer>
        </div>
    `;
  }

  static get properties() {
    return {
      browserSupported: {
        type: Boolean,
        value: true,
      },
      page: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
    };
  }

  ready(){
    super.ready();
    //Check if this browser is currently supported.
    this.browserSupported = this.isSupported();
  }

  isSupported() {
    var ua = window.navigator.userAgent;
    var ieClassic = (ua.indexOf("MSIE")>0);
    var ieEleven = (!!ua.match(/Trident\/7\./));
    if (ieClassic || ieEleven){
      return false;//This is IE.
    }
    return true; //This is not IE
  }
}

window.customElements.define('ttd-view-advanced', TtdViewAdvanced);
