/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import './../-ttd-sharedStyles.js';
import {TtdEquationHelper} from './-ttd-equationHelper.js';
import './../my-icons.js';

/**
 * `ttd-attack`
 * Displays an attack and allows the user to roll it's to-hit and damage strings.
 * May be called by <ttd-attacks-list>, or on it's own as a child of <ttd-tray>
 *
 * @customElement
 * @polymer
 */
class TtdAttack extends TtdEquationHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
        :host {
          display: grid;
          flex-wrap: nowrap;

          grid-gap: 1rem;
          grid-template-areas:
            "atk_label_"
            "action_bts"
            "hit_result"
            "dmg_result";
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr;

          text-align: center;
          width: 100%;
        }

        .attack-label   { grid-area: atk_label_; }
        .hit-result     { grid-area: hit_result; }
        .damage-result  { grid-area: dmg_result; }
        .action-buttons { grid-area: action_bts; }

        .attack-label{
          background-color: var(--ttd-heading-background-color);
          color: var(--ttd-heading-color);
        }

        .action-buttons {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: 1fr 1fr 3fr;
        }


        .action-buttons > * {
          border-radius: 5px;
        }

        /* [Responsive] Medium Styles */
        @media (min-width: 900px) {
          :host{
            grid-template-areas:
              "atk_label_ hit_result"
              "action_bts dmg_result";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
          }
        }

      </style>
      <span class="attack-label readout">
        {{attackLabel}}
      </span>
      <span class="action-buttons">
        <span class="button edit" role="button" on-click="editMyData">
          <paper-icon-button aria-label="Edit this attack" icon="my-icons:edit"></paper-icon-button>
        </span>
        <span class="button delete" role="button" on-click="deleteMyData">
          <paper-icon-button aria-label="Delete this attack" icon="my-icons:delete"></paper-icon-button>
        </span>
        <span role="button" class="roll button animate-shake" on-click="roll">
          <slot>Roll</slot>
        </span>
      </span>
      <div aria-live="polite" class="hit-result readout" title="{{hitString}}">
        <template is="dom-if" if="{{hitResult}}">
          <span class="label readout-text">Hit</span>
          <span class="result">{{hitResult}}</span>
        </template>
      </div>
      <div aria-live="polite" class="damage-result readout" title="{{damageString}}">
        <template is="dom-if" if="{{damageResult}}">
          <span class="label readout-text">{{displayDamageType()}}</span>
          <span class="result">{{damageResult}}</span>
        </template>
        </div>
    `;
  }

  /**
   * @param {str} attackLabel This attack's label
   * @param {str} damageType This attack's damage type
   * @param {str} hitString This attack's hit equation
   * @param {str} damageString This attack's damage equation
   * @param {num} hitResult The result from this attack's the most recent hit roll
   * @param {num} damageResult The result from this attack's the most recent damage roll
   * @param {obj} sharedEditData When updated, this object will replace all user inputs with it's fields
   * @param {obj} trayElement Might be the parent's parent <ttd-tray>, otherwise it seeks out it's own <ttd-tray> element
   */
  static get properties() {
    return {
      attackLabel: {
        type: String,
        value: "",
      },
      damageType: {
        type: String,
        value: "",
      },
      hitString: {
        type: String,
        value: "",
      },
      damageString: {
        type: String,
        value: "",
      },
      hitResult: {
        type: Number,
        value: 0,
      },
      damageResult: {
        type: Number,
        value: 0,
      },
      sharedEditData: {
        type: Object,
        value: function() { return {}; },
        notify: true,
      },
      trayElement: {
        type: Object,
        value: function() { return {}; },
      }
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * If this.trayElement was not passed as a paramiter, search for a parent <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] listener to clear results
   * @returns {void}
   */
  ready() {
    super.ready();
    if (typeof this.trayElement.tagName==='undefined') {
      this.findTray();
      if (!this.trayElement) {
        return false;
      }
    }

    this.trayElement.addEventListener('_clearResults', e => {this.clearResults(e)});
	}

  /**
   * Trigger editing this attack's data in <ttd-attacks-manager>
   * @returns {void}
   */
  editMyData() {
    let myEditData = {
      attackLabel: this.attackLabel,
      damageType: this.damageType,
      hitString: this.hitString,
      damageString: this.damageString,
    }

    this.sharedEditData = myEditData;
  }

  /**
   * Trigger <ttd-attacks-manager> to delete this attack
   * @returns {void}
   */
  deleteMyData() {
    let deleteData = {
      delete: true,
      attackLabel: this.attackLabel,
    }

    this.sharedEditData = deleteData;
  }

  /**
   * Roll this attack and update local results
   * @returns {void}
   */
  roll() {
    this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
    if(this.hitString) {
      let hitResultStr = this.rollEquationDice(this.hitString);
      this.hitResult = this.runEquation(hitResultStr, this.hitString);
      console.log("Hit:", this.hitString, hitResultStr, '=', this.hitResult);
    }

    if(this.damageString) {
      let damageResultStr = this.rollEquationDice(this.damageString);
      this.damageResult = this.runEquation(damageResultStr, this.damageString);
      console.log("Damage:", this.damageString, damageResultStr, '=', this.damageResult);
    }
    this.trayElement.fullRefresh();
  }

  /**
   * Clear this attack's results
   * @returns {void}
   */
  clearResults() {
    this.hitResult = 0;
    this.damageResult = 0
  }

  /**
   * @returns {str} The damage type string, or just a string of "damage"
   */
  displayDamageType() {
    return this.damageType||'Damage';
  }
}

window.customElements.define('ttd-attack', TtdAttack);
