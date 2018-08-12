/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      :host{

      }

      .card {
        max-width: 700px;
        margin: 0 auto;
        padding: 0;
        display: grid;
        color: var(--app-secondary-color);
        border-radius: 5px;
        background-color: var(--app-card-background);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      img.logo,
      .card > h1{
        margin: 0 auto;
        text-align: center;
      }

      .copy-box{
        padding: 15px;
        background-color: var(--app-copybox-background);
      }

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      h1 {
        font-size: 2rem;
        margin: 0;
        margin-top: 15px;
        background: var(--app-primary-color);
        color: #EFEFEF;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
