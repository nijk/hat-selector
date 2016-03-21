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

  public model : IHatSelector = {
    days: 0,
    hats: [],
    styles: []
  };

  public submit() {

    this.model.days = <number> this.model.days;

    this._hatSelectorService.getHats(this.model.days);

    console.log('Form was submitted with value', this.model);
  }

  hatData = {
    "items": [
      {
        "style": "baseball cap",
        "colour": "red",
        "imgName": "red-baseball-cap.png"
      },
      {
        "style": "trilby",
        "colour": "black",
        "imgName": "black-trilby.png"
      },
      {
        "style": "beanie",
        "colour": "blue",
        "imgName": "blue-beanie.png"
      },
      {
        "style": "bowler hat",
        "colour": "black",
        "imgName": "black-bowler-hat.png"
      },
      {
        "style": "sombrero",
        "colour": "yellow",
        "imgName": "yellow-sombrero.png"
      },
      {
        "style": "beret",
        "colour": "red",
        "imgName": "red-beret.png"
      },
      {
        "style": "boater hat",
        "colour": "yellow",
        "imgName": "yellow-boater-hat.png"
      },
      {
        "style": "flat cap",
        "colour": "brown",
        "imgName": "brown-flat-cap.png"
      },
      {
        "style": "deerstalker",
        "colour": "grey",
        "imgName": "grey-deerstalker.png"
      },
      {
        "style": "cowboy hat",
        "colour": "brown",
        "imgName": "brown-cowboy-hat.png"
      },
      {
        "style": "fedora",
        "colour": "grey",
        "imgName": "grey-fedora.png"
      },
      {
        "style": "top hat",
        "colour": "blue",
        "imgName": "blue-top-hat.png"
      },
      {
        "style": "army cap",
        "colour": "green",
        "imgName": "green-army-cap.png"
      },
      {
        "style": "plumbers cap",
        "colour": "green",
        "imgName": "green-plumbers-cap.png"
      }
    ]
  };

  ngOnInit() {
  }
}
