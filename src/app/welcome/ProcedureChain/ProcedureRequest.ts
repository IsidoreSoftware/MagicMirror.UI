type CallbackFunction = () => void;

export class ProcedureRequest {
    public finalAction: () => void;
    public progressChanged: (string, CallbackFunction) => void;
}