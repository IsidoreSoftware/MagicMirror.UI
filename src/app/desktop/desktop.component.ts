import { Component, OnInit } from '@angular/core';
import { WidgetService } from 'app/desktop/services/widget.service';
import { Observable } from 'rxjs/Rx';
import { Widget } from 'app/desktop/models/widget';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  public widgets: Observable<Widget[]>;

  constructor(private _widgetService: WidgetService) {
  }

  ngOnInit() {
    this.widgets = this._widgetService.getAllMyWidgets();
  }
}
