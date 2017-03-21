import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('isVisibleChanged', [
      state('true', style({ opacity: 1, display: 'block' })),
      state('false', style({ opacity: 0 })),
      transition('void => 1', animate('4s ease-in', keyframes([
        style({ opacity: 0 }),
        style({ opacity: 0 }),
        style({ opacity: 1 }),
      ]))),
      transition('1 => 0', animate('4s ease-out', keyframes([
        style({ opacity: 1 }),
        style({ opacity: 0 }),
        style({ opacity: 0 }),
      ])))
    ]),
    trigger('isWelcomeMessageShown', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('void => 1', animate('4s ease-in', keyframes([
        style({ opacity: 0, offset: 0 }),
        style({ opacity: 0, offset: 0.9 }),
        style({ opacity: 1, offset: 1 }),
      ])))
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
