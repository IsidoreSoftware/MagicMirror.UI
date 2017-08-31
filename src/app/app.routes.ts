import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from 'app/desktop/desktop.component';
import { WelcomeComponent } from 'app/welcome/welcome.component';
import { CameraComponent } from 'app/camera/camera.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'desktop', component: DesktopComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'camera', component: CameraComponent },
    /*  { path: '**', component: PageNotFoundComponent }*/
];
