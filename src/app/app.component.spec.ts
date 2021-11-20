import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { DesktopComponent } from "./desktop/desktop.component";
import { WeatherService } from "./desktop/services/weather.service";
import { WidgetService } from "./desktop/services/widget.service";
import { WidgetComponent } from "./desktop/widget-component/widget.component";
import { WelcomeComponent } from "./welcome/welcome.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        WelcomeComponent,
        DesktopComponent,
        WidgetComponent,
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [WidgetService, WeatherService],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
