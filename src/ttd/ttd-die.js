import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';

/**
 * `ttd-die`
 * Rolls a die with standard sides (eg: 1d4, 1d8).
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
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

	ready(){
		super.ready();
		this.findTray();
		if (!this.trayElement){
			return false;
		}
    this.trayElement.addEventListener('_clearResults', e => {this.resetDie(e)});
	}

	roll(){
		this.rolled++;
		if (!this.trayElement){
			return false;
		}
		this.trayElement.roll(this.sides);
	}

	resetDie(){
		this.rolled = 0;
	}

}

window.customElements.define('ttd-die', TtdDie);