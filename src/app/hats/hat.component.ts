/**
 * Created by nijk on 17/03/2016.
 */

import { Component, Input } from 'angular2/core';

// Interfaces
import { IHat } from './hat.interface';

// Components
import { SvgComponent } from '../svg/svg.component';

@Component({
    selector: 'hat',
    directives: [ SvgComponent ],
    template: require('./hat.component.html'),
    styles: [ require('./hat.component.scss') ]
})
export class Hat {
    constructor () {

    }

    @Input() hat : IHat;

    @Input() day : number;
}
