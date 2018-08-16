/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './shared-styles.js';
import './app-monetizer.js';
import './ttd/ttd-tray.js';
import './ttd/ttd-history.js';
import './ttd/ttd-die.js';
import './ttd/ttd-clear.js';

/**
 * `ttd-view-quick`
 * Very simple implimentation of a dice tray.
 *
 * @customElement
 * @polymer
 */
class TtdViewQuick extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          /* [Responsive] Tiny Styles */
          --cols-num: 4;
          --cols-grid-template: 1fr 1fr 1fr 1fr;
          --cols-default-child: span 2;
          --cols-ttd-exclude: span 3;
          --cols-ttd-clear: span 4;
          --cols-ttd-sum: span 1;

          --font-size-all: 8vw;

          font-size: var(--font-size-all);
          display: block;
          margin: 0 auto;
          padding: 10px;
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
          background-color: var(--app-ttd-default-background-color);
          box-shadow: 2px 2px 2px 1px var(--app-ttd-clean-color), -1px -1px 2px 1px var(--app-ttd-child-color);
          grid-column-end: var(--cols-default-child);
          color: var(--app-ttd-child-color);
          border-radius: 5px;
          overflow: hidden;

        }

        ttd-tray ttd-history,
        ttd-tray ttd-sum,
        ttd-tray ttd-clear{
          background-color: var(--app-ttd-secondary-background-color);
          color: var(--app-ttd-secondary-color);
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

        /* [Responsive] Small Styles */
        @media (min-width: 500px) {
          :host{
            --cols-num: 6;
            --cols-grid-template: 1fr 1fr 1fr 1fr 1fr 1fr;
            --cols-default-child: span 2;
            --cols-ttd-exclude: span 4;
            --cols-ttd-clear: span 6;
            --cols-ttd-sum: var(--cols-default-child);

            --font-size-all: 2.7rem;
            }
        }

        /* [Responsive] Medium + Styles */
        @media (min-width: 640px) {
          :host{
            --cols-ttd-clear: span 6;
          }
        }

      </style>

      <div class="card">
        <h1>Quick Dice Tray</h1>
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
                <ttd-die sides="4"></ttd-die>
                <ttd-die></ttd-die>
                <ttd-die sides="8"></ttd-die>
                <ttd-die sides="10"></ttd-die>
                <ttd-die sides="12"></ttd-die>
                <ttd-die sides="20"></ttd-die>
                <ttd-clear></ttd-clear>
              </ttd-tray>
            </slot>
          </template>
        </div>
        <app-monetizer></app-monetizer>
        <div class="card">
          <div class="copy-box">
            <p>
              This dice tray is meant to be the most straightforward stripped down version.
              It provides the only a readout of the dice rolled, and the standard array of polyhedral dice most commonly used in tabletop gaming to
              determine skill checks, chance to hit, deal damage, and make saving throws.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * @param {bool} browserSupported Updated when element initalizes, runs isSupported() to determin if the user is in IE.
   * @param {str} page This paramiter is shared between all views and the main my-app.js. It's the currently loaded page
   */
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

  ready() {
    super.ready();
    //Check if this browser is currently supported.
    this.browserSupported = this.isSupported();
  }

  isSupported() {
    var ua = window.navigator.userAgent;
    var ieClassic = (ua.indexOf("MSIE")>0);
    var ieEleven = (!!ua.match(/Trident\/7\./));
    if (ieClassic || ieEleven) {
      return false;//This is IE.
    }
    return true; //This is not IE
  }
}

window.customElements.define('ttd-view-quick', TtdViewQuick);
