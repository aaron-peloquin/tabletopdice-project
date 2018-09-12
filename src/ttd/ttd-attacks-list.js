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
import {} from './ttd-attack.js';

/**
 * `ttd-attacks-list`
 * Allows the user to roll attacks that are stored in their localStorage
 *
 * @customElement
 * @polymer
 */
class TtdAttacksList extends TtdChildHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
      :host {
        flex-wrap: nowrap;
        text-align: center;
        width: 100%;
      }

      ol {
        list-style: none;
        padding: 0 5px;
      }

      li {
        border-radius: 15px;
        margin-bottom: 2rem;
      }

    </style>
    <template is="dom-if" if="{{hasAttacks}}">
      <ol>
        <dom-repeat items="{{attacks}}" as="atk" sort="sortAttacks">
          <template>
            <li>
              <ttd-attack
                attack-label="{{atk.attackLabel}}"
                damage-type="{{atk.damageType}}"
                hit-string="{{atk.hitString}}"
                damage-string="{{atk.damageString}}"
                shared-edit-data="{{sharedEditData}}"
                tray-element="{{trayElement}}"
              /></ttd-attack>
            </li>
          </template>
        </dom-repeat>
      </ol>
    </template>
    <template is="dom-if" if="{{!hasAttacks}}">
      <p class="readout">No attacks exist yet, create one</p>
    </template>
    `;
  }

  /**
   * @param {array} attacks Array of attack objects, pulled from trayElement.storage.data.attacks
   * @param {bool} hasAttacks Boolean that is set to true once this.attacks has one or more items
   */
  static get properties() {
    return {
      attacks: {
        type: Array,
        value: function() { return []; },
        observer: 'checkHasAttacks',
      },
      hasAttacks: {
        type: Boolean,
        value: false,
      },
      sharedEditData: {
        type: Object,
        value: function() { return {}; },
        notify: true,
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * If the tray does not have storage of attacks, create this placeholder in the object
   * Then load the localStorage attacks into this.attacks
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }

    if(!this.trayElement.storage.data.hasOwnProperty('attacks')) {
      this.trayElement.storage.data.attacks = [];
    }

    this.trayElement.addEventListener('_updateLocalStorage', e => { this.syncAttacks(); });
    this.syncAttacks();
  }
  
  /**
   * Sets this.hasAttacks if we have more than one this.attacks.
   * @returns {void}
   */
  checkHasAttacks() {
    this.hasAttacks = (this.attacks.length>0);
  }

  sortAttacks(a,b) {
    if(a.attackLabel < b.attackLabel) {
      return -1;
    }
    if(a.attackLabel > b.attackLabel) {
      return 1;
    }
    return 0;
  }

  syncAttacks() {
    this.attacks = [];
    this.attacks = this.trayElement.storage.data.attacks;
  }
}

window.customElements.define('ttd-attacks-list', TtdAttacksList);
