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
 *    _updateLocalStorage, dispatched whenever the localStorage needs to be updated.
 *    This is because of a limitation in polymer's observer functionality, since we do not know how deep the storage can go.
 */
class TtdTray extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host{
          /* Text selection */
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
   * the dice with sides equal to this.exclude
   * @param {num} exclude The type of dice to exclude
   */
  static get properties() {
    return {
      results: {
        type: Array,
        value: function() { return []; },
      },
      exclude: {
        type: Number,
        value: 0,
      },
      // standardPolyhedrons: {
      //   type: Array,
      //   reflectToAttribute: true,
      //   value: function() { return [4,6,8,10,12,20]; }
      // },
      storage: {
        type: Object,
        value: function() { return {}; },
      },
      key: {
        type: String,
        value: "ttd",
      }
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Add [_clearResults] to clear this.results, then update all listeners
   * Add [_updateLocalStorage] to update localStorage with a JSON string of this.storage
   * Initilize localStorage[this.key] into this.storage
   * @returns {void}
   */
  ready() {
    super.ready();

    this.addEventListener('_updateLocalStorage', e=> { this.saveToLocalStorage(); });

    this.addEventListener('_clearResults', e => {
      this.results = [];
      this.updateHistoricalNodes();
    });

    /** If localStorage for this.key does not exist, create it. */
    if(!this.getStorage()) {
      this.resetLocalStorage();
    };
    this.loadStorage()

    /** If localStorage is corrupt, reset it */
    if(typeof this.storage!='object') {this.resetLocalStorage();}
  }

  /**
   * Send this.results to all [_updateHistory] listeners
   * @returns {void}
   */
  updateHistoricalNodes() {
    this.dispatchEvent(new CustomEvent('_updateHistory', {detail: {data:this.results}}));
  }

  /**
   * Fully refresh all app data.
   * A bit silly to keep this method around, since I removed this.sum,
   * but I want to keep it incase I might use it in the future for other custom elements.
   */
  fullRefresh() {
    this.updateHistoricalNodes();
  }

  resetLocalStorage() {
    let newStorage = {"conf":{},"data":{}};
    localStorage.setItem(this.key, JSON.stringify(newStorage));
  }

  /**
   * @returns the local storage value object for this.key
   */
  getStorage() {
    return  JSON.parse(localStorage.getItem(this.key));
  }

  /**
   * Sets this.storage to localStorage using this.key.
   */
  setStorage() {
    localStorage.setItem(this.key,JSON.stringify(this.storage));
  }

  /**
   * Loads localStorage for this.key into this.storage
   * @returns {void}
   */
  loadStorage() {
    this.storage = this.getStorage();
  }

  /**
   * Attempt to safely write to localStorage,
   * otherwise reset data then save
   */
  saveToLocalStorage() {
    try {
      this.setStorage();
      let check = this.getStorage()
      if(typeof check !='object') {
        throw 'Unable to check JSON for localdata save';
      }
    }
    catch(e) {
      this.resetLocalStorage();
      this.setStorage();
    }
  }
}

window.customElements.define('ttd-tray', TtdTray);
