import { Routes } from '@angular/router';
import { DesktopComponent } from "../app/desktop/desktop.component";
import { WelcomeComponent } from '../app/welcome/welcome.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'desktop', component: DesktopComponent },
    { path: 'welcome', component: WelcomeComponent },
    /*  { path: '**', component: PageNotFoundComponent }*/
];
