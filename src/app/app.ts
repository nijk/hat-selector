/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteConfig, Router } from 'angular2/router';

import { HatSelector } from './hats/hat-selector.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
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
    path: '/',
    component: HatSelector,
    name: 'HatSelector',
    useAsDefault: true
  }
])
export class App {
  name = 'Hat Selector';
  constructor() {

  }
}
