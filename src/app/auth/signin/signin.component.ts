import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequestService } from 'src/app/auth.request.service';
import { DialogService } from 'src/app/dialog.service';
import { PreloaderService } from 'src/app/preloader.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRequestService: AuthRequestService,
    private preloader: PreloaderService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  signin() {
    if(this.formGroup.valid) {
      this.preloader.$spin.next(true);
      this.authRequestService.executeService(this.formGroup.value, "POST", "signin").subscribe(
        result => {
          this.preloader.$spin.next(false);

          if(result.status !== "succces") {
            this.dialog.open({
              type: "error",
              title: "Erro",
              message: result.message
            });
          }else{
            
          }
        },
        error => {
          this.preloader.$spin.next(false);
          this.dialog.open({
            type: "error",
            title: "Erro",
            message: "Não foi possível realizar o login. Por favor, entre em contato com o administrador do sistema."
          });
        }
      );
    }
  }
}
