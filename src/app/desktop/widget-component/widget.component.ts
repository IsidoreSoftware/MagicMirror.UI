import { Component, OnInit, Input, Compiler, NgModule, ViewChild } from '@angular/core';
import { WidgetDirective } from './widget.directive';

@Component({
    selector: 'widget',
    template: `<ng-template widgetHost></ng-template>`
})
export class WidgetComponent implements OnInit {

    @Input()
    template: string="";

    @Input()
    stylesFile: string = "";


    @ViewChild(WidgetDirective, {static: true}) widgetHost!: WidgetDirective;


    ngOnInit() {
        this.createNewComponent(this.template, this.stylesFile );
    }

    protected createNewComponent(templateCnt: string, styles: string) {
        const viewContainerRef = this.widgetHost.viewContainerRef;
        const componentRef = viewContainerRef.createEmbeddedView<Component>( null);
        componentRef.context.styles = [styles];
        componentRef.context.template = templateCnt;
        componentRef.reattach();
    }
}