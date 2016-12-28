import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ChangepassComponent } from './changepass.component';


@NgModule({
  imports: [
    SharedModule.forRoot(),
  ],
  declarations: [ChangepassComponent],
  exports: [ChangepassComponent]
})

export class ChangepassModule { }
