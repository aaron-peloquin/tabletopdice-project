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
            "equat_o equat_o";
        }

        /* [Responsive] Small Styles */
        @media (min-width: 350px) {
          ttd-tray{
            grid-template-columns: 1fr 1fr 1fr;

            /* just wanna say, grid-template-areas is amazing. IE does not support, tho.. :(    */
            grid-template-areas:
              "history history history"
              "highLow total__ total__"
              "highLow clear__ clear__"
              "die___4 die___6 die___8"
              "die__10 die__12 die__20"
              "equat_m equat_m equat_m"
              "equat_o equat_o equat_o";
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
              "equat_o equat_o equat_o equat_o equat_o equat_o equat_o";
            }
        }

        /** [Responsive] Large Styles */
        @media screen and (min-width: 1200px) {
          :host{
             font-size: 32px;
          }
        }

        /* IE10+ CSS styles go here */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          ttd-high-low,
          ttd-clear{
            width: 100%;
            float:left;
            padding: 0;
          }
        }

        </style>

        <div class="card">
          <h1>Advanced dice tray</h1>
          <div class="tray-wrapper">
            <slot>
              <ttd-tray>
                <ttd-history excited></ttd-history>
                <ttd-total exclude exclude-die="20"></ttd-total>
                <ttd-high-low die="20"></ttd-high-low>
                <ttd-clear></ttd-clear>
                <ttd-die sides="4"></ttd-die>
                <ttd-die></ttd-die>
                <ttd-die sides="8"></ttd-die>
                <ttd-die sides="10"></ttd-die>
                <ttd-die sides="12"></ttd-die>
                <ttd-die sides="20"></ttd-die>
                <ttd-equation class="main-hand" placeholder="eg. 3d6+4" exclude></ttd-equation>
                <ttd-equation class="off-hand" placeholder="eg. 1d20+1d8+2" exclude></ttd-equation>
              </ttd-tray>
            </slot>
          </div>
          <app-monetizer>Ads for advanced rollers</app-monetizer>
          <div class="card">
          <div class="copy-box">
            <p>
              The advanced dice tray gamers complete control over their dice tray. Including most features from the basic dice tray, adding in two new elements;
                a high/low readout for d20 rolls,
                and replacing the custom sided die with three dice equation fields.
            </p>
            <dl>
              <dt>Roll History</dt>
              <dd>Displays the full history of all dice since the last time you cleared the dice tray.</dd>

              <dt>Total</dt>
              <dd>Displays the sum of all dice rolled with a dropdown option to exclude a specific type of die, which is defaulted to exclude d20 results. Clearing results resets this total.</dd>

              <dt>d20 High / Low Readout</dt>
              <dd>Displays the highest and lowest values from all d20 results rolled since the tray was last cleared.</dd>

              <dt>Clear Button</dt>
              <dd>This button clears the dice tray, resetting it back to having no dice rolled.</dd>

              <dt>Dice Button</dt>
              <dd>A standard array of polyhdron dice most commonly used in tabletop gaming to makine ability checks, deal damage, and make saving throws.</dd>

              <dt>Dice Equations</dt>
              <dd>
                Allows you to write dice like a math equation. You can add, subtract, multiply, divide, and use parense for order of opperations, interlaced with numbers and 'dice strings' (2d4, 1d8, etc-).
                <br /><br />Each dice string has a maximum of 999 dice and 999 sides, but this limit is only in place to prevent accidents. You can still write 999d999 + 999d999, but the more rolls you do, the longer you device will take to process the results- use with caution.
              </dd>
            </dl>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * @param {str} page Two-way data bind for what the current page is. Can be used to send the browser to another page on the site.
   */
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
    };
  }
}

window.customElements.define('ttd-view-advanced', TtdViewAdvanced);
