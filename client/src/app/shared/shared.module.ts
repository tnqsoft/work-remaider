
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guard';
import { AuthenticationService, UserService } from './services';
import { JwtHelper } from './helper';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [],
  exports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule,
    FormsModule,
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
