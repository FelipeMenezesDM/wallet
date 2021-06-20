import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestService } from '../services/auth.request.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  saldo: any;

  constructor(
    private router: Router,
    private helper: UserService,
    private authRequestService: AuthRequestService
  ) {
    if(!this.helper.isLoggedIn()) {
      this.router.navigate(['/user']);
    }

    this.user = this.helper.getInfo();

    this.authRequestService.get({
      fields: ["balance"],
      meta_query: JSON.stringify([{
        key: "wallet_person_id",
        value: this.user.person_id
      }])
    }, "wallet").subscribe(result => {
      if(result.status === "success") {
        this.saldo = result.results[0].balance;
      }
    });
  }

  ngOnInit() {
  }

  btnClick() {
    this.router.navigate(['/pay']);
  }

  logout() {
    this.helper.deleteToken();
    this.router.navigate(['/user']);
  }
}
