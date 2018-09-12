/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './../-ttd-sharedStyles.js';
import {TtdEquationHelper} from './-ttd-equationHelper.js';

/**
 * `ttd-attacks-manage`
 * Allows the user to add/edit their attacks data (stored in localstorage).
 * Each attack holds a label, to-hit equation, damage equation, and a damage type
 * Note: If you are using this in congunction with a <ttd-attacks-list> (and you should), then
 * you'll want to two-way databind their edit-data attributes
 * example:
 *    <ttd-attacks-manage shared-edit-data={{sharedEditData}}></ttd-attacks-manage>
 *    <ttd-attacks-list shared-edit-data={{sharedEditData}}></ttd-attacks-list>
 *
 * @customElement
 * @polymer
 */
class TtdAttacksManage extends TtdEquationHelper {
  static get template() {
    return html`
      <style include="ttd-styles">
        :host {
          flex-wrap: nowrap;
          text-align: center;
          width:100%;
        }

        form{
          align-items: center;
          display: grid;
          grid-gap: 0.75rem;
          grid-template-areas:
            "label_"
            "type__"
            "hit___"
            "damage"
            "submit";
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
        }

        form > *{
          height: 100%;
        }

        input{
          background-color: var(--ttd-clean-background-color);
          border: 0;
          color: var(--ttd-clean-color);
          font-family: var(--app-font-family);
          font-size: inherit;
          font-weight: var(--app-font-weight);
          height: 100%;
          margin-right: -1px;
          min-width: 0;
          padding-left: 10px;
          width: 100%;
        }
        input:focus{
          outline: none;
        }

        button {
          font-family: inherit;
          font-size: inherit;
          font-weight: bold;
        }
        .hit    { grid-area: hit___; }
        .damage { grid-area: damage; }
        .label  { grid-area: label_; }
        .type   { grid-area: type__; }
        button { grid-area: submit; }

        /* [Responsive] Medium Styles */
        @media (min-width: 900px) {
          form{
            grid-template-areas:
              "label_ type__"
              "hit___ damage "
              "submit submit";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
          }
          select{
            border-left: 1px solid;
          }
        }

      </style>
      <form>
        <label class="label">
          <input
            type="text"
            required
            maxlength="14"
            aria-label="This attack's name"
            placeholder="* Attack (Maul)"
            value="{{attackLabel::input}}"
          />
        </label>
        <label class="type">
          <input
            type="text"
            maxlength="11"
            aria-label="This attack's damage type"
            placeholder="Type (Bludgeoning)"
            value="{{damageType::input}}"
          />
        </label>
        <label class="hit">
          <input
            aria-label="This attack's chance to hit roll equation"
            title="Max: 999d999"
            placeholder="To hit (1d20+4)"
            value="{{hitString::input}}"
          />
        </label>
        <label class="damage">
          <input
            aria-label="This attack's damage roll equation"
            title="Max: 999d999"
            placeholder="Damage (2d6+2)"
            value="{{damageString::input}}"
          />
        </label>
        <button type="submit" role="button" on-click="saveAttackToLocalStorage"><slot>Save Attack</slot></button>
      </form>
    `;
  }

  /**
   * @param {str} attackLabel User inputted attack label
   * @param {str} damageType User inputted damage type
   * @param {str} hitString User inputted hit equation
   * @param {str} damageString User inputted damage equation
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
        observer: "cleanseHit",
      },
      damageString: {
        type: String,
        value: "",
        observer: "cleanseDamage",
      },
      sharedEditData: {
        type: Object,
        value: function() { return {}; },
        observer: 'updateEdit',
        notify: true,
      },
    };
  }

  /**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * @returns {void}
   */
  ready() {
    super.ready();
    this.findTray();
    if (!this.trayElement) {
      return false;
    }
    
      /** Ensure that we have an attacks key. */
      if(!this.trayElement.storage.data.hasOwnProperty('attacks')) {
        this.trayElement.storage.data.attacks = [];
      }
    
    this.shadowRoot.querySelector('form').addEventListener('submit', e=>{this.saveAttackToLocalStorage(e)});
	}

  /**
   * @param {obj} e eventListener contains the updated data from the <form>'s submit event
   * @returns {void}
   */
  saveAttackToLocalStorage(e) {
    e.preventDefault();
    let labelKey = this.attackLabel.trim();
    if(labelKey == '') {
      this.attackLabel = labelKey;
      this.focusAttackLabel();
      return;
    }
    let trayAttacks = this.trayElement.storage.data.attacks;
    let overwriteKey = -1;
    let saved = false;
    let newAttack = {
      attackLabel: labelKey,
      damageType: this.damageType,
      hitString: this.hitString,
      damageString: this.damageString,
    }

    for(let atk in trayAttacks) {
      if(newAttack.attackLabel == trayAttacks[atk].attackLabel) {
        overwriteKey = atk;
        break;
      }
    }

    /** Attempt to overwrite an attackLabel if one already exists */
    if(overwriteKey >= 0) {
      if (window.confirm("Are you sure you want to overwrite "+newAttack.attackLabel+"?")) {
        saved = true;
        this.trayElement.storage.data.attacks[overwriteKey] = newAttack;
      }
    }
    else {    /** Create new attack */
      saved = true;
      this.trayElement.storage.data.attacks.push(newAttack);
    }
    if(saved) {
      this.trayElement.dispatchEvent(new CustomEvent('_updateLocalStorage'));
      this.clearForm();
    }
  }

  /** Cleanse this.hitString */
  cleanseHit() {
    this.hitString = this.cleanseEquationStr(this.hitString);
  }


  /** Cleanse this.damageString */
  cleanseDamage() {
    this.damageString = this.cleanseEquationStr(this.damageString);
  }

  /**
   * Resets the shadowDom <form>'s fields.
   * @returns {void}
  */
  clearForm() {
    this.sharedEditData = {
      attackLabel: '',
      damageType: '',
      hitString: '',
      damageString: '',
    };
  }

  /**
   * Focus a user on the attack label
   */
  focusAttackLabel() {
    this.shadowRoot.querySelector('.label input').focus();
  }

  /**
   * Update all local input fields to be the this.sharedEditData values.
   * @returns {void}
   */
  updateEdit() {
    if(typeof this.sharedEditData=='object') {
      if(this.sharedEditData.hasOwnProperty('delete')) {
        let trayAttacks = this.trayElement.storage.data.attacks;
        /** Loop through all attacks in storage and try to find one to delete */
        for(let atk in trayAttacks) {
          if(this.sharedEditData.attackLabel == trayAttacks[atk].attackLabel) {
            if(window.confirm("Are you sure you want to delete "+this.sharedEditData.attackLabel+"?")) {
              this.trayElement.storage.data.attacks.splice(atk,1);
              this.trayElement.dispatchEvent(new CustomEvent('_updateLocalStorage'));
            }
          }
        }
        return;
      }

      /** Edit sharedEditData */
      for (let e in this.sharedEditData) {
        this[e] = this.sharedEditData[e];
      }
      this.focusAttackLabel();
    }
  }
}

window.customElements.define('ttd-attacks-manage', TtdAttacksManage);
