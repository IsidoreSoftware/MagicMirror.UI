import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animations } from "./welcome.animations";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: animations
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
