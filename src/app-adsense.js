import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `app-adsense`
 * Clears all rolled value data from the application
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AppAdsense extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          padding-top: 10px;
          text-align: center;
          display: table;
          height: 100%;
          width: 100%;
          padding: 0px;
        }
        div{
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            background-color: lightgrey;
        }
      </style>
      <div on-click="track"><slot>Placeholder Ad</slot></div>
    `;
  }

  track(){
    
  }
}

window.customElements.define('app-adsense', AppAdsense);
