/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-custom`
 * Allow the app visitor to define a custom sided die (ie 1d100 or 1d32), then roll that die
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdCustomRoll extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          text-align: center;
          display: table;
          height:100%;
					width: 100%;
        }
        span{
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <span><slot>Roll</slot></span>
    `;
  }

  ready(){
		super.ready();
		this.findTray();
		if (!this.trayElement){
			return false;
    }
    this.addEventListener('click',e => {this.rollCustomDie(e)});
	}

  rollCustomDie(){
		if (!this.trayElement){
			return false;
    }
    this.trayElement.dispatchEvent(new CustomEvent('_rollCustomDie'));
  }
}

window.customElements.define('ttd-custom-roll', TtdCustomRoll);
