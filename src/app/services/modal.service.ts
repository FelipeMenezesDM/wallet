import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) { }

  open(component, setts) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = ( setts.width ? setts.width : '360px' );
    dialogConfig.data = setts;

    return this.dialog.open(component, dialogConfig);
  }
}
