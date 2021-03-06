/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="ttd-styles">
  <template>
    <style>
      /** Standard ttd element CSS */
      :host {
        flex-wrap: nowrap;
        text-align: center;
        width: 100%;
      }

      /** Setup CSS Animations */
      @keyframes buttonShake {
        0% { transform: translate(1px, 0px) rotate(2deg); }
        10% { transform: translate(0px, 1px) rotate(1deg); }
        20% { transform: translate(-1px, 0px) rotate(-1deg); }
        30% { transform: translate(-2px, -1px) rotate(0deg); }
        40% { transform: translate(-1px, 0px) rotate(1deg); }
        50% { transform: translate(0px, 1px) rotate(2deg); }
        60% { transform: translate(1px, 2px) rotate(3deg); }
        70% { transform: translate(2px, 1px) rotate(3deg); }
        80% { transform: translate(3px, 0px) rotate(2deg); }
        90% { transform: translate(2px, 1px) rotate(1deg); }
        100% { transform: translate(0px, 0px) rotate(0deg); }
      }

      ttd-tray > * {
        border-radius: 5px;
      }

      .readout {
        background-color: var(--ttd-noninteractive-background-color);
        color: var(--ttd-noninteractive-color);
        position: relative;
      }

      .readout-text {
        color: #eee;
        font-size: 1rem;
        left: 5px;
        position: absolute;
        text-decoration: underline;
        top: 5px;
      }
      .button {
        background-color: var(--ttd-button-background-color);
        box-shadow:
          2px 2px 2px 1px var(--ttd-clean-color),
          -1px -1px 2px 1px var(--ttd-color);
        color: var(--ttd-color);
        cursor: pointer;
      }

      .button:hover{
        filter: brightness(110%);
      }

      .animate-shake:active{
        animation: buttonShake;
        animation-duration: .25s;
      }

      paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      .invisible-text{
        font-size: 0px;
      }

      img {
        /* Text selection */
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
