import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestService } from 'src/app/services/auth.request.service';
import { DialogService } from 'src/app/services/dialog.service';
import { PreloaderService } from 'src/app/services/preloader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRequestService: AuthRequestService,
    private preloader: PreloaderService,
    private dialog: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = this.fb.group({
    fullname: ['', [Validators.required]],
    cpf_cnpj: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signup() {
    if(this.formGroup.valid) {
      this.preloader.$spin.next(true);
      this.authRequestService.executeService(this.formGroup.value, "POST", "signup", "register").subscribe(
        result => {
          this.preloader.$spin.next(false);

          if(result.status !== "success") {
            this.dialog.open({
              type: "error",
              title: "Erro",
              message: result.message
            });
          }else{
            this.router.navigate(['/']);
          }
        },
        error => {
          this.preloader.$spin.next(false);
          this.dialog.open({
            type: "error",
            title: "Erro",
            message: "Não foi possível finalizar o cadastro. Por favor, verifique os dados informados e tente novamente."
          });
        }
      );
    }
  }
}
