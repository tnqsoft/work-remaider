
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guard';
import { AuthenticationService, UserService } from './services';
import { JwtHelper } from './helper';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    JwtHelper
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
