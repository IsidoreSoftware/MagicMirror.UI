import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DesktopComponent } from 'app/desktop/desktop.component';
import { WelcomeComponent } from 'app/welcome/welcome.component';
import { WidgetComponent } from 'app/desktop/widget-component/widget.component';
import { CameraModule } from 'app/camera/camera.module';
import { appRoutes } from 'app/app.routes';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { WidgetService } from 'app/desktop/services/widget.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AppComponent,
          WelcomeComponent,
          DesktopComponent,
          WidgetComponent
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        CameraModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
