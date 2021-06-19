import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AuthRequestService } from '../auth.request.service';
import { PreloaderService } from '../preloader.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authRequestService: AuthRequestService,
    private preloader: PreloaderService,
    private dialog: DialogService,
  ) { }

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }
}
