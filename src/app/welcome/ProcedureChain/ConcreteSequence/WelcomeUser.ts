import { Procedure } from "app/welcome/ProcedureChain/Procedure";
import { ProcedureRequest } from "app/welcome/ProcedureChain/ProcedureRequest";

export class WelcomeUser extends Procedure {
    canProceed(): boolean {
        return true;
    }

    handleError(): void {
        throw new Error('Method not implemented.');
    }

    processRequest(request: ProcedureRequest) {
        request.progressChanged("Show usser name.",
            () => { super.processRequest(request) });
    }
}