import { Procedure } from "app/welcome/ProcedureChain/Procedure";
import { ProcedureRequest } from "app/welcome/ProcedureChain/ProcedureRequest";
import { Observable } from "rxjs/Observable";

export class Greatings extends Procedure {
    canProceed(): boolean {
        return true;
    }

    handleError(): void {
        throw new Error('Method not implemented.');
    }

    processRequest(request: ProcedureRequest) {
        request.progressChanged(`<div class="submessage">Have a nice day dude!</div>`,
            () => { super.processRequest(request) });

    }
}