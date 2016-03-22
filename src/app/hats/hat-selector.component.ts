import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

// Services
import { MessagesService } from "../messages/messages.service";
import { HatSelectorService } from './hats.service';

// Interfaces
import { IHatSelector } from './hat-selector.interface';

// Components
import { Messages } from '../messages/messages.component';
import { Hat } from './hat.component';

@Component({
  selector: 'hat-selector',
  providers: [ HatSelectorService ],
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, Messages, Hat ],
  pipes: [ ],
  styles: [ require('./hat-selector.component.scss') ],
  template: require('./hat-selector.component.html')
})
export class HatSelector implements OnInit {
  constructor(private _messagesService: MessagesService,
              private _hatSelectorService: HatSelectorService) {

  }

  public model : IHatSelector;

  public hasHats() {
    return this.model.hats.length > 0;
  }

  public reset() {
    event.preventDefault();
    this._messagesService.clearMessages();

    this.model = this._hatSelectorService.resetHats();
  }

  public submit() {
    this._messagesService.clearMessages();

    this._hatSelectorService.getHats(this.model.days).subscribe(
        data => {
          this.model = data;
          this._messagesService.addMessage(`Hats for your ${this.model.days} day trip are displayed below`, 'success', true);
        },
        e => this._messagesService.addMessage(<string> e, 'danger', false)
    );
  }

  ngOnInit() {
    if (!this.model) {
      this.model = this._hatSelectorService.resetHats();
    }
  }
}
