import { Directive } from "@angular/core";

@Directive({
  selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
  host: {'class': 'mat-dialog-content'}
})
export class MatDialogContent {}

@Directive({
  selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
  host: {'class': 'mat-dialog-actions'}
})
export class MatDialogActions {}
