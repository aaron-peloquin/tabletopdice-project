/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

 import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `-TtdChildHelper`
 * Extended by child elements of <ttd-tray> for shared functionality
 *
 * @helperClass
 * @polymer
 * @export TtdChildHelper
 */
class TtdChildHelper extends PolymerElement {

  /**
   * Loop through parents of the node and attaches the first
   * parent <ttd-tray> element to this.trayElement.
   * @returns {void}
   */
  findTray() {
    let el = this;
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName == 'TTD-TRAY') {
        this.trayElement = el;
        break;
      }
    }

    /** If no <ttd-tray> was found, throw a console error to let the developer know what's wrong */
    if(!this.trayElement) {
      console.error("<"+this.nodeName.toLowerCase()+"> elements must be wrapped in a <ttd-tray> element");
    }
  }

  // 
  /**
   * Returns dieSides if it has an image, otherwise return "default"
   * @param {number} dieSides The number of sides on a die you want to check for an image.
   * @returns {string} The file URI to display
   */
  dieImageURI(dieSides) {
    let uri = 'images/d';
    /** To approve new images, add them to this array & name their files accordingly */
    if([4,6,8,10,12,20].indexOf(dieSides)>-1) {
      uri += dieSides+'.png';
    }
    else {
      uri += 'default.png';
    }
    return uri;
  }
}

export {TtdChildHelper};