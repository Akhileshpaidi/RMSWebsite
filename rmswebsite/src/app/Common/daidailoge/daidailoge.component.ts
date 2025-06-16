import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-daidailoge',
  templateUrl: './daidailoge.component.html',
  styleUrls: ['./daidailoge.component.scss']
})
export class DaidailogeComponent {
constructor(
    public dialogRef: MatDialogRef<DaidailogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
