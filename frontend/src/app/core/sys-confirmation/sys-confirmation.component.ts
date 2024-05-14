import {Component, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sys-confirmation',
  templateUrl: './sys-confirmation.component.html',
  styleUrl: './sys-confirmation.component.scss'
})
export class SysConfirmationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<SysConfirmationComponent>) {
  }

  confirm(){
    this.dialogRef.close(true);
  }

}
