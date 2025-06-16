import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef ,MatDialogModule, MatDialog} from '@angular/material/dialog';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-confirmmessage',
  templateUrl: './confirmmessage.component.html',
  styleUrls: ['./confirmmessage.component.scss']
})
export class ConfirmmessageComponent {
  erroMessage:any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmmessageComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  BeginAss(){
    this.dialogRef.close(true);
  }
  AssLater(){
    this.erroMessage='Dear User, you have chosen to attempt this Assessment ‘later’. You can continue to access this Assessment under “My Assessments” Tab. It will be in your own interest to attempt the  Assessment within due time allocated.';
       const dialogRef = this.dialog.open(ToasterComponent, {
          width: '550px',
          
            data: {
              title: 'Attempt Later',
              message: this.erroMessage,
              confirmButtonText: 'Attempt Later'
            },
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            if (result) { // User clicked "OK" in the confirmation dialog
              const headers = {
                'Content-Type': 'application/json', // Adjust content type as needed
              };
           
    this.dialogRef.close(false);
    this.reloadComponent();
  }
});
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
