import { Procedure } from '../../../welcome/ProcedureChain/Procedure';
import { ProcedureRequest } from '../../../welcome/ProcedureChain/ProcedureRequest';
import { Observable } from 'rxjs';

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
                () => { super.processRequest(request) });
        });
    }
}