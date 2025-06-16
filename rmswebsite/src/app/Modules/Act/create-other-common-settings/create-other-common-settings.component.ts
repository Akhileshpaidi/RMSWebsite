import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-create-other-common-settings',
  templateUrl: './create-other-common-settings.component.html',
  styleUrls: ['./create-other-common-settings.component.scss']
})
export class CreateOtherCommonSettingsComponent {
  configForm: any;
  userdata:any;

  constructor(private fb: FormBuilder, private http: HttpClient, public session: SessionService, public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.configForm = this.fb.group({
      
      settoggle:[true],
      filesize:[10 ,[Validators.required, Validators.min(1)]]
  
  });
  let user: any = this.session.getUser();

       this.userdata = JSON.parse(user);
    
       console.log("userid", this.userdata.profile.userid);

   this.fetchConfiguration();
  }

  fetchConfiguration(): void {
    
    this.http.get(URL+`/Appspecifyconfiguration/getAppspecifycommonconfiguration`, { headers })
      .subscribe((response: any) => {
        console.log(response)
        if (response ) {
          this.configForm.patchValue({
            
            settoggle: response.permission,
            filesize: response.filesize
          });
        }
      }, error => {
        console.error('Error fetching configuration:', error);
      });
  }
  onSubmit(): void {
    if (this.configForm.valid) {
      console.log(this.configForm.value);

     


 
      const payload = {
        configuration: 'Set File Upload Size Limit for every Compliance Updation attachment',
        permission: this.configForm.get('settoggle').value, // Corrected how to access form control values
        filesize: parseInt( this.configForm.get('filesize').value),
        createdby:this.userdata.profile.userid
      };
    


      alert(JSON.stringify(payload))

      this.http.put(URL + '/Appspecifyconfiguration/insertAppspecifycommonconfiguration', payload, { headers })
      .subscribe({
        next: (response: any) => {
          console.log(response, 'response');
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Data Updated Successfully" },
          });
          this.configForm.reset();
          this.reloadComponent();
        },
        error: (error) => {
          console.error('Error from API:', error);
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: "Error: An error occurred while processing your request." }
          });
        }
      });
    }
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  Cancel(){
    this.reloadComponent();
  }
}
