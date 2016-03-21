// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import 'angular2/platform/browser';
import 'angular2/core';
import 'angular2/http';
import 'angular2/router';

// RxJS
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/observable/throw');
require('rxjs/add/observable/from');

if ('production' === ENV) {
  // Production


} else {
  // Development

}

