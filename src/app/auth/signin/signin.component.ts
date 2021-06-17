import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequestService } from 'src/app/auth.request.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private authRequestService:AuthRequestService
  ) { }

  ngOnInit(): void {
  }

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  signin() {
    if(this.formGroup.valid) {
      this.authRequestService.execute(this.formGroup.value, "POST", "signin").subscribe(result => {
        if(result.status === "success") {

        }else{
          
        }
      });
    }
  }
}
