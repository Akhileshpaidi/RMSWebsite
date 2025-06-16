import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-unregister-inspection',
  templateUrl: './unregister-inspection.component.html',
  styleUrls: ['./unregister-inspection.component.scss'],
})
export class UnregisterInspectionComponent implements OnInit {
  sessionData: any;
  erroMessage: any;
  mypeofstructure: any;
  project: any;
  typeofalternativeroute: any;
  typeofbridge: any;
  typeofcarriagewayfirstdigit: any;
  typeofcarriagewayseconddigit: any;
  typeoffoundation: any;
  typeofsuperstructure: any;
  createAddOnBridgeForm!: FormGroup;
  selectedproject = new FormControl('');
  selectedtypeofalternativeroute = new FormControl('');
  selectedtypeofcarriagewayfirstdigit = new FormControl('');
  selectedtypeofcarriagewayseconddigit = new FormControl('');
  selectedtypeofbridge = new FormControl('');
  selectedtypeoffoundation = new FormControl('');
  selectedtypeofsuperstructure = new FormControl('');
  selectedtypeofstructure = new FormControl('');
  chainageinmeter = new FormControl('');
  chainageinkelometer = new FormControl('');
  name = new FormControl('');
  constructor(
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.createAddOnBridgeForm = this.formBuilder.group({
      project: this.selectedproject,
      typeofalternativeroute: this.selectedtypeofalternativeroute,
      chainageinmeter: this.chainageinmeter,
      chainageinkelometer: this.chainageinkelometer,
      typeofstructure: this.selectedtypeofstructure,
      typeofbridge: this.selectedtypeofbridge,
      typeofcarriagewayfirstdigit: this.selectedtypeofcarriagewayfirstdigit,
      typeofcarriagewayseconddigit: this.selectedtypeofcarriagewayseconddigit,
      typeoffoundation: this.selectedtypeoffoundation,
      typeofsuperstructure: this.selectedtypeofsuperstructure,
      name: this.name,
    });
    this.getMetaData();
  }

  getMetaData() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api inspection list
    this.inspection
      .addOnBridgeMetaData(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let inspectionlist = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionlist);
          this.typeofcarriagewayfirstdigit = data.typeofcarriagewayfirstdigit;
          this.typeofcarriagewayseconddigit = data.typeofcarriagewayseconddigit;
          this.typeofbridge = data.typeofbridge;
          this.typeoffoundation = data.typeoffoundation;
          this.typeofsuperstructure = data.typeofsuperstructure;
          this.mypeofstructure = data.mypeofstructure;
          this.typeofalternativeroute = data.typeofalternativeroute;
          this.project = data.project;
          console.log(data, 'add on bride meta data');
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });
  }

  createAddOnBridge(value: any) {
    // stop here if form is invalid
    if (this.createAddOnBridgeForm.invalid) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: { message: 'All fields are compulsory' },
      });
      return;
    }
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      projectid: value.project,
      name: value.name,
      chainagekm: value.chainageinkelometer,
      chainagemet: value.chainageinmeter,
      carriagewayfirstdigit: value.typeofcarriagewayfirstdigit,
      carriagewayseconddigit: value.typeofcarriagewayseconddigit,
      bridgetype: value.typeofbridge,
      foundation: value.typeoffoundation,
      superstructure: value.typeofsuperstructure,
      structure: value.typeofstructure,
      alternateroute: value.typeofalternativeroute,
    };
    console.log('payload', payload);
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.inspection
      .createAddOnBridge(encryptedPayload)
      .subscribe((response: any) => {
        console.log('response', response);
        if (response.ResponseCode === '0') {
          this.erroMessage = response.ResponseDesc;
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          }); // this.router.navigate(['/dashboard/user']);
          this.router.navigate(['dashboard/inspection/self-inspection']);
        } else {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          });
        }
      });
  }
  ngOnInit(): void {}
  Cancel(){
    this.router.navigate(['dashboard/inspection/self-inspection']);
  }
}
