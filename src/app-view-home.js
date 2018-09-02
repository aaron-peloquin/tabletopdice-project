/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './-ttd-sharedStyles.js';

/**
 * `ttd-view-home`
 * View for the home page
 *
 * @customElement
 * @polymer
 */
class AppViewHome extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: grid;
        }

        .center-image{
          width: 100%;
          text-align: center;
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

        .card > h1{  
          background-color: var(--app-primary-color);
          color: var(--ttd-color);
        }

        .start-rolling{
          text-align: center;
          padding: 0;
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

        .button {
          margin: 10px auto;
          padding: 5px;
          width: 90%;
        }

        .link-card .last-link {
          margin-bottom: 35px;
        }
        
        /** [Responsive] Large Styles */
        @media screen and (min-width: 800) {
          .button{
            width: 50vw;
          }
        }

      </style>
      <style include="ttd-styles"></style>

      <div class="center-image">
        <img class="logo" src="/images/icons/icon-512x512.png" alt="Tabletop Dice Logo" />
      </div>
      <div class="card">
        <h1>Tabletop Dice</h1>
        <div class="copy-box">
          <h2>Save against forgetting your dice</h2>
          <h2>Built with love for the tabletop gaming community &lt;3</h2>
        </div>
      </div>
      <div class="card link-card">
        <h1>Dice Trays</h1>
        <p class="start-rolling button">
          <a href="[[rootPath]]quick-dice-roller">Quick</a>
        </p>
        <p class="start-rolling button">
          <a href="[[rootPath]]advanced-dice-roller">Advanced</a>
        </p>
        <p class="start-rolling button last-link">
          <a href="[[rootPath]]combat-dice-roller">Combat</a>
        </p>
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

window.customElements.define('app-view-home', AppViewHome);
