import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  btnClick() {
    this.router.navigateByUrl('/pay');
  };
}
