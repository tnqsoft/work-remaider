import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tnqsoft-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit {

  private model: any = {};
  private loading: boolean = false;
  private error: string = '';

  constructor() { }

  ngOnInit() {
  }

  changePassword() {
    this.loading = true;
    // this.authenticationService.login(this.model.username, this.model.password, this.model.remember)
    //   .subscribe(result => {
    //     this.loading = false;
    //     this.router.navigate(['/dashboard']);
    //   }, err => {
    //     let error = err.json();
    //     this.error = error.message;
    //     this.loading = false;
    //   });
  }
}
