import { Observable } from 'rxjs/Rx';
import {
    it,
    inject,
    injectAsync,
    beforeEach,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import { HatSelectorService } from './hats.service';

// Mock Http responses
import { ResponseOptions } from 'angular2/src/http/base_response_options';
import { Response } from 'angular2/src/http/static_response';

import { HTTP_PROVIDERS } from 'angular2/http';

class Http {
    get() {
        return Observable.from([
            new Response(new ResponseOptions({ items: [{ style: 'foo', colour: 'bar', imgName: 'foo' }] }))
        ], () => {});
    }
}

let service: HatSelectorService;

describe('Hat Selector Service', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        Http,
        HTTP_PROVIDERS
    ]);

    beforeEach(
        inject([Http], (_http) => {
            service = new HatSelectorService(_http);
        })
    );



    describe('resetHats', () => {
        it('should have a resetHats method', () => {
            expect(service.resetHats).toBeFunction();
        });

        it('should reset the stored hats', () => {
            service.getHats(1).subscribe(data => {
                //service.resetHats();
                expect(data.days).toEqual(0);
            });
        });
    });
});
