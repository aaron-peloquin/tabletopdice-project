/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
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
      <style>
      :host{
          padding: 10px;
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
        :host::-webkit-scrollbar {
          display: none;
        }

        ol {
          margin: 0 10px;
          padding: 0;
          height: 100%;
          min-height: 75px;

          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(auto-fill, 90px);

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
          box-shadow: -1px -1px 1px 1px #aaa;
          display: inline-grid;
          border-radius: 10px;
          align-items: center;
          margin: 2px 2px 2px 15px;
          padding: 2px;
          align-self: center;
          justify-self: center;
          grid-row: 1;
          background-color: var(--ttd-default-background-color);
          color: #ddd;
          min-width: 90px;
        }

        li > *{
          grid-row: 1;
          grid-column: 1;
        }

        li > img{
          vertical-align: middle;
          -webkit-filter: invert(90%);
          -filter: invert(90%);
          margin: 0 auto;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        li > span{
          position: relative;
          z-index: 20; /* naturally */
          font-weight: bold;
          text-align: center;
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

        .invisible-text{
          font-size: 0px;
        }
      </style>
      <template is="dom-if" if="[[results]]">
        <ol title="Copy for dice roll log">
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
    this.results = e.detail.data.slice(0).reverse();
  }

  /**
   * Whenever results are modified, append "newst" class to the most recent roll's wrapping <li>.
   * @returns {void}
   */
  addLatestClass(){
    if(this.results.length>0) {
      var myShadow = this.shadowRoot;
      setTimeout(function(){
        myShadow.querySelector('li').classList.add("newest")
      },1);
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
