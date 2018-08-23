/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 * @ttd
 *  Events:
 *    _updateHistory, dispatched whenever this.results is changed
 *    _clearResults, dispatched whenever an element wants to clear the rolled results
 *    _rollCustomDie, dispatched whenever the custom dice are requested to be rolled
 */
class TtdTray extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host{
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
      </style>
      <slot></slot>
    `;
  }

  /**
   * @param {array} results Holds all a local copy of all roll results, which
   * can be cloned and pushed out to [_updateHistory] listeners
   * @param {num} sum The current sum of all dice rolled so far, excluding
   * the dice with sides equal to this.exclude
   * @param {num} exclude The type of dice to exclude
   */
  static get properties() {
    return {
      results: {
        type: Array,
        value: function() { return []; },
      },
      sum: {
        type: Number,
        value: 0,
      },
      exclude: {
        type: Number,
        value: 0,
      },
      standardPolyhedrons: {
        type: Array,
        reflectToAttribute: true,
        value: function() { return [4,6,8,10,12,20]; }
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] to clear this.results and this.sum, then update all listeners
   * @returns {void}
   */
  ready() {
    super.ready();
    // Add listener for _clearResults to clear this tray's roll results.
    this.addEventListener('_clearResults', e => {this.clearResults(e)});
  }

  /**
   * @param {num} max The maximum value returned. Minimum values are 1.
   * @returns {num} a Random(y) number
   */
  random(max) {
    /** Utilize seedrandom.js for better random values. */
    Math.seedrandom();
    return (Math.random() * max | 0) + 1;

    // var randomResult = 1;
    // if(typeof window.crypto == 'object') {
    //   /** How many bytes does the max number consume? */
    //   var requestBytes = Math.ceil(Math.log2(max) / 8);
    //   if(requestBytes) {
    //     //Generate an array with requestBytes items
    //     var randomArray = new Uint8Array(requestBytes);
    //     var maxNum = Math.pow(256, requestBytes);
    //     console.log(maxNum);
    //     while(true) {
    //       window.crypto.getRandomValues(randomArray);
    //       var val = 0;
    //       for(var i=0; i<requestBytes; i++) {
    //         val = (val << 8) + randomArray[i];
    //       }
    //       if(val + max - (val % max) < maxNum) {
    //         randomResult = 1 + (val % max);
    //         break;
    //       }
    //     }
    //   }
    // }
    // else {
    //   /** Not true random, but the best we can get without a ton of overhead */
    //   randomResult = (Math.random() * max | 0) + 1;
    // }
    // return randomResult;
  }

  /**
   * Roll a basic die and updates this.sum and this.results
   * Reports to Google with the result rolled, and any criticals
   * @param {num} sides The number of sides
   * @returns {void}
   */
  roll(sides) {
    var value = this.random(sides);
    this.results.push({"sides":sides,"result":value});

    //Report to Google Analytics
    if(typeof gtag=='function') {
      gtag('event', 'rollStandard', {
        "event_category":"roll",
        "event_label":"1d"+sides,
        'dieSides': sides,
        'rollResult': value
      });

      if(sides==20) {
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

    this.updateHistoricalNodes();
    return value;
  }

  /**
   * recalculates sum values, then calls updateSumNodes()
   * @returns {void}
   */
  recalculateSum() {
    var exclude = this.exclude;
    var newSum = 0;

    
    if(this.results.length>0) {
      this.results.forEach(function(roll) {
        // Exclude any rolls that were made by the excluded die
        if(roll.sides!=exclude) {
          newSum += roll.result;
        }
      });
    }

    // Update this.sum, then push out to listeners
    this.sum = newSum;
  }

  /**
   * Send this.results to all [_updateHistory] listeners
   * @returns {void}
   */
  updateHistoricalNodes() {
    this.dispatchEvent(new CustomEvent('_updateHistory', {detail: {data:this.results}}));
  }

  fullRefresh() {
    this.updateHistoricalNodes();
  }

  /**
   * Clear this.results and this.sum, then update all listeners
   * @returns {void}
   */
  clearResults() {
    this.results = [];
    this.updateHistoricalNodes();

    this.sum = 0;
  }
}

window.customElements.define('ttd-tray', TtdTray);
