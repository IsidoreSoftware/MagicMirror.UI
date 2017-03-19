import { Component, ViewChild } from '@angular/core';
import { WelcomeComponent } from "app/welcome/welcome.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  a:string="";

  @ViewChild('welcome')
  public welcome : WelcomeComponent;

  clicked(){
    console.log("Logged in");
  }

  c(){
    this.a = 'Kuba';
    this.welcome.login();
  }
}
