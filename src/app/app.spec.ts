import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import { App } from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App
  ]);

  it('should have a name', inject([ App ], (app) => {
    expect(app.name).toEqual('Hat Selector');
  }));

});
