import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { AuthPaymentComponent } from './auth-payment/auth-payment.component';



@NgModule({
  declarations: [
    PaymentComponent,
    AuthPaymentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
