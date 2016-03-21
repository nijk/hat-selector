/**
 * Created by nijk on 18/03/2016.
 */

import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

// Interfaces
import { IHat } from './hat.interface';
import { IHatSelector } from "./hat-selector.interface";

// Constants
const MIN_DAYS: number = 1;
const MAX_DAYS: number = 14;

@Injectable()
export class HatSelectorService {
    constructor(private _http: Http){
        console.log('HatSelectorService', MIN_DAYS, MAX_DAYS);
    }

    private _hatData: IHat[];

    
    public getHats(days: number) : any {
        if (days < MIN_DAYS) {
            return new Error(`Number of days must be at least ${MIN_DAYS}`);
        }
        if (days > MAX_DAYS) {
            return new Error(`Number of days must be no more than ${MAX_DAYS}`);
        }

        return this._fetchData().subscribe(
            data => this._filterHats(days),
            e => this._handleError(e)
        );
    }

    private _fetchData() : any {
        return this._http.get('/app/hats/hat-data.json')
            .map(res => res.json())
            .map(data => this._hatData = data.items)
            .catch(e => this._handleError(e));
    }

    private _filterHats(number: number) : any {
        let res: IHatSelector = {
            days: number,
            hats: [],
            styles: []
        };

        // @fixme: The typescript definition does not match with the Rx documentation here,
        // so the apparently optional 2nd argument is required to stop the TS linter from complaining
        return Observable.from(this._hatData, (item: IHat) => item).subscribe(
            (item: IHat) => {
                if (res.days === res.styles.length) {
                    return;
                }

                console.info('Hat data item', item);

                if (res.styles.indexOf(item.style) >= 0) {
                    console.info('This style is already selected', item.style);
                } else {
                    res.styles.push(item.style);
                    res.hats.push(item);
                }
            },
            e => this._handleError(e),
            () => console.log(res)
        );
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