/**
 * Created by nijk on 18/03/2016.
 */

import { IHat } from './hat.interface';

export interface IHatSelector {
    days: number,
    hats: IHat[],
    styles: string[]
}