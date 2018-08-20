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
import './ttd/ttd-total.js';
import './ttd/ttd-die.js';
import './ttd/ttd-clear.js';
import './ttd/ttd-custom.js';
import './ttd/ttd-custom-roll.js';
import './ttd/ttd-high-low.js';
import './ttd/ttd-equation.js';

/**
 * `ttd-view-advanced`
 * Advanced implimentation of a dice tray.
 *
 * @customElement
 * @polymer
 */
class TtdViewAdvanced extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        /* [Responsive] Tiny Styles */
        ttd-tray{
          grid-template-columns: 1fr 1fr;

          /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
          grid-template-areas:
            "history history"
            "die___4 die___6"
            "die___8 die__10"
            "die__12 die__20"
            "total__ total__"
            "highLow clear__"
            "equat_m equat_m"
            "equat_o equat_o"
            "equat_t equat_t";
        }

        /* [Responsive] Small Styles */
        @media (min-width: 350px) {
          ttd-tray{
            grid-template-columns: 1fr 1fr 1fr;

            /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
            grid-template-areas:
              "history history history"
              "highLow total__ clear__"
              "highLow total__ clear__"
              "die___4 die___6 die___8"
              "die__10 die__12 die__20"
              "equat_m equat_m equat_m"
              "equat_o equat_o equat_o"
              "equat_t equat_t equat_t";
          }
        }

        /* [Responsive] Medium Styles */
        @media (min-width: 875px) {
          :host{
            font-size: 2rem;
          }
          ttd-tray{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:
              "history history history history total__ total__ highLow"
              "history history history history total__ total__ highLow"
              "die___4 die___4 die___6 die___6 die___8 die___8 clear__"
              "die__10 die__10 die__12 die__12 die__20 die__20 clear__"
              "equat_m equat_m equat_m equat_m equat_m equat_m equat_m"
              "equat_o equat_o equat_o equat_o equat_o equat_o equat_o"
              "equat_t equat_t equat_t equat_t equat_t equat_t equat_t";
            }
        }

        /** [Responsive] Large Styles */
        @media screen and (min-width: 1200px) {
          :host{
             font-size: 32px;
          }
        }
        </style>

        <div class="card">
          <h1>Advanced dice tray</h1>
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
                  <ttd-clear></ttd-clear>
                  <ttd-history excited></ttd-history>
                  <ttd-total exclude exclude-die="20"></ttd-total>
                  <ttd-high-low die="20"></ttd-high-low>
                  <ttd-die sides="4"></ttd-die>
                  <ttd-die></ttd-die>
                  <ttd-die sides="8"></ttd-die>
                  <ttd-die sides="10"></ttd-die>
                  <ttd-die sides="12"></ttd-die>
                  <ttd-die sides="20"></ttd-die>
                  <ttd-equation class="main-hand" placeholder="eg. 3d6+4"></ttd-equation>
                  <ttd-equation class="off-hand" placeholder="eg. 1d20+1d8+2"></ttd-equation>
                  <ttd-equation class="third-hand" placeholder="eg. (1d9+4d4)/1d8"></ttd-equation>
                </ttd-tray>
              </slot>
            </template>
          </div>
          <app-monetizer>Ads for advanced rollers</app-monetizer>
          <div class="card">
          <div class="copy-box">
            <p>
              The advanced dice tray offers a readout of all dice rolled,
              the minimum and maximum result of all d20 rolls,
              a standard array of polyhedron dice,
              a total of all dice roll results (with the option to exclude one type of dice, defaulted to d20),
              and two 'dice equation fields' that allows you to enter your own dice rules,
              then clear the app and roll them all at once, displaying a total at the end.
            </p>
          </div>
        </div>
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

  ready() {
    super.ready();
    /** Check if this browser is currently supported */
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

window.customElements.define('ttd-view-advanced', TtdViewAdvanced);
