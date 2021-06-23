import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
  }

  ngOnInit(): void {

  }

  close(value) {
    this.dialogRef.close(value);
  }

  public cancel() : void {
    this.close(false);
  }

  public confirm() : void {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() : void {
    console.log("testeetst");
    this.close(false);
  }
}
