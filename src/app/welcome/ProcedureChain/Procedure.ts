import { ProcedureRequest } from './ProcedureRequest';

export abstract class Procedure {

    protected successor: Procedure;

    public setSuccessor(successor: Procedure): Procedure {
        this.successor = successor;
        return successor;
    }

    public processRequest(request: ProcedureRequest) {
        if (this.canProceed()) {
            if (this.successor) {
                this.successor.processRequest(request);
            } else {
                request.finalAction();
            }
        } else {
            this.handleError();
        }
    }

    abstract canProceed(): boolean;

    abstract handleError(): void;
}
