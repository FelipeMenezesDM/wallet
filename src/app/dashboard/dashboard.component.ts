import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private helper: UserService
  ) {
    if(!this.helper.isLoggedIn()) {
      this.router.navigate(['/user']);
    }

    this.user = this.helper.getInfo();
  }

  ngOnInit() {
  }

  btnClick() {
    this.router.navigateByUrl('/pay');
  };
}
