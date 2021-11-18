import { Observable, interval } from "rxjs";

export class WidgetContext {
  private clock = interval(1000);

  constructor() {
    this.clock.subscribe((x) => {
      this.now = new Date();
    });
  }

  public now: Date;
}
