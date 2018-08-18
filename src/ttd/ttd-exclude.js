/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-exclude`
 * Specify a type of die&#39;s results to exclude from the sum
 *
 * @customElement
 * @polymer
 */
class TtdExclude extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        select{
          width:100%;
          display: block;
          height: 100%;
          font-size: inherit;
          border: 0;
        }
        select:focus{
          outline: none;
        }
        select,
        option{
          font-family: var(--app-font-family);
          font-weight: var(--app-font-weight);
          background-color: var(--app-ttd-clean-background-color);
          color: var(--app-ttd-clean-color);
        }

      </style>
      <select aria-label="Select die to exclude from the sum" value="{{die::change}}">
        <option value="0" selected$="{{parseSelected(0)}}">[[defaultLanguage]]</option>
        <template is="dom-repeat" items="{{diceTypes}}" as="sides">
          <option value="[[sides]]" selected$='[[parseSelected(sides)]]'>[[prefix]][[sides]][[append]]</option>
        </template>
      </select>
    `;
  }

  /**
   * @param {num} die The die to exclude from the total that is sent to sum elements. Runs
   * updateExcludedDie whenever it is updated
   * @param {str} defaultLanguage The default language used in the <option> when no die is selected
   * @param {str} prefix The default language used in <options> before the number of sides written to markup
   * @param {str} append The default language used in <options> after the number of sides is written to markup
   * @param {array} diceTypes The types of dice that can be excluded from the sum.
   */
  static get properties() {
    return {
      die: {
        type: Number,
        value: 0,
        observer: 'updateExcludedDie',
      },
      defaultLanguage: {
        type: String,
        value: "Add all dice",
      },
      prefix: {
        type: String,
        value: "Skip d",
      },
      append: {
        type: String,
        value: "s",
      },
      diceTypes: {
        type: Array,
        value: function() { return []; },
      }
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Update this.diceTypes with <ttd-tray>.standardPolyhedrons
   * Update <ttd-tray> to be this excluded die's default value
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }

    this.diceTypes = this.trayElement.standardPolyhedrons;
    this.trayElement.exclude = this.die;
  }
  
  /**
   * @param {var} s The sides of the <option> in this element's template to check
   * @returns {bool} true if s is exactly equal to this.die
   */
   parseSelected(s) {
    return s===this.die;
  }

  /**
   * Triggered when the dropdown is changed, updates <ttd-tray>.exclude value
   * Reports update to Google Analytics
   * Dispatch the [_recalculateSum] event
   * @returns {void}
   */
  updateExcludedDie() {
    if (!this.trayElement) {
      return false;
    }
    this.trayElement.exclude = this.die;

    /** Report [update-exclude] to google analytics */
    gtag('event', 'update-exclude', {
      "event_category":"config",
      'event_label': "Exclude "+this.die,
      'dieSides': this.die,
    });
    this.trayElement.dispatchEvent(new CustomEvent('_recalculateSum'));
  }
}

window.customElements.define('ttd-exclude', TtdExclude);
