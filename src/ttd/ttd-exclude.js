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
        select,
        option{
          font-family: var(--app-font-family);
          font-weight: var(--app-font-weight);
          background-color: var(--app-ttd-clean-background-color);
          color: var(--app-ttd-clean-color);
        }
      </style>
      <select value="{{die::change}}">
        <option value="0" selected$="{{isSelected(type)}}">[[defaultLanguage]]</option>
        <template is="dom-repeat" items="{{types}}" as="sides">
            <option value="[[sides]]" selected$='[[_computeSelected(sides, die)]]'>[[prefix]][[sides]][[append]]</option>
        </template>
      </select>
    `;
  }
  static get properties() {
    return {
      die: {
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
      types: {
        type: Array,
        value: function(){
          return [20, 12, 10, 8, 6, 4];
        },
      }
    };
  }

  ready(){
    super.ready();
    this.findTray();
    if (!this.trayElement){
      return false;
    }

    this.trayElement.exclude = this.die;
  }
  
  _computeSelected(t,d){
    return t===d;
  }

  updateExcludedDie(){
    if (!this.trayElement){
      return false;
    }
    this.trayElement.exclude = this.die;

    //Report to google analytics
    gtag('event', 'update-exclude', {
      'die': this.die,
      'eventLabel': this.die
    });
    this.trayElement.dispatchEvent(new CustomEvent('_recalculateSum'));
  }
}

window.customElements.define('ttd-exclude', TtdExclude);
