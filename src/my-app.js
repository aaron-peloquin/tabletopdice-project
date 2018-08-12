/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
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

          --app-font-family: 'Cinzel', serif;             /* App font family */
          --app-font-weight: Bolder;                      /* App font weight */

          /* Color variables */
          --app-primary-color: #487D70;                   /* App Heading Color */
          --app-secondary-color: black;                   /* App Font Color */
          --app-card-background: #487D70;                 /* Card Background */
          --app-copybox-background: #74C9B5;              /* TTD child element background color (default) */
          --app-ttd-child-color: #EFEFEF;                 /* TTD child element font color */
          --app-ttd-default-background-color: #74C9B5;    /* TTD child element background color (default) */
          --app-ttd-special-background-color: #A8BFB9;    /* TTD child element background color (special) */
          --app-ttd-secondary-background-color: #386157;  /* TTD child element background color (secondary) */
          --app-ttd-secondary-color: #FFFFFF;             /* TTD child element background color (secondary) */
          --app-ttd-clean-color: #222;                    /* TTD child element color (clean) */
          --app-ttd-clean-background-color: #fff;         /* TTD child element background color (clean) */

          font-family: var(--app-font-family);
          font-weight: var(--app-font-weight);

          display: block;
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
            <a name="app-view-home" href="[[rootPath]]app-view-home">Home</a>
            <a name="view2" href="[[rootPath]]view2">View Two</a>
            <a name="basic-dice-roller" href="[[rootPath]]basic-dice-roller">Dice Roller</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">Tabletop Dice</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <app-view-home name="app-view-home"></app-view-home>
            <my-view2 name="view2"></my-view2>
            <ttd-view-basic name="basic-dice-roller"></ttd-view-basic>
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
    } else if (['app-view-home', 'view2', 'basic-dice-roller'].indexOf(page) !== -1) {
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
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'basic-dice-roller':
        import('./ttd-view-basic.js');
        import('./ttd/ttd-tray.js');
        import('./ttd/ttd-history.js');
        import('./ttd/ttd-sum.js');
        import('./ttd/ttd-die.js');
        import('./ttd/ttd-clear.js');
        import('./ttd/ttd-exclude.js');
        import('./ttd/ttd-custom.js');
        import('./ttd/ttd-custom-roll.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
