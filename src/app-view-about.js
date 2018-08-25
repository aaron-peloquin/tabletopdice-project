/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

 import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

/**
 * `ttd-view-about`
 * View for the about page
 *
 * @customElement
 * @polymer
 */
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
            Roll dice in your tabletop game to save against forgetting your dice.
          </p>
          <p>
            This application provides a number of different dice tray interfaces, each one becoming more advanced than the one before it.
            For usage of each dice tray's elements, read the description at the bottom of the dice tray's page.
          </p>
          <p>
            The random values in this dice roller use a <a target="_blank" href="https://github.com/davidbau/seedrandom">random entropy seed</a> to give better results than most physical dice due to imperfections in how dice are made. 
          </p>
        </div>

        <h1>Feedback & Contact</h1>
        <div class="copy-box">
          <p>
            Please take the time to fill out this <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfPABLn01U6BDjdygscafbasK6IVeGtK4vRcOba7C3mDJaEBQ/viewform">short survey</a> to help guide this app going forward.
          </p>
          <p>
            Otherwise if you need to contact me directly, you can reach me by filling out <a href="https://goo.gl/forms/HIDWZP4VsafmbQTA2">this form</a>.
          </p>
        </div>

        <h1>History</h1>
        <div class="copy-box">
          <p>
            TabletopDice.com was created out of my love for tabletop gaming.
          </p>
          <p>
            I've been playing since my brother's friends introduced me to D&D 2nd edition when I was 12 years old, and I've had a bad habbit of forgetting my dice since then.
            Decades later, I never seem to forget my phone when coming to the table,
            so I decided to build this in service to all my kin who share this curse.
          </p>
          <!-- p>
            On the first night I used this app in a real game, a small army attack our island fortress in the night.
            They had to make a a ton of d20 climb check to scale a cliff out of the water in this app. They monsters all rolled poorly and almost all fell off into the ocean.
            A few rounds later and we'd thined their numbers quite a bit.
            Six of them made it across our bridge and ganged up on our tank, all 6 had 3 attacks that all had advantage. DM had me roll their attacks (36d20).
            They landed 6 critical hits on him, immediately dropping our tank from near-full health to having failed all of his death saving throws.
          </p -->
        </div>

        <h1>Web Browser Support</h1>
        <div class="copy-box">
          <p>
            For best results, use Google Chrome. We also support Firefox and Microsoft Edge. Internet Explorer 11 supported, but not recommended since it only uses mobile styles.
          </p>
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

window.customElements.define('app-view-about', AppViewAbout);
