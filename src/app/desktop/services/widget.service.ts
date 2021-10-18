import { HttpClient } from "@angular/common/http"
import { Widget } from "../models/widget";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class WidgetService {

    constructor(private _http: HttpClient) {
    }

    public getAllMyWidgets(): Observable<Widget[]> {
        return this._http.get<Widget[]>("http://localhost:58593/widgets/1");
    }
}