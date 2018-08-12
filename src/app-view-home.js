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

        a.start-rolling{
          color: #FFF;
          font-size: 2rem;
          text-align: center;
          text-decoration: none;
          height: 100%;
          width: 100%;
          display: block;
        }
        
        p.start-rolling{
          text-align: center;
          padding: 15px;
          border-radius: 15px;
          background-color: var(--app-card-background);
          box-shadow: 2px 2px 2px 2px #eeeeee;
        }

      </style>

      <img class="logo" src="/images/icons/icon-512x512.png" alt="Tabletop Dice Logo" />
      <div class="card">
        <h1>Simple Dice Rolling</h1>
        <div class="copy-box">
          <p class="start-rolling">
            <a class="start-rolling" on-click="gotoRoll" href="[[rootPath]]basic-dice-roller">Start Roll'in</a>
          </p>
          <p>
            This website is a progressive web app (PWA), meaning you can
            access it's pages while offline after visiting them once. Your 
            device may also support saving (linking) this website to your 
            desktop/homescreen.
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

  gotoRoll(){
    this.page = 'basic-dice-roller';
  }
}

window.customElements.define('app-view-home', AppViewHome);
