import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widgetHost]',
})
export class WidgetDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
