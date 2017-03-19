import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0 })),
      transition('* => 1', animate('2s')),
      transition('1 => 0', animate('1s'))
    ])
  ],
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
