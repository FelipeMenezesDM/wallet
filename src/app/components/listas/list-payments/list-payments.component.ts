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
      fields: "payee, payer, value, PAYEE.fullname AS payeeName, PAYER.fullname AS payerName, paymentcreation",
      order_by: "paymentcreation DESC",
      joins: JSON.stringify([{
        table: {name: "person", alias: "PAYEE"},
        meta_query: [{
          key: "PAYEE.personId",
          column: "payee"
        }]
      }, {
        table: {name: "person", alias: "PAYER"},
        meta_query: [{
          key: "PAYER.personId",
          column: "payer"
        }]
      }]),
      meta_query: JSON.stringify([{
        key: "payer",
        value: this.currentUser.personid
      }, {
        key: "payee",
        value: this.currentUser.personid,
        relation: "OR"
      }])
    }, "payment" ).subscribe(result => {
      if(result.status === "success") {
        this.data = result.results;
      }
    });
  }

  getName( currentId, id, name ) {
    return ( currentId === id ? "Você" : name );
  }

  ngOnInit(): void {
  }

}
