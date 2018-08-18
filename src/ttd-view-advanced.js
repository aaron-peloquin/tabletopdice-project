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
import './ttd/ttd-sum.js';
import './ttd/ttd-die.js';
import './ttd/ttd-clear.js';
import './ttd/ttd-exclude.js';
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
        :host {
          /* [Responsive] Tiny Styles */
          --cols-num: 4;
          --cols-grid-template: 1fr 1fr 1fr;
          --cols-ttd-history: span 3;
          --cols-ttd-high-low: span 1;
          --cols-default-child: span 2;
          --cols-ttd-exclude: span 3;
          --cols-ttd-custom: var(--cols-default-child);
          --cols-ttd-clear: span 4;
          --cols-ttd-sum: span 1;

          --font-size-all: 3vw;

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

          /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
          grid-template-areas:
            "hist hist hist"
            "hl20 exc clr"
            "hl20 sum sum"
            "d4 d6 d8"
            "d10 d12 d20"
            "str1 str1 str1"
            "str2 str2 str2";
        }

        ttd-history{
          grid-area: hist;
        }

        ttd-high-low{
          grid-area: hl20;
        }

        ttd-exclude{
          grid-area: exc;
        }

        ttd-sum{
          grid-area: sum;
        }

        ttd-clear{
          grid-area:  clr ;
        }

        ttd-die,
        ttd-clear{
          cursor: pointer;
        }

        ttd-die{
          grid-area:  d6;
          font-size: 2rem;
        }

        ttd-die[sides="4"]{
          grid-area:  d4;
        }

        ttd-die[sides="8"]{
          grid-area:  d8;
        }

        ttd-die[sides="10"]{
          grid-area:  d10;
        }

        ttd-die[sides="12"]{
          grid-area:  d12;
        }

        ttd-die[sides="20"]{
          grid-area:  d20;
        }

        ttd-equation{
          grid-area: str1;
          margin-bottom: 10px;
        }
        ttd-equation.off-hand{
          grid-area: str2;
        }

        ttd-tray > *{
          background-color: var(--app-ttd-default-background-color);
          box-shadow: 2px 2px 2px 1px var(--app-ttd-clean-color), -1px -1px 2px 1px var(--app-ttd-child-color);
          color: var(--app-ttd-child-color);
          border-radius: 5px;
          overflow: hidden;
        }

        @keyframes jitters {
          0% { transform: translate(1px, 0px) rotate(2deg); }
          10% { transform: translate(0px, 1px) rotate(1deg); }
          20% { transform: translate(-1px, 0px) rotate(-1deg); }
          30% { transform: translate(-2px, -1px) rotate(0deg); }
          40% { transform: translate(-1px, 0px) rotate(1deg); }
          50% { transform: translate(0px, 1px) rotate(2deg); }
          60% { transform: translate(1px, 2px) rotate(3deg); }
          70% { transform: translate(2px, 1px) rotate(4deg); }
          80% { transform: translate(3px, 0px) rotate(3deg); }
          90% { transform: translate(2px, 1px) rotate(2deg); }
          100% { transform: translate(0px, 0px) rotate(1deg); }
        }

        ttd-tray ttd-die:active{
          animation: jitters;
          animation-duration: .25s;
        }

        ttd-tray ttd-history,
        ttd-tray ttd-high-low,
        ttd-tray ttd-sum,
        ttd-tray ttd-clear{
          background-color: var(--app-ttd-secondary-background-color);
          color: var(--app-ttd-secondary-color);
        }

        ttd-tray ttd-custom,
        ttd-tray ttd-custom-roll{
          background-color: var(--app-ttd-special-background-color);
        }

        /* [Responsive] Small Styles */
        @media (min-width: 550px) {
          :host{
            --cols-grid-template: 1fr 1fr 1fr 1fr 1fr 1fr;
          }
          ttd-tray{
              grid-template-areas:
                "hist hist hist hist hist hl20"
                "d4 d6 d8 exc exc clr"
                "d10 d12 d20 sum sum clr"
                "str1 str1 str1 str1 str1 str1"
                "str2 str2 str2 str2 str2 str2";
          }
        }

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
                  <ttd-sum></ttd-sum>
                  <ttd-exclude die="20"></ttd-exclude>
                  <ttd-high-low die="20"></ttd-high-low>
                  <ttd-die sides="4"></ttd-die>
                  <ttd-die></ttd-die>
                  <ttd-die sides="8"></ttd-die>
                  <ttd-die sides="10"></ttd-die>
                  <ttd-die sides="12"></ttd-die>
                  <ttd-die sides="20"></ttd-die>
                  <ttd-equation class="main-hand"></ttd-equation>
                  <ttd-equation class="off-hand"></ttd-equation>
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
              a sum of all dice roll results (with the option to exclude one type of dice, defaulted to d20),
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

window.customElements.define('ttd-view-advanced', TtdViewAdvanced);
