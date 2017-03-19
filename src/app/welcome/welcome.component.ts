import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('lockState', [
      state('true', style({
        visibility: 'hidden',
        opacity: '0',
        display: 'none'
      })),
      state('false', style({
        visibility: 'visible',
        opacity: '1',
        display: 'block'
      })),
      transition('1 => 0', animate('5s')),
      transition('0 => *', animate('26s'))
    ])
  ]
})
export class WelcomeComponent {

  @Input('user')
  public user: string;

  @Output("login")
  public loginPerformed: EventEmitter<any> = new EventEmitter()

  locked: boolean = false;

  welcomeMessage: string = "The day is beatiful, isn't it?";

  public login() {
    this.locked = !this.locked;
    console.log("TEST")
  }
}
