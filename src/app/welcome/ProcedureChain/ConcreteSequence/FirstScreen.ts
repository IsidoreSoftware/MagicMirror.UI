import { Procedure } from "app/welcome/ProcedureChain/Procedure";
import { ProcedureRequest } from "app/welcome/ProcedureChain/ProcedureRequest";

export class FirstScreen extends Procedure {

    canProceed(): boolean {
        return true;
    }

    handleError(): void {
        console.log("Can't show the first screen.")
    }

    processRequest(request: ProcedureRequest) {
        request.progressChanged("Hello!", () => {
            super.processRequest(request);
        });
    }
}