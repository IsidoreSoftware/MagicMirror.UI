import { Component, OnInit, Input, NgModuleFactory, Compiler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, BehaviorSubject, Scheduler } from 'rxjs';
import { Timespan } from '../models/timespan';

@Component({
    selector: 'widget',
    template: `<ng-container *ngComponentOutlet="dynamicComponent;
                            ngModuleFactory: dynamicModule;"></ng-container>`
})
export class WidgetComponent implements OnInit {
    dynamicComponent;
    dynamicModule: NgModuleFactory<any>;

    @Input()
    template: string = "";

    @Input()
    stylesFile: string = "";

    @Input()
    refreshFrequency: any = {};

    public now = new Date();

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.dynamicComponent = this.createNewComponent(this.template, this.stylesFile, this.refreshFrequency);
        this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
    }

    protected createComponentModule(componentType: any) {
        @NgModule({
            imports: [
                CommonModule
            ],
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

    protected createNewComponent(template: string, styles: string, refreshInterval: Timespan) {
        @Component({
            selector: 'dynamic-component',
            template: template,
            styles: [styles]
        })
        class DynamicComponent implements OnInit {
            text: string;
            context: {
                now: number
            };

            ngOnInit() {
                Observable.timer(0, this.getMilliseconds(refreshInterval)).subscribe(() => this.context = this.getContext());
                this.text = template;
            }

            private getContext(): any {
                return {
                    now: new Date()
                }
            }



            private daysToMilliseconds(days: number): number {
                return this.hoursToMilliseconds(24 * days)
            }

            private hoursToMilliseconds(hours: number): number {
                return this.minutesToMilliseconds(60 * hours);
            }

            private minutesToMilliseconds(minutes: number): number {
                return this.secondsToMilliseconds(60 * minutes)
            }
            private secondsToMilliseconds(seconds: number): number {
                return seconds * 1000;
            }

            private getMilliseconds(timespan: Timespan): number {
                return this.daysToMilliseconds(timespan.days) +
                    this.hoursToMilliseconds(timespan.hours) +
                    this.minutesToMilliseconds(timespan.minutes) +
                    this.secondsToMilliseconds(timespan.seconds) +
                    timespan.milliseconds;
            }
        }

        return DynamicComponent;
    }
}