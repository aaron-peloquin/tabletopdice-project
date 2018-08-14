import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-history`
 * Displays a historical readout of all previously rolled dice
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdHighLow extends TtdChildHelper {
  static get template() {
    return html`
      <style>
      :host{
          padding: 10px;
          text-align: center;
          font-size: smaller;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }

        div{
          display: grid;
          grid-template-rows: 1fr 1fr 1fr;
        }

        span.result,
        img{
          grid-row: 1fr;
          justify-self: center;
          width: 50%;
          font-size: 1.75rem;
        }

        .invisible-text{
          font-size: 0px;
        }
      </style>
      <div class="results-wrapper">
        <span class="result">{{max}}<span class="invisible-text">(high), </span></span>
        <img src="[[dieImageURI(die)]]" />
        <span class="result">{{min}}<span class="invisible-text">(low)</span></span>
      </div>
      `;
  }
  static get properties() {
    return {
      die: {
        type: Number,
        value: 20,
        reflectToAttribute: true,
      },
      min: {
        type: Number,
        value: '',
      },
      max: {
        type: Number,
        value: '',
      },
    };
  }

	ready(){
		super.ready();
		this.findTray();
		if (!this.trayElement){
			return false;
		}
    this.trayElement.addEventListener('_updateHistory', e => {this.updateMinMax(e)});
  }

  //Loop through the _updateHistory results and set our this.max and this.min.
  updateMinMax(e){
    this.min = 0;
    this.max = 0;
    var dieSides = this.die;
    var min = null;
    var max = null;

    e.detail.data.forEach(function(r){
      if(dieSides==r.sides){
        if (max === null || max < r.result){
          max = r.result;
        }
        if (min === null || min > r.result){
          min = r.result;
        }
      }
    });
    this.min  = min;
    this.max  = max;
  }

}

window.customElements.define('ttd-high-low', TtdHighLow);
