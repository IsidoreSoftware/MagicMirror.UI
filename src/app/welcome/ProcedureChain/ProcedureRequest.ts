export class ProcedureRequest {
    public finalAction: () => void;
    public progressChanged: (string: string, callback: () => void) => void;
}