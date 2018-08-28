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
        height:100%;
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
        70% { transform: translate(2px, 1px) rotate(4deg); }
        80% { transform: translate(3px, 0px) rotate(3deg); }
        90% { transform: translate(2px, 1px) rotate(2deg); }
        100% { transform: translate(0px, 0px) rotate(1deg); }
      }

      ttd-tray > * {
        border-radius: 5px;
      }

      .readout {
        background-color: var(--ttd-noninteractive-background-color);
        color: var(--ttd-noninteractive-color);
      }

      .button {
        background-color: var(--ttd-button-background-color);
        box-shadow:
          2px 2px 2px 1px var(--ttd-clean-color),
          -1px -1px 2px 1px var(--ttd-color);
        color: var(--ttd-color);
        cursor: pointer;
      }

      .animate-shake:active{
        animation: buttonShake;
        animation-duration: .25s;
      }

      paper-icon-button {
        --paper-icon-button-ink-color: white;
      }

      .readout-text {
        position: relative:
        top: 0;
        left: 0;
        font-size: 1rem;
      }

      img {
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
