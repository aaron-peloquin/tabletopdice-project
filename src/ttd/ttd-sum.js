import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-sum`
 * Display the sum of all dice rolled
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdSum extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host{
          text-align: center;
          display: table;
          height:100%;
          width: 100%;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
        span{
          display: table-cell;
          vertical-align: middle;
          overflow: hidden;
        }
        .invisible-text{
          font-size: 0px;
        }
      </style>
      <span>[[sum]]<span class="invisible-text">(Total)</span></span>
    `;
  }

  static get properties() {
    return {
      sum: {
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
    this.trayElement.addEventListener('_updateSum', e => {this.updateSum(e)});
  }

  updateSum(e){
    this.sum = 0;
    this.sum = e.detail.data.toLocaleString();
  }
}

window.customElements.define('ttd-sum', TtdSum);
