import { Route } from '@angular/router';
import { AuthGuard } from '../../shared';
import { ChangepassComponent } from './changepass.component';

// Route Configuration
export const ChangepassRoutes: Route[] = [
  { path: 'change_password', component: ChangepassComponent, canActivate: [AuthGuard] },
];
