import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ChangepassComponent } from './changepass.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AlertModule
  ],
  declarations: [ChangepassComponent],
  exports: [ChangepassComponent]
})

export class ChangepassModule { }
