import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestService } from 'src/app/auth.request.service';
import { DialogService } from 'src/app/dialog.service';
import { PreloaderService } from 'src/app/preloader.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authRequestService: AuthRequestService,
    private preloader: PreloaderService,
    private dialog: DialogService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  signin() {
    if(this.formGroup.valid) {
      this.preloader.$spin.next(true);
      this.authRequestService.executeService(this.formGroup.value, "POST", "signin").subscribe(
        result => {
          this.preloader.$spin.next(false);

          if(result.status !== "success") {
            this.dialog.open({
              type: "error",
              title: "Erro",
              message: result.message
            });
          }else{
            this.setToken(result.results);
            this.getLoggedInName.emit(true);
            this.router.navigate(['/']);
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

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
    
  deleteToken() {
    localStorage.removeItem('token');
  }
  
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
