import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class WeatherService {

    constructor(private _http: HttpClient) {
    }

    private key: string = '33e7f73a89ec847c9d432133612ef48b';
    private city: string = 'Torun,pl';

    public getCurrentWeather(): Observable<any> {
        return this._http.get<any>(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=` + this.city + `&appid=` + this.key);
    }
}