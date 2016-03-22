import { Component, Input, OnInit } from 'angular2/core';
import { Http, Response } from 'angular2/http';

@Component({
    selector: 'svg-comp',
    template: `<div [innerHTML]="iconData"></div>`
})
export class SvgComponent implements OnInit {
    @Input() src : string;

    private iconData : string = '';

    constructor(private _http: Http) {
    }

    ngOnInit() {
        this.loadSvg();
    }

    loadSvg() {
        this._http.get( this.src )
            .map( (res: Response) => res.text() )
            .subscribe(
                data => this.iconData = data,
                err => console.error(err)
            );
    }
}
