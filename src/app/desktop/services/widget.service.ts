import { Http } from '@angular/http';
import { Widget } from '../models/widget';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class WidgetService {

    constructor(private _http: Http) {
    }

    public getAllMyWidgets(): Observable<Widget[]> {
        return this._http.get('http://localhost:7011/widgets/1')
            .filter(response => response.ok)
            .map(response => response.json())
            .map(json => <Widget[]>json);
    }
}
