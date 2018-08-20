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
import './ttd/ttd-total.js';
import './ttd/ttd-custom.js';
import './ttd/ttd-custom-roll.js';

/**
 * `ttd-view-basic`
 * Standard implimentation of a dice tray.
 *
 * @customElement
 * @polymer
 */
class TtdViewBasic extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
      /* [Responsive] Tiny Styles */
      ttd-tray{
        grid-template-columns: 1fr 1fr;

        /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
        grid-template-areas:
          "history history"
          "total__ total__"
          "clear__ clear__"
          "die___4 die___6"
          "die___8 die__10"
          "die__12 die__20"
          "custom_ custrol";
      }

      /* [Responsive] Small Styles */
      @media (min-width: 350px) {
        ttd-tray{
          grid-template-columns: 1fr 1fr 1fr;

          /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
          grid-template-areas:
            "history history history"
            "total__ total__ clear__"
            "die___4 die___6 die___8"
            "die__10 die__12 die__20"
            "custom_ custom_ custrol";
        }
      }

      /* [Responsive] Medium Styles */
      @media (min-width: 875px) {
        :host{
          font-size: 2rem;
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
        <h1>Basic dice tray</h1>
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
                <ttd-total exclude exclude-die="20"></ttd-total>
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
        <app-monetizer></app-monetizer>
        <div class="card">
          <div class="copy-box">
            <p>
              The basic dice tray offers a history readout of all dice rolls,
                a sum field of all dice rolls (and the option to exclude one dice type from this sum),
                the standard array of polyhedral dice,
                and a custom die builder so you can roll a die with however many sides sides you may need.
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
    this.browserSupported = this.browserIsSupported();
  }

  browserIsSupported() {
    var ua = window.navigator.userAgent;
    var ieClassic = (ua.indexOf("MSIE")>0);
    var ieEleven = (!!ua.match(/Trident\/7\./));
    if (ieClassic || ieEleven) {
      return false;//This is IE.
    }
    return true; //This is not IE
  }
}

window.customElements.define('ttd-view-basic', TtdViewBasic);
