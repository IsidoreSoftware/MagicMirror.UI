import { Component, OnInit } from '@angular/core';
import { WidgetService } from "../../app/desktop/services/widget.service";
import { Observable, timer } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Widget } from "../../app/desktop/models/widget";
import { WeatherService } from './services/weather.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  constructor(private _widgetService: WidgetService, private _weatherService: WeatherService) {
  }

  public now: Date = new Date();
  public weather: Observable<any>;

  public widgets: Observable<Widget[]>;

  ngOnInit() {
    this.widgets = this._widgetService.getAllMyWidgets();
    this.weather = timer(0,60000).pipe(mergeMap(() => this._weatherService.getCurrentWeather()), map(res=>res?.main?.temp));

    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
}
