import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { WidgetService } from "app/desktop/services/widget.service";
import { Observable } from "rxjs/Rx";
import { Widget } from "app/desktop/models/widget";

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnChanges {
  
  @ViewChild('dynamicChild', {read: ViewContainerRef})
  private target: ViewContainerRef;
 
  constructor(private builder: DynamicBuilder, private componentResolver: ComponentFactoryResolver) {};


  @Input()
  public template: string
}
