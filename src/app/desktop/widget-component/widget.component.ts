import { CommonModule } from "@angular/common";
import {
  Component,
  AfterViewInit,
  Input,
  Compiler,
  NgModule,
  ViewChild,
  Injector,
  NgModuleRef,
  ViewContainerRef,
} from "@angular/core";
import { WidgetContext } from "../models/widget-context";
import { WidgetDirective } from "./widget.directive";

@Component({
  selector: "widget",
  template: `<ng-template #vc></ng-template>
    <h2 *ngIf="error">
      {{ error }}
    </h2> `,
})
export class WidgetComponent implements AfterViewInit {
  @Input()
  template: string = "";

  @Input()
  stylesFile: string = "";

  error: string;

  @ViewChild("vc", { read: ViewContainerRef }) vc: ViewContainerRef;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>
  ) {}

  ngAfterViewInit() {
    this.createNewComponent(this.template, this.stylesFile);
  }

  protected createNewComponent(templateCnt: string, styles: string) {
    console.log(templateCnt);
    const tmpCmp = Component({ template: templateCnt, styles: [styles] })(
      class {
        context = new WidgetContext()
      }
    );
    const tmpModule = NgModule({
      declarations: [tmpCmp],
      imports: [CommonModule],
    })(class {});

    try {
      this._compiler
        .compileModuleAndAllComponentsAsync(tmpModule)
        .then((factories) => {
          const f = factories.componentFactories[0];
          const cmpRef = f.create(this._injector, [], null, this._m);
          cmpRef.instance.name = "dynamic";
          this.vc.insert(cmpRef.hostView);
        })
        .catch(this.handleError);
    } catch (err) {
      this.handleError(err);
    }
  }

  private handleError(err) {
    console.log(err);
    this.error = err;
  }
}
