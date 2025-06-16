import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doc-dailoge',
  templateUrl: './add-doc-dailoge.component.html',
  styleUrls: ['./add-doc-dailoge.component.scss']
})
export class AddDocDailogeComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDocDailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
