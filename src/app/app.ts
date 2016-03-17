/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { FORM_PROVIDERS } from 'angular2/common';

import { RouterActive } from './directives/router-active';
import { HatSelector } from './hats/hat-selector.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS ],
  directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
  pipes: [],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    nav ul {
      display: inline;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 60px;
    }
    nav li {
      display: inline;
    }
    nav li.active {
      background-color: lightgray;
    }
  `],
  template: require('./app.html')
})
@RouteConfig([
  {
    path: '/hats',
    component: HatSelector,
    name: 'HatSelector',
    useAsDefault: true
  },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  {
    path: '/**',
    redirectTo: ['HatSelector']
  }
])
export class App{
  name = 'Hat Selector';
  constructor() {

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
