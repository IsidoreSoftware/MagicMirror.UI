import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { animations } from './welcome.animations';
import { Router } from '@angular/router';
import { ProcedureRequest } from '../../app/welcome/ProcedureChain/ProcedureRequest';
import { FirstScreen } from '../../app/welcome/ProcedureChain/ConcreteSequence/FirstScreen';
import { WelcomeUser } from '../../app/welcome/ProcedureChain/ConcreteSequence/WelcomeUser';
import { User } from '../../app/welcome/models/user';
import { Greatings } from '../../app/welcome/ProcedureChain/ConcreteSequence/Greatings';
import { Observable } from 'rxjs';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: animations
})
export class WelcomeComponent implements OnInit {

  private user: Observable<User>;
  public currentView: string;
  public isVisible = true;

  constructor(private router: Router) {
    let request = new ProcedureRequest();
    request.finalAction = () => {
      this.isVisible = false;
      setTimeout(() => {
        router.navigateByUrl('/desktop');
      }, 2000);
    }

    request.progressChanged = (info: string, callback: () => void) => {
      this.isVisible = false;
      setTimeout(() => {
        this.currentView = info;
        this.isVisible = true;
        setTimeout(callback,
          5000);
      }, 1500)
    }
    this.user = this.loginPerformed.asObservable()

    let procedureChain = new FirstScreen();
    procedureChain
      .setSuccessor(new WelcomeUser(this.user))
      .setSuccessor(new Greatings());
    procedureChain.processRequest(request);

    this.login();
  }

  ngOnInit(): void {

    //we're duing automatic login now... At some point get face and login then.
    let self = this;
    setTimeout(() => self.login(), 8000);
  }



  public login() {
    const u = { Name: 'Kuba' };
    this.loginPerformed.emit(u);
  }

  @Output('login')
  public loginPerformed: EventEmitter<User> = new EventEmitter();
}
