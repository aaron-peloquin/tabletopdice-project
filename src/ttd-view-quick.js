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
      /* [Responsive] Tiny Styles */
      ttd-tray{
        grid-template-areas:
          "history history"
          "clear__ clear__"
          "die___4 die___6"
          "die___8 die__10"
          "die__12 die__20";
        grid-template-columns: 1fr 1fr;
      }

      /* [Responsive] Small Styles */
      @media (min-width: 350px) {
        ttd-tray{
          grid-template-areas:
            "history history history"
            "clear__ clear__ clear__"
            "die___4 die___6 die___8"
            "die__10 die__12 die__20";
          grid-template-columns: 1fr 1fr 1fr;
        }
      }

      /* [Responsive] Medium Styles */
      @media (min-width: 875px) {
        :host{
          font-size: 2rem;
        }

        ttd-tray{
          grid-template-areas:
            "history history history history"
            "die___4 die___6 die___8 clear__"
            "die__10 die__12 die__20 clear__";
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
        <h1>Quick Dice Tray</h1>
        <div class="tray-wrapper">
            <slot>
              <ttd-tray>
                <ttd-history class="readout" excited></ttd-history>
                <ttd-die class="button animate-shake" sides="4"></ttd-die>
                <ttd-die class="button animate-shake"></ttd-die>
                <ttd-die class="button animate-shake" sides="8"></ttd-die>
                <ttd-die class="button animate-shake" sides="10"></ttd-die>
                <ttd-die class="button animate-shake" sides="12"></ttd-die>
                <ttd-die class="button animate-shake" sides="20"></ttd-die>
                <ttd-clear class="button animate-shake"></ttd-clear>
              </ttd-tray>
            </slot>
        </div>
        <app-monetizer></app-monetizer>
        <div class="card">
          <div class="copy-box">
            <p>
              The quick dice tray is meant to be the most straightforward. It provides the roll history, the dice buttons most commonly used in tabletop gaming, and a clear button.
            </p>
            <dl>
              <dt>Results</dt>
              <dd>Displays the most recent 400 dice results since the last time you cleared the dice tray.</dd>

              <dt>Standard Dice</dt>
              <dd>A standard array of polyhedrondice most commonly used in tabletop gaming to make an ability checks, deal damage, and make saving throws.</dd>

              <dt>Clear Button</dt>
              <dd>This button clears the dice tray, resetting it back to having no dice rolled.</dd>
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

window.customElements.define('ttd-view-quick', TtdViewQuick);
