import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequestService } from 'src/app/auth.request.service';
import { PreloaderService } from 'src/app/preloader.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private authRequestService:AuthRequestService,
    private preloader: PreloaderService
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
      this.authRequestService.executeService(this.formGroup.value, "POST", "signin").subscribe(result => {
        this.preloader.$spin.next(false);
      });
    }
  }
}
