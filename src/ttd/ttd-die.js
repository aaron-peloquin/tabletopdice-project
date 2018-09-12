/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';

/**
 * `ttd-die`
 * Rolls a die with standard sides (1d4, 1d8, etc-)
 *
 * @customElement
 * @polymer
 */
class TtdDie extends TtdChildHelper {
static get template() {
    return html`
      <style>
        :host{
          display: table;
          height: 100%;
          text-align: center;
          width: 100%;
        }
        div{
          display: table-cell;
          vertical-align: middle;
        }
      </style>
        <div on-click="roll" role="button">
        <template is="dom-if" if="[[rolled]]">{{rolled}}</template>d[[sides]]
      </div>
    `;
  }

  /**
   * @param {num} sides The number of sides this die button has when rolled, the max random result
   * @param {num} rolled The number of times this die has been rolled, reset when results are cleared
   */
  static get properties() {
    return {
      sides: {
        type: Number,
        value: 6,
      },
      rolled: {
        type: Number,
        value: 0,
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] to reset the rolled count
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    this.trayElement.addEventListener('_clearResults', e => {this.resetDie(e)});
  }

  /**
   * @param {num} max The maximum value returned. Minimum values are 1.
   * @returns {num} a Random(y) number
   */
  random(max) {
    /** Utilize seedrandom.js for better random values. */
    Math.seedrandom();
    return (Math.random() * max | 0) + 1;
  }

  /**
   * Roll this die, incriment the number of times rolled and updates the tray element's results
   * Reports to Google with the result rolled, and any criticals
   * Finally, tell the trayElement to do a fullRefresh()
   * @returns {void}
   */
  roll() {
    if(!this.trayElement) {
      return;
    }
    if(parseInt(this.sides)<1) {
      console.warn("The rolled die does not have any sides",this);
      return;
    }
    this.rolled++;
    let value = this.random(this.sides);
    this.trayElement.results.push({"sides":this.sides,"result":value});

    //Report to Google Analytics
    if(typeof gtag=='function') {
      gtag('event', 'rollStandard', {
        "event_category":"roll",
        "event_label":"1d"+this.sides,
        'dieSides': this.sides,
        'rollResult': value
      });

      if(this.sides==20) {
        if(value==20) {
          gtag('event', 'naturalTwenty', {
            "event_category":"critical",
          });
        }
        else if(value==1) {
          gtag('event', 'naturalOne', {
            "event_category":"critical",
          });
        }
      }
    }

    this.trayElement.fullRefresh();
    return value;
  }

  /**
   * Reset the number of times this die has been rolled
   * @returns {void}
   */
  resetDie() {
    this.rolled = 0;
  }
}
window.customElements.define('ttd-die', TtdDie);
