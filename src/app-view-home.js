/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class AppViewHome extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: grid;
        }
        img.logo {
          transform: rotate( -600deg );            
          transition: transform 250ms linear;         /* Gives the feeling of "resetting" the die */
          padding: 15px;
        }

        img.logo:hover {
          transform: rotate( -212deg );
          transition: transform 640ms ease-in-out;    /* Gives the feeling of rolling the die */  
        }

        .start-rolling{
          text-align: center;
          padding: 15px;
          border-radius: 15px;
          background-color: var(--app-card-background);
          box-shadow: 2px 2px 2px 2px #eeeeee;
        }
        
        .start-rolling a{
          color: #FFF;
          font-size: 2rem;
          text-align: center;
          text-decoration: none;
          height: 100%;
          width: 100%;
          display: block;
        }

      </style>

      <img class="logo" src="/images/icons/icon-512x512.png" alt="Tabletop Dice Logo" />
      <div class="card">
        <h1>Simple Dice Rolling</h1>
        <div class="copy-box">
          <h2>
            Built with love for the tabletop gaming community &lt;3
          </h2>
          <p class="start-rolling">
            <a on-click="gotoRoll" href="[[rootPath]]quick-dice-roller">Quick Dice</a>
          </p>
          <p class="start-rolling">
            <a on-click="gotoRoll" href="[[rootPath]]basic-dice-roller">Basic Dice</a>
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

  gotoRoll() {
    this.page = 'basic-dice-roller';
  }
}

window.customElements.define('app-view-home', AppViewHome);
