import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routing';

import { LoginModule } from './login';
import { DashboardModule } from './dashboard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginModule,
    DashboardModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
