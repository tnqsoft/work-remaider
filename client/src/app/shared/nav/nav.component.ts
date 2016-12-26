import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services';

@Component({
  selector: 'tnqsoft-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
