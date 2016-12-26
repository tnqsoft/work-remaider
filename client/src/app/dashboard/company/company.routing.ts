import { Route } from '@angular/router';
import { AuthGuard } from '../../shared';
import { CompanyComponent } from './company.component';

// Route Configuration
export const CompanyRoutes: Route[] = [
  { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
];
