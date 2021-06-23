import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { DialogService } from 'src/app/services/dialog.service';
import { PreloaderService } from 'src/app/services/preloader.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-auth-payment',
  templateUrl: './auth-payment.component.html',
  styleUrls: ['./auth-payment.component.css']
})
export class AuthPaymentComponent implements OnInit {
  payDiag: any;

  constructor(
    private fbSignin: FormBuilder,
    private user: UserService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private preloader: PreloaderService,
    private authRequestService: AuthRequestService,
    private dialog: DialogService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.payDiag = data.payDiag;
    this.formSigninGroup.get('email')!.setValue(data.email);
  }

  ngOnInit(): void {
  }

  formSigninGroup: FormGroup = this.fbSignin.group({
    email: [''],
    password: ['', [Validators.required]]
  });

  validate() {
    if(this.formSigninGroup.valid) {
      this.dialogRef.close();
      this.preloader.$spin.next(true);
      this.authRequestService.executeService(this.formSigninGroup.value, "POST", "signin", "checkLogin").subscribe((result) => {
        if(result.status !== "success") {
          this.preloader.$spin.next(false);
          this.dialog.open({
            title: "Erro",
            message: "A senha digitada é inválida."
          });
        }else{
          this.payDiag.close(true);
        }
      });
    }
  }
}
