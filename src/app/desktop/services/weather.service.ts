import { Http } from "@angular/http"
import { Widget } from "../models/widget";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx"
import { Injectable } from "@angular/core";

@Injectable()
export class WeatherService {

    constructor(private _http: Http) {
    }
    private key: string = '33e7f73a89ec847c9d432133612ef48b';
    private city: string = 'Torun,pl';

    public getCurrentWeather(): Observable<number> {
        return this._http.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=` + this.city + `&appid=` + this.key)
            .filter(response => response.ok)
            .map(response => response.json())
            .map(json => json.main.temp);
    }
}