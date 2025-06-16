import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-more-related-info-dialogbox',
  templateUrl: './more-related-info-dialogbox.component.html',
  styleUrls: ['./more-related-info-dialogbox.component.scss']
})
export class MoreRelatedInfoDialogboxComponent {
constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MoreRelatedInfoDialogboxComponent>){

}
closeDialog(): void {
  this.dialogRef.close();
}
}
