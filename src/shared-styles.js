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
      /** Standard view CSS */
      .card {
        max-width: 900px;
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

      dt{
        font-size: larger;
        text-decoration: underline;
      }

      /** == TTD views CSS == */
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

      /**
       *  Define grid-area for all <ttd-*> child elements using
       * 7 characters for equal spacing
       * */
      ttd-clear               { grid-area: clear__; }
      ttd-custom              { grid-area: custom_; }
      ttd-custom-roll         { grid-area: custrol; }
      ttd-attack              { grid-area: attack_; }
      ttd-attacks-manage      { grid-area: atk_man; }
      ttd-attacks-list        { grid-area: atk_lst; }
      ttd-die                 { grid-area: die___6; }
      ttd-die[sides="4"]      { grid-area: die___4; }
      ttd-die[sides="8"]      { grid-area: die___8; }
      ttd-die[sides="10"]     { grid-area: die__10; }
      ttd-die[sides="12"]     { grid-area: die__12; }
      ttd-die[sides="20"]     { grid-area: die__20; }
      ttd-equation            { grid-area: equat__; }
      ttd-equation.main-hand  { grid-area: equat_m; }
      ttd-equation.off-hand   { grid-area: equat_o; }
      ttd-equation.third-hand { grid-area: equat_t; }
      ttd-high-low            { grid-area: highLow; }
      ttd-history             { grid-area: history; }
      ttd-total               { grid-area: total__; }

      /** Boilerplate tray styles */
      ttd-tray {
        display: inline-grid;
        grid-gap: 1rem;
        grid-template-columns: auto;
        grid-template-rows: auto;
        width: 100%;
      }

      ttd-tray > *{
        background-color: var(--ttd-default-background-color);
        box-shadow:
          2px 2px 2px 1px var(--app-ttd-clean-color),
          -1px -1px 2px 1px var(--app-ttd-child-color);
        border-radius: 5px;
        color: var(--app-ttd-child-color);
        overflow: hidden;
        font-size: 2rem;
      }

      ttd-die,
      ttd-clear,
      ttd-custom-roll{
        cursor: pointer;
      }


      /** Target specific fields for animation */
      ttd-tray ttd-die:active,
      ttd-tray ttd-clear:active,
      ttd-tray ttd-custom-roll:active{
        animation: buttonShake;
        animation-duration: .25s;
      }

      ttd-tray ttd-history,
      ttd-tray ttd-high-low,
      ttd-tray ttd-total,
      ttd-tray ttd-clear{
        background-color: var(--ttd-noninteractive-background-color);
        color: var(--ttd-noninteractive-color);
      }
      ttd-tray ttd-custom,
      ttd-tray ttd-custom-roll,
      ttd-tray ttd-equation{
        background-color: var(--app-ttd-special-background-color);
      }

      ttd-tray ttd-equation{
        margin-bottom: 10px;
      }

      /** Misc. minor Styles */
      .tray-wrapper{
        margin: 21px;
      }

      /* IE10+ CSS styles go here */
      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        ttd-tray ttd-die,
        ttd-tray ttd-custom,
        ttd-tray ttd-custom-roll{
          width: 50%;
          float: left;
        }
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
