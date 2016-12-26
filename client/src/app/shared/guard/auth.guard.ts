import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services';
import { JwtHelper } from '../helper';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelper,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    let token = this.authenticationService.token;
    // let test = this.jwtHelper.decodeToken(token);
    // console.log(test);
    if (token && this.jwtHelper.isTokenExpired(token) === false) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
