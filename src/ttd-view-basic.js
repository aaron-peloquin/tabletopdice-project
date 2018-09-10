/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './-ttd-sharedStyles.js';
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
        grid-template-areas:
          "history history"
          "total__ total__"
          "clear__ clear__"
          "die___4 die___6"
          "die___8 die__10"
          "die__12 die__20"
          "custom_ custrol";
        grid-template-columns: 1fr 1fr;
      }

      /* [Responsive] Small Styles */
      @media (min-width: 350px) {
        ttd-tray{
          grid-template-areas:
            "history history history"
            "total__ total__ clear__"
            "die___4 die___6 die___8"
            "die__10 die__12 die__20"
            "custom_ custom_ custrol";
          grid-template-columns: 1fr 1fr 1fr;
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
      <style include="ttd-styles"></style>

      <div class="card">
        <h1>Basic dice tray</h1>
        <div class="tray-wrapper">
          <slot>
            <ttd-tray>
              <ttd-history class="readout" excited></ttd-history>
              <ttd-total class="readout" exclude exclude-die="20"></ttd-total>
              <ttd-die class="button animate-shake" sides="4"></ttd-die>
              <ttd-die class="button animate-shake"></ttd-die>
              <ttd-die class="button animate-shake" sides="8"></ttd-die>
              <ttd-die class="button animate-shake" sides="10"></ttd-die>
              <ttd-die class="button animate-shake" sides="12"></ttd-die>
              <ttd-die class="button animate-shake" sides="20"></ttd-die>
              <ttd-custom class="readout"></ttd-custom>
              <ttd-custom-roll class="button animate-shake"></ttd-custom-roll>
              <ttd-clear class="button animate-shake"></ttd-clear>
            </ttd-tray>
          </slot>
        </div>
        <app-monetizer></app-monetizer>
        <div class="card">
          <div class="copy-box">
            <p>
              The basic dice tray is meant to give most players everything they need for their tabletop gaming session while still being managable on a mobile device.
              It provides the roll history, a total of all dice rolled (with an option to exclude one type of die), a clear button, the standard dice buttons, and a custom sided dice button (defaulted to a d100).
            </p>
            <dl>
              <dt>Results</dt>
              <dd>Displays the most recent 400 dice results since the last time you cleared the dice tray.</dd>

              <dt>Total</dt>
              <dd>Displays the sum of all dice rolled with a dropdown option to exclude a specific type of die, which is defaulted to exclude d20 results. Clearing results resets this total.</dd>

              <dt>Clear Button</dt>
              <dd>This button clears the dice tray, resetting it back to having no dice rolled.</dd>

              <dt>Standard Dice</dt>
              <dd>A standard array of polyhedrondice most commonly used in tabletop gaming to make an ability checks, deal damage, and make saving throws.</dd>

              <dt>Custom sided die</dt>
              <dd>Allows you to set any number of sides on a die you want, then roll that die. Defaulted to act like a 1d100.</dd>
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

window.customElements.define('ttd-view-basic', TtdViewBasic);
