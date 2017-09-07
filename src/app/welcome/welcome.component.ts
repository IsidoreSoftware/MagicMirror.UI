import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { animations } from './welcome.animations';
import { Router } from '@angular/router';
import { ProcedureRequest } from 'app/welcome/ProcedureChain/ProcedureRequest';
import { Procedure } from 'app/welcome/ProcedureChain/Procedure';
import { FirstScreen } from 'app/welcome/ProcedureChain/ConcreteSequence/FirstScreen';
import { WelcomeUser } from 'app/welcome/ProcedureChain/ConcreteSequence/WelcomeUser';
import { User } from 'app/welcome/models/user';
import { Greatings } from 'app/welcome/ProcedureChain/ConcreteSequence/Greatings';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: animations
})
export class WelcomeComponent implements OnInit {
  private user: Observable<User>;
  private procedureChain: Procedure;
  private procedureRequest: ProcedureRequest;
  private currentView: string;
  private isVisible = true;

  @Output('onLogin')
  public onLogin: EventEmitter<User> = new EventEmitter();

  ngOnInit(): void {
    this.procedureChain.processRequest(this.procedureRequest);
  }

  constructor(private router: Router) {
    this.procedureRequest = new ProcedureRequest();
    this.procedureRequest.finalAction = () => {
      this.isVisible = false;
      setTimeout(() => {
        router.navigateByUrl('/desktop');
      }, 2000);
    };

    this.procedureRequest.progressChanged = (info: string, callback: () => void) => {
      this.isVisible = false;
      setTimeout(() => {
        this.currentView = info;
        this.isVisible = true;
        setTimeout(callback,
          5000);
      }, 1500);
    };

    this.user = this.onLogin.asObservable();

    this.procedureChain = new FirstScreen();
    this.procedureChain
          .setSuccessor(new WelcomeUser(this.user))
          .setSuccessor(new Greatings());
    this.procedureChain.processRequest(this.procedureRequest);
  }

  public login() {
    const u = { Name: 'Kuba' };
    this.onLogin.emit(u);
  }
}
