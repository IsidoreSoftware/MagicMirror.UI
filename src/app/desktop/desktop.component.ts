import { Component, OnInit } from '@angular/core';
import { WidgetService } from "app/desktop/services/widget.service";
import { Observable } from "rxjs/Rx";
import { Widget } from "app/desktop/models/widget";

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  constructor(private _widgetService: WidgetService) {
  }

  public widgets: Observable<Widget[]>

  ngOnInit() {
    this.widgets = this._widgetService.getAllMyWidgets();
  }
}
