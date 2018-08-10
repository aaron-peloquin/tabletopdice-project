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
