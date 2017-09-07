import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DesktopComponent } from './desktop/desktop.component';
import { appRoutes } from 'app/app.routes';
import { RouterModule } from '@angular/router';
import { WidgetService } from 'app/desktop/services/widget.service';
import { WidgetComponent } from 'app/desktop/widget-component/widget.component';
import { CameraModule } from 'app/camera/camera.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DesktopComponent,
    WidgetComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CameraModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
