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
 *    _updateSum, dispatched whenever this.sum is changed
 *    _recalculateSum, dispatched whenever you would like the sum to be recalculated
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
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] to clear this.results and this.sum, then update all listeners
   * Add [_recalculateSum] to recalculate the sum
   */
  ready() {
    super.ready();
    // Add listener for _clearResults to clear this tray's roll results.
    this.addEventListener('_clearResults', e => {this.clearResults(e)});
    this.addEventListener('_recalculateSum', e => {this.recalculateSum(e)});
  }

  /**
   * Roll a basic die and updates this.sum and this.results
   * Reports to Google with the result rolled, and any criticals
   * Dispatch [_recalculateSum] and call updateHistoricalNodes()
   * @param {num} sides The number of sides
   * @returns {void}
   */
  roll(sides) {
    var value = Math.floor(Math.random() * Math.floor(sides)) + 1;
    this.results.push({"sides":sides,"result":value});

    //Report to Google Analytics
    gtag('event', 'roll', {
      'sides': sides,
      'result': value,
      'event_label': sides,
      'custom_variable_1': value
    });

    if(sides==20) {
      if(value==20) {
        gtag('event', 'natural-twenty');
      }
      else if(value==1) {
        gtag('event', 'natural-one');
      }
    }

    this.dispatchEvent(new CustomEvent('_recalculateSum'));
    this.updateHistoricalNodes();
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
    this.updateSumNodes();
  }

  /**
   * Send this.results to all [_updateHistory] listeners
   * @returns {void}
   */
  updateHistoricalNodes() {
    this.dispatchEvent(new CustomEvent('_updateHistory', {detail: {data:this.results}}));
  }

  /**
   * Send this.sum to all [_updateSum] listeners
   * @returns {void}
   */
  updateSumNodes() {
    this.dispatchEvent(new CustomEvent('_updateSum', {detail: {data:this.sum}}));
  }

  /**
   * Clear this.results and this.sum, then update all listeners
   * @returns {void}
   */
  clearResults() {
    this.results = [];
    this.updateHistoricalNodes();

    this.sum = 0;
    this.updateSumNodes();
  }
}

window.customElements.define('ttd-tray', TtdTray);
