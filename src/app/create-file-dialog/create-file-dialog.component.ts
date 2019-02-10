import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-create-file-dialog',
  templateUrl: './create-file-dialog.component.html'
})
export class CreateFileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
