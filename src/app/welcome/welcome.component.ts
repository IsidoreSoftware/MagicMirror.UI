import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  @Input('user')
  public user:string;

  @Output("login")
  public loginPerformed: EventEmitter<any> = new EventEmitter()
  
  welcomeMessage:string = "The day is beatiful, isn't it?";

  login(){
    console.log(this.user);
    this.loginPerformed.emit('val');
  }
}
