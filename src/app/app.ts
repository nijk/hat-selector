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
  styles: [ require('../assets/css/bootstrap.min.css') ],
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
