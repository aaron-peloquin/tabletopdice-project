/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        max-width: 700px;
        margin: 0 auto;
        padding: 0;
        display: grid;
        color: var(--app-secondary-color);
        border-radius: 5px;
        background-color: var(--app-card-background);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        width: 100%;
      }

      img.logo,
      .card > h1{
        margin: 0 auto;
        text-align: center;
      }

      .copy-box{
        padding: 15px;
        font-size: 16px;
        background-color: var(--app-copybox-background);
      }

      h1 {
        font-size: 2rem;
        margin: 0;
        margin-top: 15px;
        background: var(--app-primary-color);
        color: #EFEFEF;
      }

      h2{
        font-size: 1.25rem;
        text-align: center;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
