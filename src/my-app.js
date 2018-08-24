/**
 * @license
 * Copyright (c) 2018 The Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/LICENSE
 * The complete set of authors may be found at https://raw.githubusercontent.com/aaron-peloquin/tabletopdice-project/master/AUTHORS
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-font-family: "Cinzel", "Georgia", serif;  /* App font family */
          --app-font-weight: Bolder;                      /* App font weight */

          /* Color variables */
          --app-primary-color: #33472f;                   /* App Heading Color */
          --app-secondary-color: black;                   /* App Font Color */
          --app-card-background: #33472f;                 /* Card Background */
          --app-copybox-background: #bbcca8;              /* TTD child element background color (default) */
          --app-ttd-child-color: #EFEFEF;                 /* TTD child element font color */
          --ttd-default-background-color: #5b3b2e;    /* TTD child element background color (default) */
          --app-ttd-special-background-color: #845b43;    /* TTD child element background color (special) */
          --app-ttd-secondary-background-color: #653214;  /* TTD child element background color (secondary) */
          --app-ttd-secondary-color: #FFFFFF;             /* TTD child element background color (secondary) */
          --app-ttd-clean-color: #222;                    /* TTD child element color (clean) */
          --app-ttd-clean-background-color: #fff;         /* TTD child element background color (clean) */
          --ttd-noninteractive-color: #EFEFEF;
          --ttd-noninteractive-background-color: #653214;
  

          font-family: var(--app-font-family);
          font-weight: var(--app-font-weight);

          display: block;
        }

        iron-pages > *{
          padding: 15px;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        #drawer {
          border-right: solid 5px;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="home" href="[[rootPath]]">Home</a>
            <a name="about" href="[[rootPath]]about">About</a>
            <a name="basic-dice-roller" href="[[rootPath]]quick-dice-roller">Roll Quick</a>
            <a name="basic-dice-roller" href="[[rootPath]]basic-dice-roller">Roll Basic</a>
            <a name="advanced-dice-roller" href="[[rootPath]]advanced-dice-roller">Roll Advanced</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button aria-label="Navigation Menu" icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Tabletop Dice</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="{{page}}" attr-for-selected="name" role="main">
            <app-view-home name="app-view-home"></app-view-home>
            <app-view-about name="about"></app-view-about>
            <ttd-view-quick name="quick-dice-roller"></ttd-view-quick>
            <ttd-view-basic name="basic-dice-roller"></ttd-view-basic>
            <ttd-view-advanced name="advanced-dice-roller"></ttd-view-advanced>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     // If no page was found in the route data, page will be an empty string.
     // Show views that are called out, otherwise if the 'page' doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'app-view-home';
    } else if (['app-view-home','about','quick-dice-roller','basic-dice-roller','advanced-dice-roller'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'app-view-home':
        import('./app-view-home.js');
        document.title = 'TabletopDice.com';
        break;
      case 'about':
        import('./app-view-about.js');
        document.title = 'About : TabletopDice.com';
        document.getElementsByName("description")[0].content = "Roll dice in your tabletop game to save against forgetting your dice.";
        break;
      case 'quick-dice-roller':
        import('./ttd-view-quick.js');
        document.title = 'Quick Dice Tray : TabletopDice.com';
        document.getElementsByName("description")[0].content = "Quickly roll dice in your tabletop game.";
        break;
      case 'basic-dice-roller':
        import('./ttd-view-basic.js');
        document.title = 'Basic Dice Tray : TabletopDice.com';
        document.getElementsByName("description")[0].content = "Roll any type of dice in your tabletop game.";
        break;
      case 'advanced-dice-roller':
        import('./ttd-view-advanced.js');
        document.title = 'Advanced Dice Tray : TabletopDice.com';
        document.getElementsByName("description")[0].content = "Roll any type of dice in your tabletop game using an equation-like string of dice logic.";
        break;
      case 'view404':
        import('./my-view404.js');
        document.title = '404 : TabletopDice.com';
        document.getElementsByName("description")[0].content = "No page found";
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
