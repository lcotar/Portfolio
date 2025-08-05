import { Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' },
];
