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

    }

    private _hats: IHatSelector;

    /**
     *
     * @returns {{days: number, hats: Array, styles: Array}}
     */
    public resetHats() {
        return this._hats = { days: 0, hats: [], styles: [] };
    }

    /**
     * Get hats for the given a number of days
     * @param days
     * @returns { Observable | ErrorObservable }
     */
    public getHats(days: number) : Observable<any> {
        // Reset old data
        this.resetHats();

        if (days < MIN_DAYS) {
            return Observable.throw(new Error(`Number of days must be at least ${MIN_DAYS}`));
        }
        if (days > MAX_DAYS) {
            return Observable.throw(new Error(`Number of days must be no more than ${MAX_DAYS}`));
        }

        this._hats.days = days;

        return Observable.create(observer => this._fetchData().subscribe(
            data => this._filterHats(data).subscribe(
                () => observer.next(this._hats),
                e => observer.error(e)
            ),
            e => {
                console.warn('getHats', e);
                return e;
            }
        ));
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    private _shuffleArray(array: Array<any>) : any {
        for (var i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * Fetch the raw hat data from the resource
     * @returns { Observable<R> }
     * @private
     */
    private _fetchData() : Observable<any> {
        return this._http.get('/app/hats/hat-data.json')
            .map(res => res.json())
            // _shuffleArray is used here to provide a more interesting results sets if data is re-fetched
            .map(data => this._shuffleArray(data.items))
            .catch(e => this._handleError(e));
    }

    /**
     * Filter the hats so that only one style is provided from a given number of days
     * @param hats
     * @returns { Observable<any> }
     * @private
     */
    private _filterHats(hats: IHat[]) : Observable<any> {
        // @fixme: The typescript definition does not match with the Rx documentation here,
        // so the apparently optional 2nd argument is required to stop the TS linter from complaining
        return Observable.create(observer => Observable.from(hats, item => item).subscribe(
            (hat: IHat) => {
                // Ensure the hat.style is not already in use
                // Ensure the required number of hats is not exceeded
                if (this._hats.styles.indexOf(hat.style) >= 0 || this._hats.days === this._hats.styles.length) {
                    return;
                }

                this._hats.styles.push(hat.style);
                this._hats.hats.push(hat);
            },
            e => observer.error(e),
            () => observer.next()
        ));
    }

    /**
     * Error handler
     * @param error
     * @returns { ErrorObservable }
     * @private
     */
    private _handleError (error: Response) {
        //console.warn('handlerError', error, typeof error);

        let errorMessage = error.text() || 'Server error';

        console.error(errorMessage);
        return Observable.throw(new Error(errorMessage));
    }
}