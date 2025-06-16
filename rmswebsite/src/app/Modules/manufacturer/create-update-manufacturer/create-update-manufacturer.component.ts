import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ManufacturerService } from 'src/app/core/services/manufacturer/manufacturer.service';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-create-update-manufacturer',
  templateUrl: './create-update-manufacturer.component.html',
  styleUrls: ['./create-update-manufacturer.component.scss']
})
export class CreateUpdateManufacturerComponent {

  createManufacturerForm!: FormGroup;
  authid: any;
  sessionData: any;
  erroMessage: any;
  manufacturerData: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private session: SessionService,
    private encrypt: EncryptionService,
    private manufacturer: ManufacturerService,
    private router: Router,
  ) {
    this.manufacturerData = window.history.state.data;
  }

  ngOnInit() {
    this.createManufacturerForm = this.fb.group({
      name: this.manufacturerData ? this.manufacturerData.name: '',
      description: this.manufacturerData ? this.manufacturerData.description: ''
    });
  }

  showInvalidFieldsAlert() {
    let invalidFields = '';    

    if (this.createManufacturerForm.controls['name'].invalid) {
      invalidFields += '- Manufacturer Name\n';
    }
  
    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }
  }

  createUpdateManufacturer(data: any) {

    if (this.createManufacturerForm.invalid) {
      this.showInvalidFieldsAlert();
      return;
    }
    
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    // payload
    let payload: any = {
      authid: this.sessionData.profile.authid,
      name: data.name,
      description: data.description,
      mode: this.manufacturerData? "U" : "I",
	    status: this.manufacturerData? this.manufacturerData.status :"0" 
    };
    if(this.manufacturerData){
      payload.id = this.manufacturerData.id
    }

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.manufacturer.CRUDManufacturer(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        this.erroMessage = response.ResponseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.router.navigate(['dashboard/manufacturer']);
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  Cancel(){
    this.router.navigate(['/dashboard/manufacturer/manufacturer-list']);
  }

}
