/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';

/**
 * `ttd-die`
 * Rolls a die with standard sides (1d4, 1d8, etc-)
 *
 * @customElement
 * @polymer
 */
class TtdDie extends TtdChildHelper {
  static get template() {
    return html`
			<style>
				:host{
					text-align: center;
					display: table;
					height: 100%;
					width: 100%;
				}
				div{
					display: table-cell;
					vertical-align: middle;
				}
			</style>
			<div on-click="roll">
				<template is="dom-if" if="[[rolled]]">{{rolled}}</template>d[[sides]]
			</div>
		`;
  }

	/**
	 * @param {num} sides The number of sides this die button has when rolled, the max random result
   * @param {num} rolled The number of times this die has been rolled, reset when results are cleared
	 */
	static get properties() {
		return {
			sides: {
				type: Number,
				value: 6,
			},
			rolled: {
				type: Number,
				value: 0,
			},
		};
	}


	/**
   * Element ready for use, fire super.ready() for native functionality
   * Attach the <ttd-tray> with TtdChildHelper:findTray()
   * Add [_clearResults] to reset the rolled count
   */
	ready() {
		super.ready();
		this.findTray();
		if (!this.trayElement) {
			return false;
		}
		this.trayElement.addEventListener('_clearResults', e => {this.resetDie(e)});
	}

	/**
	 * Roll this die, incriment the number of times rolled
	 */
	roll() {
		this.rolled++;
		if (!this.trayElement) {
			return false;
		}
		this.trayElement.roll(this.sides);
	}

	/**
	 * Reset the number of times this die has been rolled
	 */
	resetDie() {
		this.rolled = 0;
	}

}

window.customElements.define('ttd-die', TtdDie);