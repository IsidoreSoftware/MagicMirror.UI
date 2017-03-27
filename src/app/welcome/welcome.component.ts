import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animations } from "./welcome.animations";
import { Router } from "@angular/router";
import { ProcedureRequest } from "app/welcome/ProcedureChain/ProcedureRequest";
import { FirstScreen } from "app/welcome/ProcedureChain/ConcreteSequence/FirstScreen";
import { WelcomeUser } from "app/welcome/ProcedureChain/ConcreteSequence/WelcomeUser";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: animations
})
export class WelcomeComponent {

  constructor(private router: Router) {
    let request = new ProcedureRequest();
    request.finalAction = () => {
      this.isVisible = false;
      setTimeout(() => {
        router.navigateByUrl("/desktop");
      }, 3000);
    }
    this.currentView = "ASD"

    request.progressChanged = (info: string, callback: () => void) => {
      this.isVisible = false;
      setTimeout(() => {
        this.currentView = info;
        this.isVisible = true;
        setTimeout(callback,
          3000);
      }, 1500)
    }

    var procedureChain = new FirstScreen();
    procedureChain.setSuccessor(new WelcomeUser());

    procedureChain.processRequest(request);
  }

  private currentView: string;
  private isVisible: boolean = true;

  @Output("login")
  public loginPerformed: EventEmitter<any> = new EventEmitter()
}
