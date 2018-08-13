import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-clear`
 * Clears all rolled value data from the application
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdClear extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          text-align: center;
          display: table;
          height:100%;
					width: 100%;
        }
        div{
          display: table-cell;
          vertical-align: middle;
        }

      </style>
      <div on-click="clear"><slot>Clear</slot></div>
    `;
  }

  ready(){
		super.ready();
		this.findTray();
		if (!this.trayElement){
			return false;
		}
	}

  clear(){
		if (!this.trayElement){
			return false;
		}
    // Dispatch _clearResults event to all elements that are listening.
    this.trayElement.dispatchEvent(new CustomEvent('_clearResults'));
  }
}

window.customElements.define('ttd-clear', TtdClear);
