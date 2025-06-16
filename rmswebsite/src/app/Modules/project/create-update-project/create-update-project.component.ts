import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionService } from '../../../core/Session/session.service';
import { EncryptionService } from '../../../core/encryption.service';
import { DaidailogeComponent } from '../../../Common/daidailoge/daidailoge.component';
import { ProjectService } from '../../../core/services/project/project.service';

@Component({
  selector: 'app-createUpdateproject',
  templateUrl: './create-update-project.component.html',
  styleUrls: ['./create-update-project.component.scss']
})
export class CreateUpdateprojectComponent {
  createProjectForm!: FormGroup;
  authid: any;
  sessionData: any;
  erroMessage: any;
  projectData: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private session: SessionService,
    private encrypt: EncryptionService,
    private project: ProjectService,
    private router: Router,
  ) {
    this.projectData = window.history.state.data;
  }

  ngOnInit() {
    this.createProjectForm = this.fb.group({
      name: this.projectData ? this.projectData.name: '',
      companyName: this.projectData ? this.projectData.companyname: '',
      projectDescription: this.projectData ? this.projectData.description: ''
    });
  }

  showInvalidFieldsAlert() {
    let invalidFields = '';    

    if (this.createProjectForm.controls['name'].invalid) {
      invalidFields += '- Project Name\n';
    }

    if (this.createProjectForm.controls['companyName'].invalid) {
      invalidFields += '- Company Name\n';
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

  createUpdateProject(data: any) {

    if (this.createProjectForm.invalid) {
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
      companyName: data.companyName,
      description: data.projectDescription,
      mode: this.projectData? "U" : "I",
	    status: this.projectData? this.projectData.status :"0" 
    };
    if(this.projectData){
      payload.id = this.projectData.id
    }

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.project.CRUDProject(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        this.erroMessage = response.ResponseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.router.navigate(['dashboard/project']);
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  Cancel(){
    this.router.navigate(['/dashboard/project/project-list']);
  }
}
