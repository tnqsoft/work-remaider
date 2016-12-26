import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertModule, DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HomeModule } from './home';
import { ChangepassModule } from './changepass';
import { CompanyModule } from './company/company.module';
import { DashboardComponent } from './dashboard.component';
import { NavComponent } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    DropdownModule,
    ModalModule,
    HomeModule,
    ChangepassModule,
    CompanyModule
  ],
  declarations: [
    DashboardComponent,
    NavComponent
  ],
  exports: [
    DashboardComponent,
    NavComponent
    ]
})

export class DashboardModule { }
