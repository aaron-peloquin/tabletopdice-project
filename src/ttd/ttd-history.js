/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import './../-ttd-sharedStyles.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-history`
 * Displays a historical readout of all previously rolled dice
 *
 * @customElement
 * @polymer
 */
class TtdHistory extends TtdChildHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
      :host{
          display: block;

          /* Text selection */
          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */

          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;
        }
        :host::-webkit-scrollbar {
          display: none;
        }

        ol {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(auto-fill, 90px);
          height: 100%;
          margin: 0 10px;
          min-height: 130px;
          padding: 0;

          /* horizontal scrollbar functionality */
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;
          white-space: nowrap;
        }

        /* horizontal scrollbar functionality */
        ol::-webkit-scrollbar {
          display: none;
        }

        /* disable horizontal scrollbar functionality in firefox due to inability to hide them properly */
        @-moz-document url-prefix() {
          :host,
          ol {
            overflow-x: hidden;
          }
        }

        ol > li {
          align-items: center;
          align-self: center;
          background-color: var(--ttd-special-background-color);
          border-radius: 10px;
          color: #ddd;
          display: inline-grid;
          grid-row: 1;
          justify-self: center;
          min-width: 90px;
          padding: 2px;
        }

        li > *{
          grid-column: 1;
          grid-row: 1;
        }

        li > img{
          vertical-align: middle;
          margin: 0 auto;

          /* Text selection */
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */

          /* Image filtering */
          -webkit-filter: invert(90%);
          -filter: invert(90%);
        }

        li > span{
          font-weight: bold;
          position: relative;
          text-align: center;
          z-index: 20; /* naturally */
        }

        @keyframes jitters {
          0% { transform: translate(1px, 0px) rotate(2deg); }
          10% { transform: translate(0px, 1px) rotate(1deg); }
          20% { transform: translate(-1px, 0px) rotate(-1deg); }
          30% { transform: translate(-2px, -1px) rotate(0deg); }
          40% { transform: translate(-1px, 0px) rotate(1deg); }
          50% { transform: translate(0px, 1px) rotate(2deg); }
          60% { transform: translate(1px, 2px) rotate(3deg); }
          70% { transform: translate(2px, 1px) rotate(4deg); }
          80% { transform: translate(3px, 0px) rotate(3deg); }
          90% { transform: translate(2px, 1px) rotate(2deg); }
          100% { transform: translate(0px, 0px) rotate(1deg); }
      }

        .newest{
          color: var(--app-copybox-background);
        }

        .tiny-text{
          font-size:.75rem;
        }

        /* IE10+ CSS styles go here */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          ol {
            display: flex;
            height: 120px;
          }
          ol > li {
            display: inline-block;
            flex-basis: 120px;
          }
          li > *{
            display: block;
          }
        }
      </style>
      <template is="dom-if" if="[[results]]">
        <span class="readout-text">Results</span>
        <ol title="Copy for dice roll log" aria-live="polite">
          <dom-repeat items="{{results}}">
            <template>
              <li>
                <span>
                  [[formatResultString(item)]]<span class="tiny-text"> <span class="invisible-text">from </span>1d{{item.sides}}<span class="invisible-text">, </span></span>
                </span>
                <img src="[[dieImageURI(item.sides)]]" alt="[[item.sides]] sided die image" />
              </li>
            </template>
          </dom-repeat>
        </ol>
      </template>
    `;
  }

  /**
   * @param {array} results Stores rolled results locally
   * @param {num} limit The maximum amount of results to show at once
   * @param {bool} excited Paramiter that determins if we append a ! to
   * the end of each result that matches it's sides
   */
  static get properties() {
    return {
      results: {
        type: Array,
        value: function() { return []; },
        observer: 'addLatestClass',
      },
      limit: {
        type: Number,
        value: 444,
        reflectToAttribute: true,
      },
      excited: {
        type: Boolean,
        value: false,
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_updateHistory] to update the local results
    * @returns {void}
  */
	ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    this.trayElement.addEventListener('_updateHistory', e => {this.updateHistory(e)});
  }

  /**
   * Update (and reverse) the local results
   * @param {obj} e holds the new data dispatched from <ttd-tray>
   * @returns {void}
   */
  updateHistory(e) {
    this.results = [];
    let numShow = ( this.limit>0 ? -this.limit : 0 )
    this.results = e.detail.data.slice(numShow).reverse();
  }

  /**
   * Whenever results are modified, append "newst" class to the most recent roll's wrapping <li>.
   * @returns {void}
   */
  addLatestClass(){
    if(this.results.length>0) {
      let myShadow = this.shadowRoot;
      setTimeout(function(){
        myShadow.querySelector('li').classList.add("newest")
      },0);
    }
  }

  /**
   * Formats the display string with commas and may also append
   * a ! symbol if it was a crit and excite is set to true
   * @param {obj} r The individual roll result
   * Containes the # of sides that were rolled, as well as the result of that roll
   * @returns {str}
   */
  formatResultString(r) {
    return r.result.toLocaleString() + (this.excited && r.result==r.sides?'!':'');
  }
}

window.customElements.define('ttd-history', TtdHistory);
