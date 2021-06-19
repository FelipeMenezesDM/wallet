import { Component, OnInit } from '@angular/core';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { ModalService } from 'src/app/services/modal.service';
import { PaymentComponent } from '../../payment/payment.component';

@Component({
  selector: 'app-list-payee',
  templateUrl: './list-payee.component.html',
  styleUrls: ['./list-payee.component.css']
})
export class ListPayeeComponent implements OnInit {
  data = [{person_id: null, fullname: null}];

  constructor(
    private authRequestService: AuthRequestService,
    private modalService: ModalService
  ) { 
    this.authRequestService.executeService({}, "POST", "payee").subscribe(result => {
      if(result.status === "success") {
        this.data = result.results;
      }
    });
  }

  ngOnInit(): void {
  }

  pay( person_id, fullname ) {
    this.modalService.open(PaymentComponent, {title: `Novo pagamento para ${fullname}`});
  }
}
