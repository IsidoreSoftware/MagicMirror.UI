import { Procedure } from 'app/welcome/ProcedureChain/Procedure';
import { ProcedureRequest } from 'app/welcome/ProcedureChain/ProcedureRequest';
import { Observable } from 'rxjs/Observable';

export class WelcomeUser extends Procedure {

    constructor(private userUpdate: Observable<any>) {
        super();
    }

    canProceed(): boolean {
        return true;
    }

    handleError(): void {
        throw new Error('Method not implemented.');
    }

    processRequest(request: ProcedureRequest) {
        this.userUpdate.subscribe((value) => {
            request.progressChanged(`Hi, ${value.Name}`,
                () => { super.processRequest(request); });
        });
    }
}
