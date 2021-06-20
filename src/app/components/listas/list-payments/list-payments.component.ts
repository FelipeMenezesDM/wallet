import { Component, OnInit } from '@angular/core';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css']
})
export class ListPaymentsComponent implements OnInit {
  data: any;
  currentUser: any;

  constructor(
    private authRequestService: AuthRequestService,
    private user: UserService
  ) {
    this.currentUser = this.user.getInfo();

    this.authRequestService.get({
      joins: JSON.stringify([{
        table: "person",
        meta_query: [{
          key: "payee",
          column: "person_id"
        }]
      }]),
      meta_query: JSON.stringify([{
        key: "payer",
        value: this.currentUser.person_id
      }, {
        key: "payee",
        value: this.currentUser.person_id,
        relation: "OR"
      }])
    }, "payment" ).subscribe(result => {
      if(result.status === "success") {
        this.data = result.results;
      }
    });
  }

  ngOnInit(): void {
  }

}
