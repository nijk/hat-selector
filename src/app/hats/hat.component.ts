/**
 * Created by nijk on 17/03/2016.
 */

import { Component, Input } from 'angular2/core';

@Component({
    selector: 'hat',
    template: require('./hat.component.html'),
    styles: [ require('./hat.component.css') ]
})
export class Hat {
    constructor (){

    }

    @Input() hat;
}