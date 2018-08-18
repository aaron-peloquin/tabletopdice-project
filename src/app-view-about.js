/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
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
        <h1>Usage</h1>
        <div class="copy-box">
          <p>
            This application provides a number of different dice tray interfaces, each one becoming more advanced than the one before it.
          </p>
        </div>

        <h1>History</h1>
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
        </div>
  
        <h1>Feedback & Contact</h1>
        <div class="copy-box">
          <p>
            Please take the time to fill out this <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfPABLn01U6BDjdygscafbasK6IVeGtK4vRcOba7C3mDJaEBQ/viewform">short survey</a> to help guide this app going forward.
          </p>
          <p>
            Alternativly you can also contact me or send feedback, please email <a href="mailto:contact@tabletopdice.com">Contact@TabletopDice.com</a> directly.
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
