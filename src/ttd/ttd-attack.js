/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
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
      <style>
        :host {
          flex-wrap: nowrap;
          text-align: center;
          height:100%;
          width: 100%;

          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "atk_label_ hit_result"
            "roll______ dmg_result";
        }

        .label span{
          font-size: smaller;
        }

        .attack-label   { grid-area: atk_label_; }
        .roll           { grid-area: roll______; }
        .hit-result     { grid-area: hit_result; }
        .damage-result  { grid-area: dmg_result; }

      </style>
      <span class="attack-label">
        {{attackLabel}}
      </span>
      <span class="action-buttons">
        <span role="button" on-click="editMyData">
          <paper-icon-button aria-label="Edit this attack" icon="my-icons:edit"></paper-icon-button>
        </span>
        <span role="button" on-click="deleteMyData">
          <paper-icon-button aria-label="Delete this attack" icon="my-icons:delete"></paper-icon-button>
        </span>
        <span role="button" class="roll" on-click="roll">
          <slot>Attack</slot>
        </span>
      </span>
      <template is="dom-if" if="{{hitResult}}">
        <div class="hit-result" title="{{hitString}}">
        <span class="label">Hit:</span>
          <span class="result">{{hitResult}}</span>
      </div>
      </template>
      <template is="dom-if" if="{{damageResult}}">
        <div class="damage-result" title="{{damageString}}">
          <span class="label">Damage:</span>
          <span class="result">{{damageResult}}</span>
          <template is="dom-if" if="{{damageType}}">
            <span class="damage-type">({{damageType}})</span>
          </template>
        </div>
    </template>
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
   * Attach the <ttd-tray> with TtdChildHelper:findTray() if it was not passed to this element.
   * Add [_clearResults] listener to clear results
   * @returns {void}
   */
  ready() {
    super.ready();
    if (!this.trayElement) {
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
    let hitResultStr = this.rollEquationDice(this.hitString);
    let damageResultStr = this.rollEquationDice(this.damageString);

    this.hitResult = this.runEquation(hitResultStr, this.hitString);
    this.damageResult = this.runEquation(damageResultStr, this.damageString);
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
}

window.customElements.define('ttd-attack', TtdAttack);
