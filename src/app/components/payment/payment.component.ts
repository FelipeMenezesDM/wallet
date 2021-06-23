import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { PreloaderService } from 'src/app/services/preloader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service';
import { AuthPaymentComponent } from './auth-payment/auth-payment.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  title: string;
  name: string;
  saldoAtual: string = '-';
  userInfo: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    private preloader: PreloaderService,
    private authRequestService: AuthRequestService,
    private dialog: DialogService,
    private modal: ModalService,
    private user: UserService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.name = data.name;
    this.userInfo = this.user.getInfo();
    this.formGroup.get('payee')!.setValue(data.payeeid);
    this.formGroup.get('payer')?.setValue(this.userInfo.personid);

    this.authRequestService.get({
      fields: ["balance"],
      meta_query: JSON.stringify([{
        key: "walletPersonId",
        value: this.userInfo.personid
      }])
    }, "wallet").subscribe(result => {
      if(result.status === "success") {
        this.saldoAtual = parseFloat(result.results[0].balance).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
      }
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if(!res)
        return;

      this.authRequestService.executeService(this.formGroup.value, "POST", "payment", "validatePayment").subscribe(result => {
        let title = "Erro";

        if( result.status === "success" ) {
          title = "Pagamento realizado";
        }

        this.dialog.open({
          title: title,
          message: result.message
        });

        this.preloader.$spin.next(false);
      }, error => {
        this.preloader.$spin.next(false);
        this.dialog.open({
          title: "Erro",
          message: "Não foi possível finalizar a transação por conta de uma falha no sistema."
        });
      });
    });
  }

  ngOnInit(): void {
  }

  formGroup: FormGroup = this.fb.group({
    value: ['', [Validators.required, Validators.min(0.01)]],
    payee: [''],
    payer: ['']
  });

  confirmPay() {
    if(this.formGroup.valid) {
      this.modal.open(AuthPaymentComponent, {
        width: "280px",
        email: this.userInfo.email,
        payDiag: this.dialogRef
      });
    }
  }
}
