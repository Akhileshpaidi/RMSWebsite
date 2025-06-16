import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { InspectionService } from 'src/app/core/services/Inspection/inspection.service';
import { ExcelService } from 'src/app/core/services/export/excel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './bridge-reports.component.html',
  styleUrls: ['./bridge-reports.component.scss'],
})
export class BridgeReportsComponent {
  sessionData: any;
  projectData: any;
  bridgeData: any;
  unitRates: any;
  lowViscosityEpoxyGrouts: any = [];
  polymerModifiedCementGrouts: any = [];
  pmcMortars: any = [];
  waterSprouts: any = [];
  rallings: any = [];
  kerbBeams: any = [];
  expansionJoints: any = [];
  rccWearingGrouts: any = [];
  bituminousWearingGrouts: any = [];
  wrappings: any = [];
  bearingReplacements: any = [];
  microconcretes: any = [];
  nipplesLowViscosity: any = [];
  nipplesModifiedCementGrout: any = [];
  sealingsOfCracks: any = [];
  showUnitRates: boolean = false;

  unitRateOptions: any = {};
  selectedUnitRates: any = {};

  bridgeReportForm!: FormGroup;
  selectedproject = new FormControl('');
  selectedBridge = new FormControl('');
  selectedlowViscosityEpoxyGroutManufacturer = new FormControl('');
  selectedlowViscosityEpoxyGroutMaterial = new FormControl('');
  selectedpolymerModifiedCementGroutManufacturer = new FormControl('');
  selectedpolymerModifiedCementGroutMaterial = new FormControl('');
  selectedpmcMortarManufacturer = new FormControl('');
  selectedpmcMortarMaterial = new FormControl('');
  selectedwaterSproutManufacturer = new FormControl('');
  selectedwaterSproutMaterial = new FormControl('');
  selectedrallingManufacturer = new FormControl('');
  selectedrallingMaterial = new FormControl('');
  selectedkerbBeamManufacturer = new FormControl('');
  selectedkerbBeamMaterial = new FormControl('');
  selectedexpansionJointManufacturer = new FormControl('');
  selectedexpansionJointMaterial = new FormControl('');
  selectedrccWearingGroutManufacturer = new FormControl('');
  selectedrccWearingGroutMaterial = new FormControl('');
  selectedbituminousWearingGroutManufacturer = new FormControl('');
  selectedbituminousWearingGroutMaterial = new FormControl('');
  selectedwrappingManufacturer = new FormControl('');
  selectedwrappingMaterial = new FormControl('');
  selectedbearingReplacementManufacturer = new FormControl('');
  selectedbearingReplacementMaterial = new FormControl('');
  selectedmicroconcreteManufacturer = new FormControl('');
  selectedmicroconcreteMaterial = new FormControl('');
  selectednipplesLowViscosityManufacturer = new FormControl('');
  selectednipplesLowViscosityMaterial = new FormControl('');
  selectednipplesModifiedCementGroutManufacturer = new FormControl('');
  selectednipplesModifiedCementGroutMaterial = new FormControl('');
  selectedsealingsOfCrackManufacturer = new FormControl('');
  selectedsealingsOfCrackMaterial = new FormControl('');
  constructor(
    private session: SessionService,
    private encrypt: EncryptionService,
    private inspection: InspectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private excelService: ExcelService
  ) {
    this.bridgeData = null;
    this.bridgeReportForm = this.formBuilder.group({
      project: this.selectedproject,
      bridge: this.selectedBridge,
      1: this.selectedlowViscosityEpoxyGroutManufacturer,
      2: this.selectedpolymerModifiedCementGroutManufacturer,
      3: this.selectedpmcMortarManufacturer,
      4: this.selectedwaterSproutManufacturer,
      5: this.selectedrallingManufacturer,
      6: this.selectedkerbBeamManufacturer,
      7: this.selectedexpansionJointManufacturer,
      8: this.selectedrccWearingGroutManufacturer,
      9: this.selectedbituminousWearingGroutManufacturer,
      10: this.selectedwrappingManufacturer,
      11: this.selectedbearingReplacementManufacturer,
      12: this.selectedmicroconcreteManufacturer,
      13: this.selectednipplesLowViscosityManufacturer,
      14: this.selectednipplesModifiedCementGroutManufacturer,
      15: this.selectedsealingsOfCrackManufacturer,
    });
    this.getProjectData();
  }

  getBOQ() {
    this.unitRates.forEach((element: any) => {
      // console.log(element);
      switch (element['treatmnentid']) {
        case 1:
          this.lowViscosityEpoxyGrouts.push(element);
          break;
        case 2:
          this.polymerModifiedCementGrouts.push(element);
          break;
        case 3:
          this.pmcMortars.push(element);
          break;
        case 4:
          this.waterSprouts.push(element);
          break;
        case 5:
          this.rallings.push(element);
          break;
        case 6:
          this.kerbBeams.push(element);
          break;
        case 7:
          this.expansionJoints.push(element);
          break;
        case 8:
          this.rccWearingGrouts.push(element);
          break;
        case 9:
          this.bituminousWearingGrouts.push(element);
          break;
        case 10:
          this.wrappings.push(element);
          break;
        case 11:
          this.bearingReplacements.push(element);
          break;
        case 12:
          this.microconcretes.push(element);
          break;
        case 13:
          this.nipplesLowViscosity.push(element);
          break;
        case 14:
          this.nipplesModifiedCementGrout.push(element);
          break;
        case 15:
          this.sealingsOfCracks.push(element);
          break;
      }
    });
    this.unitRateOptions = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
    };
    this.selectedUnitRates = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: '',
    };
  }

  getProjectData() {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let payload = {
      authid: this.sessionData.profile.authid,
    };

    // console.log(payload);
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.inspection
      .getAllProjects(encryptedPayload)
      .subscribe((response: any) => {
        // console.log(response);
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          this.projectData = JSON.parse(data)['project'];
        }
      });

    this.inspection
      .getBOQUnitRate(encryptedPayload)
      .subscribe((response: any) => {
        // console.log(response);
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          this.unitRates = JSON.parse(data)['unitrate'];
          this.getBOQ();
        }
      });
  }

  makeReportPayload() {
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let uRates: any = [];
    for (let index = 1; index < 16; index++) {
      uRates.push({
        treatmnentid: index,
        unitrate: this.selectedUnitRates[index],
      });
    }
    let payload = {
      authid: this.sessionData.profile.authid,
      bridges: this.bridgeReportForm.get('bridge')?.value,
      unitrate: uRates,
    };
    return {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
  }

  getReport(data: any) {
    this.inspection
      .getBOQReport(this.makeReportPayload())
      .subscribe((response: any) => {
        // console.log(response);
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          console.log(data);
          this.excelService.exportAsExcelFile(
            JSON.parse(data)['report'],
            'BOQ'
          );
        }
      });
  }

  getBridges(event: any) {
    // console.log(event);
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let payload = {
      authid: this.sessionData.profile.authid,
      projectid: event['value'],
    };

    // console.log(payload);
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // // console.log('encryptedPayload', encryptedPayload);

    this.inspection
      .getBridgesFromProjectId(encryptedPayload)
      .subscribe((response: any) => {
        // console.log(response);
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          // console.log(JSON.parse(data));
          this.bridgeData = JSON.parse(data)['bridgelist'];
        }
      });
  }

  getBridgeData(event: any) {
    this.showUnitRates = true;
  }

  changeMaterialDropdown(event: any, dropdown: any) {
    const selectedValue = event.value;
    this.unitRateOptions[selectedValue['treatmnentid']] = [];
    this.unitRates.forEach((element: any) => {
      if (
        element['treatmnentid'] === selectedValue['treatmnentid'] &&
        element['manufacturerid'] === selectedValue['manufacturerid']
      ) {
        this.unitRateOptions[selectedValue['treatmnentid']].push(element);
      }
    });
  }

  setUnitRate(event: any, dropdown: any) {
    const selectedValue = event.value;
    this.selectedUnitRates[selectedValue['treatmnentid']] =
      event.value['unitrate'];
    console.log(this.selectedUnitRates);
  }

  onChange(event:any, index: number){
    console.log(index,event);
    this.selectedUnitRates[index] = Number(event.target.value);
    console.log(this.selectedUnitRates);
  }
}
