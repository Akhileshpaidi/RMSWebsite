import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-bridge',
  templateUrl: './create-bridge.component.html',
  styleUrls: ['./create-bridge.component.scss'],
})
export class CreateBridgeComponent implements OnInit {
  totalpmcgroutbyweight: any;
  pmcmortartreatmentareaofbottom: any;
  pmcmortartreatmenttotalareaofbottom: any;
  pmcmortartreatmenttotalsidearea: any;
  pmcmortartreatmentestimatedpercent: any;
  pmcmortartreatmentdamagedarea: any;
  pmcmortartreatmenttotalareacrossgirder: any;
  pmcmortartreatmentestimatedpercentcg: any;
  pmcmortartreatmentdamagedareacg: any;
  pmcmortartreatmenttotalareatsi: any;
  pmcmortartreatmentestimatedpercenttsi: any;
  pmcmortartreatmentdamagedareatsi: any;
  pmcmortartreatmenttotalareatsc: any;
  pmcmortartreatmentestimatedpercenttsc: any;
  pmcmortartreatmentdamagedareatsc: any;
  pmcmortartreatmenttotalarea: any;
  watersproutinaspan: any;
  watersprouttotalnumber: any;
  railingandkerbbeamlengthofspan: any;
  railingandkerbbeamnumberofspan: any;
  railingandkerbbeamtotallength: any;
  expansionjointnumberofexpansionjoints: any;
  expansionjointlength: any;
  expansionjointtotallength: any;
  dismantlingofrccandbituminiouswearingcoatarea: any;
  dismantlingofrccandbituminiouswearingcoattotalarea: any;
  wrappingnumberofmg: any;
  wrappingbottomareamg: any;
  wrappingsidearea: any;
  wrappingtotalarea: any;
  Microconcreteforrepairingpatchwidth: undefined;
  Microconcreteforrepairingpatchlength: any;
  Microconcreteforrepairingpatchdepth: any;
  Microconcreteforrepairingpatchvolume: any;
  NipplesforLowviscositypolymergroutplace: any;
  numberofnipplealong: any;
  numberofnippleacross: any;
  totalnumberofnipple: any;
  numberofnipplebottommg: any;
  totalnumberofnipplebottommg: any;
  groutingtobedone: any;
  totalnumberofnippleinthebridge: any;
  totalnipple: any;
  topslabnonipplepiercap: any;
  topslabnonippleinbridge: any;
  topslabnonippleinaspan: any;
  topslabnonipplealong: any;
  topslabnonipple: any;
  totalnonipplesinthebridge: any;
  totalnonipplesinagirder: any;
  totalnonipplescg: any;
  noacrosscg: any;
  nonipplescg: any;
  place: any;
  status: any;
  areabottommg() {
    this.mgareabottom = this.lspan * this.mgwidth;
  }
  insertPayload: any;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  sixthFormGroup = this._formBuilder.group({
    sixthCtrl: ['', Validators.required],
  });
  seventhFormGroup = this._formBuilder.group({
    seventhCtrl: ['', Validators.required],
  });
  eigthFormGroup = this._formBuilder.group({
    eigthCtrl: ['', Validators.required],
  });
  ninthFormGroup = this._formBuilder.group({
    ninthCtrl: ['', Validators.required],
  });
  tenthFormGroup = this._formBuilder.group({
    tenthCtrl: ['', Validators.required],
  });
  eleventhFormGroup = this._formBuilder.group({
    eleventhCtrl: ['', Validators.required],
  });
  twelvethFormGroup = this._formBuilder.group({
    twelvethCtrl: ['', Validators.required],
  });
  thirteenthFormGroup = this._formBuilder.group({
    thirteenthCtrl: ['', Validators.required],
  });
  fourteenthFormGroup = this._formBuilder.group({
    fourteenthCtrl: ['', Validators.required],
  });
  fifteenthFormGroup = this._formBuilder.group({
    fifteenthCtrl: ['', Validators.required],
  });
  sixteenthFormGroup = this._formBuilder.group({
    sixteenthCtrl: ['', Validators.required],
  });

  seventeenthFormGroup = this._formBuilder.group({
    seventeenthCtrl: ['', Validators.required],
  });

  isLinear = false;
  sessionData: any;
  erroMessage: any;
  typeoffoundation: any;
  typeoffoundationvalue: any;
  typeofsubstructure: any;
  typeofsubstructurevalue: any;
  typeofsuperstructure: any;
  typeofsuperstructurevalue: any;
  typeofbearing: any;
  typeofbearingvalue: any;
  typeofexpansionjoint: any;
  typeofexpansionjointvalue: any;
  typeofrailing: any;
  typeofrailingvalue: any;
  typeofwearingcoarse: any;
  typeofwearingcoarsevalue: any;
  lspan: any;
  wspan: any;
  mgnospan: any;
  nobearing: any;
  nopile: any;
  diapile: any;
  mgvolume: any;
  mgareaside: any;
  mgareabottom: any;
  mgwidth: any;
  mgdepth: any;
  tsivolume: any;
  tsiarea: any;
  tsithickness: any;
  tsinoportion: any;
  tsiwidth: any;
  tscwidth: any;
  tscnop: any;
  tscarea: any;
  tscvolume: any;
  tscthickness: any;
  CGWidth: any;
  CGDepth: any;
  CGLength: any;
  CGAreaBottom: any;
  CGAreaSide: any;
  CGVolume: any;
  CGNumber: any;
  LVVolume: any;
  LVPorosity: any;
  LVPorousVolume: any;
  LVPercentVolume: any;
  LVNetVolume: any;
  LVGrout: any;
  LVTotalVolume: any;
  LVTspecificGravity: any;
  LVTotalVolumeGirder: any;
  PMCGVolume: any;
  PMCGPorosity: any;
  PMCGPorousVolume: any;
  PMCGPorousPercent: any;
  PMCGNetVolume: any;
  PMCGTotalVolume: any;
  PMTSIVolume: any;
  PMTSIPorousity: any;
  PMTSIPorousVolume: any;
  PMTSIPorousPercent: any;
  PMTSINetVolume: any;
  PMTSITotalVolume: any;
  PMTSCTotalVolume: any;
  PMTSCNetVolume: any;
  PMTSCPorousPercent: any;
  PMTSCPorousVolume: any;
  PMTSCVolume: any;
  PMTSCPorousity: any;
  pierVolume: any;
  NoPierCap: any;
  GroutedNoPierCap: any;
  pierCapTotalVolume: any;
  pierCapPorosity: any;
  pierCapPorousVolume: any;
  pierCapPercentPorous: any;
  pierCapNetVolume: any;
  pierCapTotalVolumeOfGrout: any;
  pierCapVolume: any;
  ProjectID: any;
  addonmasterdata: any;
  BUID: any;
  bridgeList: any;
  constructor(
    private _formBuilder: FormBuilder,
    private inventory: InventoryService,
    private session: SessionService,
    private encrypt: EncryptionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.getAllMasters();
    this.getAddonMasters();
  }

  ngOnInit(): void {}

  getBUIDbyProjectID() {
    let payload = {
      authid: this.sessionData.profile.authid,
      projectid: 1,
    };
    console.log('payload get BUID', payload);
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    this.inventory.getBUID(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        let getBUIDResponse = this.encrypt.decryptionAES(response.ResponseData);
        console.log('getBUIDResponse', getBUIDResponse);
        this.bridgeList = JSON.parse(getBUIDResponse).bridgelist;
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  getAllMasters() {
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

    // Calling Api
    this.inventory.getAllMaster(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        let masterlist = this.encrypt.decryptionAES(response.ResponseData);
        console.log('master list', masterlist);
        let data = JSON.parse(masterlist);
        this.typeoffoundation = data.typeoffoundation;
        this.typeofsubstructure = data.typeofsubstructure;
        this.typeofsuperstructure = data.typeofsuperstructure;
        this.typeofbearing = data.typeofbearing;
        this.typeofexpansionjoint = data.typeofexpansionjoint;
        this.typeofwearingcoarse = data.typeofwearingcoarse;
        this.typeofrailing = data.typeofrailing;
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  getAddonMasters() {
    let payload = {
      authid: this.sessionData.profile.authid,
    };
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    this.inventory
      .getAddonMasters(encryptedPayload)
      .subscribe((response: any) => {
        console.log('response', response);
        if (response.ResponseCode === '0') {
          let getAddonMastersResponse = this.encrypt.decryptionAES(
            response.ResponseData
          );
          console.log(getAddonMastersResponse);

          this.addonmasterdata = JSON.parse(getAddonMastersResponse).project;
          console.log('getAddonMastersResponse', this.addonmasterdata);
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });
  }

  statusToggle(event: any) {
    this.status.setValue(event.value ? '0' : '1');
  }

  saveNext(element: any) {
    console.log('typeoffoundation', this.typeoffoundationvalue);
    this.insertPayload = {
      authid: this.sessionData.profile.authid,
      mode: 'I',
      projectid: parseInt(this.ProjectID),
      bridgeid: this.BUID,
      savestatus: element == 'D' ? 'D' : 'I',
      status: this.status,
      data: {
        typeoffoundation:
          this.typeoffoundationvalue != undefined
            ? this.typeoffoundationvalue
            : '',
        typeofsubstructure:
          this.typeofsubstructurevalue != undefined
            ? this.typeofsubstructurevalue
            : '',
        typeofsuperstructure:
          this.typeofsuperstructurevalue != undefined
            ? this.typeofsuperstructurevalue
            : '',
        typeofbearing:
          this.typeofbearingvalue != undefined ? this.typeofbearingvalue : '',
        typeofexpansionjoint:
          this.typeofexpansionjointvalue != undefined
            ? this.typeofexpansionjointvalue
            : '',
        typeofwearingcoars:
          this.typeofwearingcoarsevalue != undefined
            ? this.typeofwearingcoarsevalue
            : '',
        typeofrailing:
          this.typeofrailingvalue != undefined ? this.typeofrailingvalue : '',
        lengthofspan: this.lspan != undefined ? this.lspan : '',
        widthofspan: this.wspan != undefined ? this.wspan : '',
        noofmaingirderinaspan: this.mgnospan != undefined ? this.mgnospan : '',
        noofbearinginspan: this.nobearing != undefined ? this.nobearing : '',
        noofpile: this.nopile != undefined ? this.nopile : '',
        diaofpile: this.diapile != undefined ? this.diapile : '',
        pilecapdimension: {
          length: 5.2,
          width: 2.5,
          depth: 2,
        },
        pierdimension: {
          height: 6.1,
          width: 2.8,
          thickness: 0.5,
        },
        maingirder: {
          depth: this.mgdepth != undefined ? this.mgdepth : '',
          width: this.mgwidth != undefined ? this.mgwidth : '',
          areabottom: this.mgareabottom != undefined ? this.mgareabottom : '',
          areaside: this.mgareaside != undefined ? this.mgareaside : '',
          volume: this.mgvolume != undefined ? this.mgvolume : '',
        },
        topslabinterior: {
          width: this.tsiwidth != undefined ? this.tsiwidth : '',
          noofportions: this.tsinoportion != undefined ? this.tsinoportion : '',
          thickness: this.tsithickness != undefined ? this.tsithickness : '',
          area: this.tsiarea != undefined ? this.tsiarea : '',
          volume: this.tsivolume != undefined ? this.tsivolume : '',
        },
        topslabcantilever: {
          width: this.tscwidth != undefined ? this.tscwidth : '',
          noofportions: this.tscnop != undefined ? this.tscnop : '',
          thickness: this.tscthickness != undefined ? this.tscthickness : '',
          area: this.tscarea != undefined ? this.tscarea : '',
          volume: this.tscvolume != undefined ? this.tscvolume : '',
        },
        crossgirder: {
          depth: this.CGDepth != undefined ? this.CGDepth : '',
          width: this.CGWidth != undefined ? this.CGWidth : '',
          length: this.CGLength != undefined ? this.CGLength : '',
          areaofbottom: this.CGAreaBottom != undefined ? this.CGAreaBottom : '',
          areaofside: this.CGAreaSide != undefined ? this.CGAreaSide : '',
          volume: this.CGVolume != undefined ? this.CGVolume : '',
          noofcrossgirders: this.CGNumber != undefined ? this.CGNumber : '',
        },
        lowviscositygrout: {
          maingrinders: {
            volume: this.LVVolume != undefined ? this.LVVolume : '',
            porosity: this.LVPorosity != undefined ? this.LVPorosity : '',
            porousvolume:
              this.LVPorousVolume != undefined ? this.LVPercentVolume : '',
            pcofporousvolfilled:
              this.LVPercentVolume != undefined ? this.LVPercentVolume : '',
            netvolumetobefilled:
              this.LVNetVolume != undefined ? this.LVNetVolume : '',
            groutingtobedonepc: this.LVGrout != undefined ? this.LVGrout : '',
            totalvoltobefilled:
              this.LVTotalVolume != undefined ? this.LVTotalVolume : '',
            specificgravity:
              this.LVTspecificGravity != undefined
                ? this.LVTspecificGravity
                : '',
            totalvolumeinltr:
              this.LVTotalVolumeGirder != undefined
                ? this.LVTotalVolumeGirder
                : '',
          },
        },
        polymermodifiedcementgrout: {
          crossgirders: {
            volumeofacrossgirder:
              this.PMCGVolume != undefined ? this.PMCGVolume : '',
            porosity: this.PMCGPorosity != undefined ? this.PMCGPorosity : '',
            porousvolume:
              this.PMCGPorousVolume != undefined ? this.PMCGPorousVolume : '',
            pcofporousvolfilled:
              this.PMCGPorousPercent != undefined ? this.PMCGPorousPercent : '',
            netvolumetobefilled:
              this.PMCGNetVolume != undefined ? this.PMCGNetVolume : '',
            totalvoltobefilled:
              this.PMCGTotalVolume != undefined ? this.PMCGTotalVolume : '',
          },
          topslabinterior: {
            volumeoftopslab:
              this.PMTSIVolume != undefined ? this.PMTSIVolume : '',
            porosity:
              this.PMTSIPorousity != undefined ? this.PMTSIPorousity : '',
            porousvolume:
              this.PMTSIPorousVolume != undefined ? this.PMTSIPorousVolume : '',
            pcofporousvolfilled:
              this.PMTSIPorousPercent != undefined
                ? this.PMTSIPorousPercent
                : '',
            netvolumetobefilled:
              this.PMTSINetVolume != undefined ? this.PMTSINetVolume : '',
            totalvoltobefilled:
              this.PMTSITotalVolume != undefined ? this.PMTSITotalVolume : '',
          },
          topslabcantilever: {
            volumeoftopslab:
              this.PMTSCVolume != undefined ? this.PMTSCVolume : '',
            porosity:
              this.PMTSCPorousity != undefined ? this.PMTSCPorousity : '',
            porousvolume:
              this.PMTSCPorousVolume != undefined ? this.PMTSCPorousVolume : '',
            pcofporousvolfilled:
              this.PMTSCPorousPercent != undefined
                ? this.PMTSCPorousPercent
                : '',
            netvolumetobefilled:
              this.PMTSCNetVolume != undefined ? this.PMTSCNetVolume : '',
            totalvoltobefilled:
              this.PMTSCTotalVolume != undefined ? this.PMTSCTotalVolume : '',
          },
          piercap: {
            volumeofpiercap:
              this.pierVolume != undefined ? this.pierVolume : '',
            noofpiercap: this.NoPierCap != undefined ? this.NoPierCap : '',
            noofpiercaptobegrouted:
              this.GroutedNoPierCap != undefined ? this.GroutedNoPierCap : '',
            totalvolofpiercap:
              this.pierCapTotalVolume != undefined
                ? this.pierCapTotalVolume
                : '',
            porosity:
              this.pierCapPorosity != undefined ? this.pierCapPorosity : '',
            porousvolume:
              this.pierCapPorousVolume != undefined
                ? this.pierCapPorousVolume
                : '',
            pcofporousvolfilled:
              this.pierCapPercentPorous != undefined
                ? this.pierCapPercentPorous
                : '',
            netvolumetobefilled:
              this.pierCapNetVolume != undefined ? this.pierCapNetVolume : '',
          },
          totalvolumeofgrout:
            this.pierCapTotalVolumeOfGrout != undefined
              ? this.pierCapTotalVolumeOfGrout
              : '',
          volumeof1cementbag:
            this.pierCapVolume != undefined ? this.pierCapVolume : '',
          totalpmcgroutbyweight:
            this.totalpmcgroutbyweight != undefined
              ? this.totalpmcgroutbyweight
              : '',
        },
        pmcmortartreatment: {
          bottomofmaingirder: {
            areaofbottom:
              this.pmcmortartreatmentareaofbottom != undefined
                ? this.pmcmortartreatmentareaofbottom
                : '',
            totalarea:
              this.pmcmortartreatmenttotalareaofbottom != undefined
                ? this.pmcmortartreatmenttotalareaofbottom
                : '',
          },
          sideofmaingirder: {
            totalarea:
              this.pmcmortartreatmenttotalsidearea != undefined
                ? this.pmcmortartreatmenttotalsidearea
                : '',
            estimatedpcofdamagedarea:
              this.pmcmortartreatmentestimatedpercent != undefined
                ? this.pmcmortartreatmentestimatedpercent
                : '',
            damagedarea:
              this.pmcmortartreatmentdamagedarea != undefined
                ? this.pmcmortartreatmentdamagedarea
                : '',
          },
          crossgirder: {
            totalarea:
              this.pmcmortartreatmenttotalareacrossgirder != undefined
                ? this.pmcmortartreatmenttotalareacrossgirder
                : '',
            estimatedpcofdamagedarea:
              this.pmcmortartreatmentestimatedpercentcg != undefined
                ? this.pmcmortartreatmentestimatedpercentcg
                : '',
            damagedarea:
              this.pmcmortartreatmentdamagedareacg != undefined
                ? this.pmcmortartreatmentdamagedareacg
                : '',
          },
          topslabinterior: {
            totalarea:
              this.pmcmortartreatmenttotalareatsi != undefined
                ? this.pmcmortartreatmenttotalareatsi
                : '',
            estimatedpcofdamagedarea:
              this.pmcmortartreatmentestimatedpercenttsi != undefined
                ? this.pmcmortartreatmentestimatedpercenttsi
                : '',
            damagedarea:
              this.pmcmortartreatmentdamagedareatsi != undefined
                ? this.pmcmortartreatmentdamagedareatsi
                : '',
          },
          topslabcantilever: {
            totalarea:
              this.pmcmortartreatmenttotalareatsc != undefined
                ? this.pmcmortartreatmenttotalareatsc
                : '',
            estimatedpcofdamagedarea:
              this.pmcmortartreatmentestimatedpercenttsc != undefined
                ? this.pmcmortartreatmentestimatedpercenttsc
                : '',
            damagedarea:
              this.pmcmortartreatmentdamagedareatsc != undefined
                ? this.pmcmortartreatmentestimatedpercenttsc
                : '',
          },
          totalareaforpmcmortartreatment:
            this.pmcmortartreatmenttotalarea != undefined
              ? this.pmcmortartreatmenttotalarea
              : '',
        },
        watersprout: {
          inspan:
            this.watersproutinaspan != undefined ? this.watersproutinaspan : '',
          totalno:
            this.watersprouttotalnumber != undefined
              ? this.watersprouttotalnumber
              : '',
        },
        railingandkerbbeam: {
          length:
            this.railingandkerbbeamlengthofspan != undefined
              ? this.railingandkerbbeamlengthofspan
              : '',
          noofspan:
            this.railingandkerbbeamnumberofspan != undefined
              ? this.railingandkerbbeamnumberofspan
              : '',
          totallength:
            this.railingandkerbbeamtotallength != undefined
              ? this.railingandkerbbeamtotallength
              : '',
        },
        expansionjoint: {
          noofjoints:
            this.expansionjointnumberofexpansionjoints != undefined
              ? this.expansionjointnumberofexpansionjoints
              : '',
          length:
            this.expansionjointlength != undefined
              ? this.expansionjointlength
              : '',
          totallength:
            this.expansionjointtotallength != undefined
              ? this.expansionjointtotallength
              : '',
        },
        dismantlingofrccandbituminiouswearingcoat: {
          area:
            this.dismantlingofrccandbituminiouswearingcoatarea != undefined
              ? this.dismantlingofrccandbituminiouswearingcoatarea
              : '',
          totalarea:
            this.dismantlingofrccandbituminiouswearingcoattotalarea != undefined
              ? this.dismantlingofrccandbituminiouswearingcoattotalarea
              : '',
        },
        wrapping: {
          maingirder: {
            noofgriders:
              this.wrappingnumberofmg != undefined
                ? this.wrappingnumberofmg
                : '',
            bottomarea:
              this.wrappingbottomareamg != undefined
                ? this.wrappingbottomareamg
                : '',
            sidearea:
              this.wrappingsidearea != undefined ? this.wrappingsidearea : '',
            totalarea:
              this.wrappingtotalarea != undefined ? this.wrappingtotalarea : '',
          },
        },
        Microconcreteforrepairingpatch: {
          width:
            this.Microconcreteforrepairingpatchwidth != undefined
              ? this.Microconcreteforrepairingpatchwidth
              : '',
          length:
            this.Microconcreteforrepairingpatchlength != undefined
              ? this.Microconcreteforrepairingpatchlength
              : '',
          depth:
            this.Microconcreteforrepairingpatchdepth != undefined
              ? this.Microconcreteforrepairingpatchdepth
              : '',
          volume:
            this.Microconcreteforrepairingpatchvolume != undefined
              ? this.Microconcreteforrepairingpatchvolume
              : '',
        },
        NipplesforLowviscositypolymergrout: {
          'Place at 500 mm distance':
            this.NipplesforLowviscositypolymergroutplace != undefined
              ? this.NipplesforLowviscositypolymergroutplace
              : '',
          'Main girders': {
            'Side of Main girder': {
              'No. nipple along length of the girder':
                this.numberofnipplealong != undefined
                  ? this.numberofnipplealong
                  : '',
              'No. nipple across depth of the girder':
                this.numberofnippleacross != undefined
                  ? this.numberofnippleacross
                  : '',
              'Total no. of nipples in side of the girder':
                this.totalnumberofnipple != undefined
                  ? this.totalnumberofnipple
                  : '',
            },
            'Bottom of Main girder': {
              'No. of nipple':
                this.numberofnipplebottommg != undefined
                  ? this.numberofnipplebottommg
                  : '',
            },
            'Total no. of nipples in a girder':
              this.totalnumberofnipplebottommg != undefined
                ? this.totalnumberofnipplebottommg
                : '',
            'Grouting to be done to % of all girders/area of girder':
              this.groutingtobedone != undefined ? this.groutingtobedone : '',
          },
          'Total no. of nipples in the bridge':
            this.totalnumberofnippleinthebridge != undefined
              ? this.totalnumberofnippleinthebridge
              : '',
        },
        'Nipples for Polymer modified cement grout': {
          'Place at 500 mm distance': this.place != undefined ? this.place : '',
          'Cross Girder': {
            'No. nipple along length of the girder':
              this.nonipplescg != undefined ? this.nonipplescg : '',
            'No. nipple across depth of the girder':
              this.noacrosscg != undefined ? this.noacrosscg : '',
            'Total no. of nipples in side of the girder':
              this.totalnonipplescg != undefined ? this.totalnonipplescg : '',
            'Total no. of nipples in a girder':
              this.totalnonipplesinagirder != undefined
                ? this.totalnonipplesinagirder
                : '',
            'Total no. of nipples in the bridge':
              this.totalnonipplesinthebridge != undefined
                ? this.totalnonipplesinthebridge
                : '',
          },
          'Top Slab (grouting to be done from the top)': {
            'No. of nipples across the width of Slab':
              this.topslabnonipple != undefined ? this.topslabnonipple : '',
            'No. of nipples along the length of slab':
              this.topslabnonipplealong != undefined
                ? this.topslabnonipplealong
                : '',
            'Total no. of nipples in a slab of a span':
              this.topslabnonippleinaspan != undefined
                ? this.topslabnonippleinaspan
                : '',
            'Total no. of nipples in the bridge':
              this.topslabnonippleinbridge != undefined
                ? this.topslabnonippleinbridge
                : '',
          },
          'Pier Cap':
            this.topslabnonipplepiercap != undefined
              ? this.topslabnonipplepiercap
              : '',
          'Total nipples':
            this.totalnipple != undefined ? this.totalnipple : '',
        },
      },
    };
    console.log(this.insertPayload);
    this.submit();
  }

  submit() {
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(
        JSON.stringify(this.insertPayload)
      ),
    };
    this.inventory
      .submitInventory(encryptedPayload)
      .subscribe((response: any) => {
        console.log('response', response);
        if (response.ResponseCode === '0') {
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          });
          this._router.navigate(['bridge-list'], {
            relativeTo: this._activatedRoute,
          });
        } else {
          this.erroMessage = response.ResponseDesc;
        }
      });
  }
}
