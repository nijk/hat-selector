/**
 * Created by nijk on 18/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Constants
const MIN_DAYS: number = 1;
const MAX_DAYS: number = 14;

@Injectable()
export class HatSelectorService {
    constructor(private _http: Http){
        console.log('HatSelectorService', MIN_DAYS, MAX_DAYS);
    }

    private _hatData: Object[] = [];

    
    public getHats(days: number) : any {
        if (days < MIN_DAYS) {
            return new Error(`Number of days must be at least ${MIN_DAYS}`);
        }
        if (days > MAX_DAYS) {
            return new Error(`Number of days must be no more than ${MAX_DAYS}`);
        }

        return this._fetchData().subscribe(
            data => {
                this._hatData = data;
                return this._filterHats(days);
            },
            e => this._handleError(e)
        );
    }

    private _fetchData() : any {
        return this._http.get('/app/hats/hat-data.json')
            .map(res => res.json())
            .map(data => data.items)
            .catch(e => this._handleError(e));
    }

    private _filterHats(number: number) : any {
        let res = {
            days: number,
            hats: this._hatData
        };

        let obs = Observable.create(this._hatData);

        obs.subscribe(
            item => console.log(item),
            () => {},
            e => console.warn(e)
        );


        console.info('_filterHats', res);
        return res;
    }

    /**
     * Error handler
     * @param error
     * @returns {ErrorObservable}
     * @private
     */
    private _handleError (error: Response) {
        const errorMessage = (error.json() ||  { message: 'Server error' }).message;

        console.error(errorMessage, error.json());
        return Observable.throw(new Error(errorMessage));
    }
}