import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * `ttd-history`
 * Displays a historical readout of all previously rolled dice
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdHistory extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        *{
          overflow: -moz-scrollbars-none;
        }
      :host{
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;
        }
        :host::-webkit-scrollbar {
          display: none;
        }
        ol {
          margin: 0;
          padding: 0;
          height: 100%;
          min-height: 64px;

          /* horizontal scrollbar functionality */
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;
          white-space: nowrap;
        }

        /* horizontal scrollbar functionality */
        ol::-webkit-scrollbar {
          display: none;
        }

        ol > li {
          display: inline-grid;
          height: 100%;
          align-items: center;
        }

        li > *{
          grid-row: 1;
          grid-column: 1;
        }

        li > img{
          vertical-align: middle;
          -webkit-filter: invert(90%);
          -filter: invert(90%);
        }

        li > span{
          position: relative;
          z-index: 20; /* naturally */
          font-weight: bold;
          text-align: center;
        }

      </style>
      <ol>
        <dom-repeat items="{{results}}">
          <template>
            <li>
              <span>[[resultText(item)]]</span>
              <img src="[[dieImageURI(item.sides)]]" />
            </li>
          </template>
        </dom-repeat>
      </ol>
`;
  }
  static get properties() {
    return {
      results: {
        type: Array,
        value: function(){ return []; },
      },
      excited: {
        type: Boolean,
        value: false,
      },
    };
  }

	ready(){
		super.ready();
		this.findTray();
		if (!this.trayElement){
			return false;
		}
    this.trayElement.addEventListener('_updateHistory', e => {this.updateHistory(e)});
  }

  updateHistory(e){
    this.results = [];
    this.results = e.detail.data.slice(0).reverse();
  }

  resultText(r){
    return r.result.toLocaleString() + (this.excited && r.result==r.sides?'!':'');
  }
}

window.customElements.define('ttd-history', TtdHistory);
