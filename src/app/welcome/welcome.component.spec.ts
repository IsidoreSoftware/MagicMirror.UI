import { TestBed, async } from '@angular/core/testing';
import { DesktopComponent } from 'app/desktop/desktop.component';
import { WelcomeComponent } from 'app/welcome/welcome.component';
import { WidgetComponent } from 'app/desktop/widget-component/widget.component';
import { CameraModule } from 'app/camera/camera.module';
import { appRoutes } from 'app/app.routes';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { WidgetService } from 'app/desktop/services/widget.service';

describe('WelcomeComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WelcomeComponent,
                DesktopComponent,
                WidgetComponent
            ],
            imports: [
                RouterModule.forRoot(appRoutes),
                CameraModule,
                BrowserModule,
                BrowserAnimationsModule,
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        const welcomeComponent = fixture.debugElement.componentInstance;
        expect(welcomeComponent).toBeTruthy();
    });

    it('should show set message in 6,5 seconds', fakeAsync(() => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        const welcomeElement = fixture.debugElement.componentInstance;
        tick(6501);
        expect(welcomeElement.currentView).toEqual('Hello!');
    }));

    it('should show welcome message in 6,5 seconds', fakeAsync((done) => {
        const fixture = TestBed.createComponent(WelcomeComponent);
        tick(1500);
        fixture.detectChanges();
        tick(6501);
        const welcomeElement = fixture.debugElement.nativeElement;
        expect(welcomeElement.querySelector('#message-text').textContent).toContain('Hello!');
    }));
});
