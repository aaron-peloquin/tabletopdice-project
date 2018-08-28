/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import {TtdEquationHelper} from './-ttd-equationHelper.js';

/**
 * `ttd-attack`
 * Displays an attack object and allows the user to roll it's to-hit and damage strings.
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
        <span role="button" aria-label="label" on-click="editMyData">Edit</span>
        <span role="button" aria-label="label" on-click="deleteMyData">Delete</span>
      </span>
      <span role="button" class="roll" on-click="roll"><slot>Attack</slot></button></span>
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

  editMyData() {
    let myEditData = {
      attackLabel: this.attackLabel,
      damageType: this.damageType,
      hitString: this.hitString,
      damageString: this.damageString,
    }

    this.sharedEditData = myEditData;
  }

  deleteMyData() {
    let deleteData = {
      delete: true,
      attackLabel: this.attackLabel,
    }

    this.sharedEditData = deleteData;
  }

  roll() {
    this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
    let hitResultStr = this.rollEquationDice(this.hitString);
    let damageResultStr = this.rollEquationDice(this.damageString);

    this.hitResult = this.runEquation(hitResultStr, this.hitString);
    this.damageResult = this.runEquation(damageResultStr, this.damageString);
    this.trayElement.fullRefresh();
  }

  clearResults() {
    this.hitResult = 0;
    this.damageResult = 0
  }
}

window.customElements.define('ttd-attack', TtdAttack);
