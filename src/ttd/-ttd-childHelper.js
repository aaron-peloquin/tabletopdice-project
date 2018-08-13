import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `ttd-history`
 * Displays a historical readout of all previously rolled dice
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TtdChildHelper extends PolymerElement {

  // Loop through parents of the node and return the first <ttd-tray> element.
  findTray(){
    var el = this;
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName == 'TTD-TRAY'){
        this.trayElement = el;
        break;
      }
    }
    //this.trayElement = this.closest("ttd-tray");
    if(!this.trayElement){
      console.error("<"+this.nodeName.toLowerCase()+"> elements must be wrapped in a <ttd-tray> element");
    }
  }

  // Returns dieSides if it has an image, otherwise return "default"
  dieImageURI(dieSides){
    // To approve new images, add them to this array & name their files accordingly.
    var uri = 'images/d';
    if([4,6,8,10,12,20].indexOf(dieSides)>-1){
      uri += dieSides+'.png';
    }
    else{
      uri += 'default.png';
    }
    return uri;
  }
}

export {TtdChildHelper};