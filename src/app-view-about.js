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

class AppViewAbout extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>

      <div class="card">
        <h1>About</h1>
        <div class="copy-box">
          <p>
            TabletopDice.com was created out of my love for tabletop gaming.
          </p>
          <p>
            I've been playing since my brother's friends introduced me
            to D&D 2nd edition when I was 12 years old,
            and I've had a bad habbit of forgetting my dice since then.
            Decades later, I never seem to forget my phone when coming to the table,
            so I decided to build this in service to all of my fellow kin who share my curse.
          </p>
          <p>
            This site is currently maintained by one developer,
            it's AWS hosting is supported by google ads, so if you have an AdBlocker installed,
            please disable it- but honestly, hosting doesn't cost that much.
          </p>
        </div>

        <h1>Contact &amp; Feedback</h1>
        <div class="copy-box">
          <p>
            To contact me or send feedback, please email <a href="mailto:feedback@tabletopdice.com">Feedback@TabletopDice.com</a> directly.
          </p>
        </div>

        <h1>Open Source</h1>
        <div class="copy-box">
          <p>
            This is an open source project hosted on <a href="https://github.com/aaron-peloquin/tabletopdice-project/">github</a>.
          </p>
        </div>
      </div>
      `;
  }

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

window.customElements.define('app-view-about', AppViewAbout);
