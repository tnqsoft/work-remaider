import { Routes } from '@angular/router';

import { LoginRoutes, LoginComponent } from './login';
import { DashboardRoutes } from './dashboard';

// Route Configuration
export const routes: Routes = [
  ...DashboardRoutes,
  ...LoginRoutes,
  { path: '**', component: LoginComponent }
];
