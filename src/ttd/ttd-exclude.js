import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TtdChildHelper} from './-ttd-childHelper.js';

/**
 * `ttd-exclude`
 * Specify a type of die&#39;s results to exclude from the sum
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdExclude extends TtdChildHelper {
  static get template() {
    return html`
      <style>
        select{
          width:100%;
          display: block;
          height: 100%;
          font-size: inherit;
          border: 0;
        }
        select:focus{
          outline: none;
        }
      </style>
      <select value="{{excludeDie::change}}">
        <option value="0">[[defaultLanguage]]</option>
        <option value="20">[[prefix]]20[[append]]</option>
        <option value="12">[[prefix]]12[[append]]</option>
        <option value="10">[[prefix]]10[[append]]</option>
        <option value="8">[[prefix]]8[[append]]</option>
        <option value="6">[[prefix]]6[[append]]</option>
        <option value="4">[[prefix]]4[[append]]</option>
      </select>
    `;
  }
  static get properties() {
    return {
      excludeDie: {
        type: Number,
        value: 0,
        observer: 'updateExcludedDie',
      },
      defaultLanguage: {
        type: String,
        value: "Add all dice",
      },
      prefix: {
        type: String,
        value: "Skip d",
      },
      append: {
        type: String,
        value: "s",
      },
    };
  }

  ready(){
    super.ready();
    this.findTray();
    if (!this.trayElement){
      return false;
    }
  }
  
  updateExcludedDie(){
    if (!this.trayElement){
      return false;
    }
    this.trayElement.exclude = this.excludeDie;
    this.trayElement.dispatchEvent(new CustomEvent('_recalculateSum'));
  }
}

window.customElements.define('ttd-exclude', TtdExclude);
