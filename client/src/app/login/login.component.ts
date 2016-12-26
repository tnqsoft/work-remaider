import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared';

@Component({
  selector: 'tnqsoft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private model: any = {};
  private loading: boolean = false;
  private error: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password, this.model.remember)
      .subscribe(result => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, err => {
        let error = err.json();
        this.error = error.message;
        this.loading = false;
      });
  }
}
