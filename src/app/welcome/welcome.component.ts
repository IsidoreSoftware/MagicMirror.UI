import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animations } from "./welcome.animations";
import { Router } from "@angular/router";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: animations
})
export class WelcomeComponent {

  constructor(private router: Router) {

  }

  private user: string;

  @Output("login")
  public loginPerformed: EventEmitter<any> = new EventEmitter()

  locked: boolean = false;

  welcomeMessage: string = "The day is beatiful, isn't it?";

  private userWelcomed($event: any) {
    if (!parseInt($event.toState))
      return;

    this.loginPerformed.emit(this.user);
    this.router.navigateByUrl('/desktop');
  }

  public login() {
    this.locked = !this.locked;
    this.user = "Kuba"
  }
}
