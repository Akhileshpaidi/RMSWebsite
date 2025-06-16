import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { EncryptionService } from 'src/app/core/encryption.service';
import { inputLengthRangeValidator } from 'src/app/core/services/input-validator.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { SessionService } from 'src/app/core/Session/session.service';

@Component({
  selector: 'app-create-bridge-master',
  templateUrl: './create-bridge-master.component.html',
  styleUrls: ['./create-bridge-master.component.scss'],
})
export class CreateBridgeMasterComponent {
  RemedyType: any;
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
  typeofsubstructure: any;
  createAddOnBridgeForm!: FormGroup;
  selectedproject = new FormControl('');
  selectedtypeofalternativeroute = new FormControl('');
  selectedtypeofcarriagewayfirstdigit = new FormControl('');
  selectedtypeofcarriagewayseconddigit = new FormControl('');
  selectedtypeofbridge = new FormControl('');
  selectedtypeoffoundation = new FormControl('');
  selectedtypeofsuperstructure = new FormControl('');
  selectedtypeofstructure = new FormControl('');
  selectedtypeofsubstructure = new FormControl('');
  chainageinmeter = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(1, 3),
  ]);
  chainageinkelometer = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(1, 3),
  ]);
  name = new FormControl('');
  gradeseperator = new FormControl('');
  nameofhighway = new FormControl('');
  noofpiers = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(1, 3),
  ]);
  trafficlanes = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(1, 3),
  ]);
  latitude = new FormControl('');
  longitude = new FormControl('');
  landmark = new FormControl('');
  pincode = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(6, 6),
  ]);
  noofhighway = new FormControl('', [
    Validators.required,
    inputLengthRangeValidator(1, 3),
  ]);
  status = new FormControl('');

  tempStatus: boolean = false;
  constructor(
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private formBuilder: FormBuilder,
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
      typeofsubstructure: this.selectedtypeofsubstructure,
      name: this.name,
      gradeseperator: this.gradeseperator,
      nameofhighway: this.nameofhighway,
      noofhighway: this.noofhighway,
      noofpiers: this.noofpiers,
      trafficlanes: this.trafficlanes,
      latitude: this.latitude,
      longitude: this.longitude,
      landmark: this.landmark,
      pincode: this.pincode,
      status: this.status,
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
          this.typeofsubstructure = data.typeofsubstructure;
          this.project = data.project;
          // console.log(data, 'add on bride meta data');
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
        data: {
          message: 'Clear all errors before retrying to save the bridge.',
        },
      });
      return;
    }
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      name: value.name,
      projectid: value.project,
      alternateroute: value.typeofalternativeroute,
      chainagemet: value.chainageinmeter,
      chainagekm: value.chainageinkelometer,
      carriagewayfirstdigit: value.typeofcarriagewayfirstdigit,
      carriagewayseconddigit: value.typeofcarriagewayseconddigit,
      bridgetype: value.typeofbridge,
      foundation: value.typeoffoundation,
      superstructure: value.typeofsuperstructure,
      structure: value.typeofstructure,
      substructure: value.typeofsubstructure,
      gradeseperator: value.gradeseperator,
      nameofhighway: value.nameofhighway,
      noofhighway: value.noofhighway,
      noofpiers: value.noofpiers,
      trafficlanes: value.trafficlanes,
      latitude: value.latitude,
      longitude: value.longitude,
      landmark: value.landmark,
      pincode: value.pincode,
      status: this.tempStatus ? '0' : '1',
    };
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.inspection.CRUDBridge(encryptedPayload).subscribe((response: any) => {
      // console.log('response', response);
      if (response.ResponseCode === '0') {
        this.erroMessage = response.ResponseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        }); // this.router.navigate(['/dashboard/user']);
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }
  Cancel() {
    this.router.navigate(['dashboard/report/create-bridge-master']);
  }
  statusToggle(event: any) {
    this.tempStatus = !this.tempStatus;
    this.status.setValue(this.tempStatus ? '0' : '1');
    console.log(this.status.value);
  }

  selectInspection(element: any) {
    let id = element.value;

    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      bridgeid: id,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    this.RemedyType
      .inspectionSummary(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let inspectionList = this.encrypt.decryptionAES(
            response.ResponseData
          );
          let data = JSON.parse(inspectionList);
          this.selectInspection = data.inspectionlist;
          console.log('inspectionList', this.selectInspection);
        } else {
          console.error(response);
        }

      });
    }

}
