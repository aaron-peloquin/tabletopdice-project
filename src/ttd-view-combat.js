/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './app-monetizer.js';
import './ttd/ttd-tray.js';
import './ttd/ttd-history.js';
import './ttd/ttd-total.js';
import './ttd/ttd-die.js';
import './ttd/ttd-clear.js';
import './ttd/ttd-high-low.js';
import './ttd/ttd-equation.js';
import './ttd/ttd-attacks-manage.js';
import './ttd/ttd-attacks-list.js';

/**
 * `ttd-view-combat`
 * Advanced implimentation of a dice tray.
 *
 * @customElement
 * @polymer
 */
class TtdViewCombat extends PolymerElement {
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
            "atk_man atk_man"
            "atk_lst atk_lst";
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
              "atk_man atk_man atk_man"
              "atk_lst atk_lst atk_lst";
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
              "atk_man atk_man atk_man atk_man atk_man atk_man atk_man"
              "atk_lst atk_lst atk_lst atk_lst atk_lst atk_lst atk_lst";
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
                <ttd-attacks-manage shared-edit-data="{{sharedEditData}}"></ttd-attacks-manage>
                <ttd-attacks-list shared-edit-data="{{sharedEditData}}"></ttd-attacks-list>
              </ttd-tray>
            </slot>
          </div>
          <app-monetizer>Ads for advanced rollers</app-monetizer>
          <div class="card">
          <div class="copy-box">
            <p>

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
      sharedEditData: {
        type: Object,
        value: function() { return {}; },
      }
    };
  }
}

window.customElements.define('ttd-view-combat', TtdViewCombat);
