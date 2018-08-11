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
class TtdCustom extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        :host {
          flex-wrap: nowrap;
          text-align: center;
          display: table;
          height:100%;
          width: 100%;
        }
        form{
          display: table-cell;
          vertical-align: middle;
        }

        div{
          height: 100%;
          width: 100%;
          display: inline-grid;
          align-items: center;
        }

        div > *{
          grid-row: 1;
        }

        input{
          height: 100%;
          margin-right: -1px;
          font-size: inherit;
          border: 0;
          min-width: 0;
        }
        input:focus{
          outline: none;
        }
        span{
          padding: .25em;
          display: table-cell;
          vertical-align: middle;
        }
      </style>
      <form>
        <div>
          <span><template is="dom-if" if="[[rolled]]">{{rolled}}</template>d</span>
          <input type="number" value="{{customSides::input}}" />
        </div>
      </form>
    `;
  }

  static get properties() {
    return {
      customSides: {
        type: Number,
        value: 100,
        observer: 'resetDie',
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
    this.trayElement.addEventListener('_rollCustomDie',e => {this.roll(e)});
    this.shadowRoot.querySelector('form').addEventListener('submit', e=>{this.submitRoll(e)});
	}

  submitRoll(e){
    e.preventDefault();
    this.roll();
  }

  roll(){
    this.rolled++;
    this.trayElement.roll(parseInt(this.customSides));
  }

  resetDie(){
    this.rolled = 0;
  }
}

window.customElements.define('ttd-custom', TtdCustom);
