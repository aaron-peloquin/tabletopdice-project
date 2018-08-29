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
      :host {
        /* #596955 */
        --ttd-color: #EFEFEF;                           /* TTD child element font color */
        --ttd-button-background-color: #694834;         /* TTD child element background color (default) */
        --ttd-special-background-color: #694834;        /* TTD child element background color (special) */
        --ttd-readout-background-color: #596955;        /* TTD child element background color (secondary) */
        --ttd-readout-color: #FFFFFF;                   /* TTD child element background color (secondary) */
        --ttd-clean-color: #222;                        /* TTD child element color (clean) */
        --ttd-clean-background-color: #fff;             /* TTD child element background color (clean) */
        --ttd-noninteractive-color: #EFEFEF;            /* TTD non-interactive color */
        --ttd-noninteractive-background-color: #596955; /* TTD non-interactive background color */
        --ttd-heading-background-color: #bbcca8;        /* TTD heading background color */
        --ttd-heading-color: #222;                      /* TTD heading color */
      }
      /** Standard view CSS */
      .card {
        max-width: 900px;
        margin: 0 auto;
        padding: 0;
        display: grid;
        color: var(--app-secondary-color);
        background: var(--app-primary-color);
        border-radius: 5px;
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
        background-color: var(--app-copybox-background);
        color: #222;
        width: 100%;
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

      /**
       *  Define grid-area for all <ttd-*> child elements using
       * 7 characters for equal spacing
       * I also just wanna say, grid-template-areas is amazing. IE does not support, tho.. :'(
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
        overflow: hidden;
        font-size: 2rem;
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
