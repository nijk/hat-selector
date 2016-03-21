import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

// Services
import { HatSelectorService } from './hats.service';

// Interfaces
import { IHatSelector } from './hat-selector.interface';

// Components
import { Hat } from './hat.component';

@Component({
  selector: 'hat-selector',
  providers: [ HatSelectorService ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, Hat ],
  pipes: [ ],
  styles: [ require('./hat-selector.component.css') ],
  template: require('./hat-selector.component.html')
})
export class HatSelector implements OnInit {
  constructor(private _hatSelectorService: HatSelectorService) {

  }

  public model : IHatSelector;

  public submit() {
    this._hatSelectorService.getHats(this.model.days).subscribe(
        data => this.model = data,
        (e) => console.warn('Error', e)
    );
  }

  ngOnInit() {
    if (!this.model) {
      this.model = this._hatSelectorService.resetHats();
    }
  }
}
