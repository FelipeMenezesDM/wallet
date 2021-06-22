import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentComponent } from '../../payment/payment.component';

@Component({
  selector: 'app-list-payee',
  templateUrl: './list-payee.component.html',
  styleUrls: ['./list-payee.component.css']
})
export class ListPayeeComponent implements OnInit {
  data: any;
  isLoading: boolean = true;

  constructor(
    private authRequestService: AuthRequestService,
    private modalService: ModalService,
    private router: Router,
    private user: UserService
  ) {
    if(!this.user.isLoggedIn()) {
      this.router.navigate(['/user']);
    }

    this.authRequestService.executeService({}, "POST", "payee", "getPayees").subscribe(result => {
      this.isLoading = false;
      if(result.status === "success") {
        this.data = result.results;
      }
    });
  }

  ngOnInit(): void {
  }

  pay( personid, fullname ) {
    this.modalService.open(PaymentComponent, {title: `Novo pagamento para ${fullname}`, payeeid: personid});
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }
}
