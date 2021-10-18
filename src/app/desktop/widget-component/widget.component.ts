import { Component, OnInit, Input, NgModuleFactory, Compiler, NgModule } from '@angular/core';

@Component({
    selector: 'widget',
    template: `<ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`
})
export class WidgetComponent implements OnInit {
    dynamicComponent;
    dynamicModule: NgModuleFactory<any>;

    @Input()
    template: string="";

    @Input()
    stylesFile: string = "";

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.dynamicComponent = this.createNewComponent(this.template, this.stylesFile  );
        this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
    }

    protected createComponentModule(componentType: any) {
        @NgModule({
            imports: [],
            declarations: [
                componentType
            ],
            entryComponents: [componentType]
        })
        class RuntimeComponentModule {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }

    protected createNewComponent(templateCnt: string, styles: string) {
        @Component({
            selector: 'dynamic-component',
            template: templateCnt,
            styles: [styles]
        })
        class DynamicComponent implements OnInit {
            text: any;

            ngOnInit() {
                this.text = templateCnt;
            }
        }
        return DynamicComponent;
    }
}