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
      :host{
          padding: 10px;
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;

          -webkit-touch-callout: text; /* iOS Safari */
          -webkit-user-select: text; /* Safari */
          -khtml-user-select: text; /* Konqueror HTML */
          -moz-user-select: text; /* Firefox */
          -ms-user-select: text; /* Internet Explorer/Edge */
          user-select: text; /* Non-prefixed version, currently supported by Chrome and Opera */
        }
        :host::-webkit-scrollbar {
          display: none;
        }

        ol {
          margin: 0;
          padding: 0;
          height: 100%;
          min-height: 65px;

          /* horizontal scrollbar functionality */
          -ms-overflow-style: -ms-autohiding-scrollbar;
          overflow-x: scroll;
          white-space: nowrap;
        }

        /* horizontal scrollbar functionality */
        ol::-webkit-scrollbar {
          display: none;
        }
        /* disable horizontal scrollbar functionality in firefox due to inability to hide them properly */
        @-moz-document url-prefix() {
          :host,
          ol {
            overflow-x: hidden;
          }
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
          margin: 0 auto;
        }

        li > span{
          position: relative;
          z-index: 20; /* naturally */
          font-weight: bold;
          text-align: center;
        }

        .invisible-text{
          font-size: 0px;
        }
      </style>
      <ol title="Copy for dice roll log">
        <dom-repeat items="{{results}}">
          <template>
            <li>
              <span>[[resultText(item)]]<span class="invisible-text">(from d[[item.sides]]) </span></span>
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
