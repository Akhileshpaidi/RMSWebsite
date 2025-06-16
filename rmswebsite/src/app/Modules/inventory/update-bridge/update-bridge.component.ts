import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/core/services/Inventory/inventory.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-update-bridge',
  templateUrl: './update-bridge.component.html',
  styleUrls: ['./update-bridge.component.scss'],
})
export class UpdateBridgeComponent implements OnInit {
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
  inventoryData: any;
  areabottommg() {
    this.mgareabottom = this.lspan * this.mgwidth;
  }
  insertPayload: any;

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
    this.setUpdateData();
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

  setUpdateData() {
    let id: any = window.history.state.data.id;
    if (id === null) {
      this._router.navigate(['dashboard/inventory/bridge-list']);
    }
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'S',
      id: id,
    };

    console.log(payload);
    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    // console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.inventory
      .submitInventory(encryptedPayload)
      .subscribe((response: any) => {
        if (response.ResponseCode === '0') {
          let data = this.encrypt.decryptionAES(response.ResponseData);
          this.inventoryData = JSON.parse(data);
          console.log('inventory data', JSON.parse(data));
          // this.status.setValue(inventoryData.status);
          this.ProjectID = this.inventoryData.projectid;
          this.BUID = this.inventoryData.bridgeid;
          this.typeoffoundationvalue = this.inventoryData.data.typeoffoundation;
          this.typeofsubstructurevalue =
            this.inventoryData.data.typeofsubstructure;
          this.typeofsuperstructurevalue =
            this.inventoryData.data.typeofsuperstructure;
          this.typeofbearingvalue = this.inventoryData.data.typeofbearing;
          this.typeofexpansionjointvalue =
            this.inventoryData.data.typeofexpansionjoint;
          this.typeofwearingcoarsevalue =
            this.inventoryData.data.typeofwearingcoars;
          this.typeofrailingvalue = this.inventoryData.data.typeofrailing;
          this.lspan = this.inventoryData.data.lengthofspan;
          this.wspan = this.inventoryData.data.widthofspan;
          this.mgnospan = this.inventoryData.data.noofmaingirderinaspan;
          this.nobearing = this.inventoryData.data.noofbearinginspan;
          this.nopile = this.inventoryData.data.noofpile;
          this.diapile = this.inventoryData.data.diaofpile;
          this.mgdepth = this.inventoryData.data.maingirder.depth;
          this.mgwidth = this.inventoryData.data.maingirder.width;
          this.mgareabottom = this.inventoryData.data.maingirder.areabottom;
          this.mgareaside = this.inventoryData.data.maingirder.areaside;
          this.mgvolume = this.inventoryData.data.maingirder.volume;
          this.tsiwidth = this.inventoryData.data.topslabinterior.width;
          this.tsinoportion =
            this.inventoryData.data.topslabinterior.noofportions;
          this.tsithickness = this.inventoryData.data.topslabinterior.thickness;
          this.tsiarea = this.inventoryData.data.topslabinterior.area;
          this.tsivolume = this.inventoryData.data.topslabinterior.volume;
          this.tscwidth = this.inventoryData.data.topslabcantilever.width;
          this.tscnop = this.inventoryData.data.topslabcantilever.noofportions;
          this.tscthickness =
            this.inventoryData.data.topslabcantilever.thickness;
          this.tscarea = this.inventoryData.data.topslabcantilever.area;
          this.tscvolume = this.inventoryData.data.topslabcantilever.volume;
          this.CGWidth = this.inventoryData.data.crossgirder.width;
          this.CGDepth = this.inventoryData.data.crossgirder.depth;
          this.CGLength = this.inventoryData.data.crossgirder.length;
          this.CGAreaBottom = this.inventoryData.data.crossgirder.areaofbottom;
          this.CGAreaSide = this.inventoryData.data.crossgirder.areaofside;
          this.CGVolume = this.inventoryData.data.crossgirder.volume;
          this.CGNumber = this.inventoryData.data.crossgirder.noofcrossgirders;
          this.LVVolume =
            this.inventoryData.data.lowviscositygrout.maingrinders.volume;
          this.LVPorosity =
            this.inventoryData.data.lowviscositygrout.maingrinders.porosity;
          this.LVPorousVolume =
            this.inventoryData.data.lowviscositygrout.maingrinders.porousvolume;
          this.LVPercentVolume =
            this.inventoryData.data.lowviscositygrout.maingrinders.pcofporousvolfilled;
          this.LVNetVolume =
            this.inventoryData.data.lowviscositygrout.maingrinders.netvolumetobefilled;
          this.LVGrout =
            this.inventoryData.data.lowviscositygrout.maingrinders.groutingtobedonepc;
          this.LVTotalVolume =
            this.inventoryData.data.lowviscositygrout.maingrinders.totalvoltobefilled;
          this.LVTspecificGravity =
            this.inventoryData.data.lowviscositygrout.maingrinders.specificgravity;
          this.LVTotalVolumeGirder =
            this.inventoryData.data.lowviscositygrout.maingrinders.totalvolumeinltr;
          this.PMCGNetVolume =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.netvolumetobefilled;
          this.PMCGPorousPercent =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.pcofporousvolfilled;
          this.PMCGPorosity =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.porosity;
          this.PMCGPorousVolume =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.porousvolume;
          this.PMCGTotalVolume =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.totalvoltobefilled;
          this.PMCGVolume =
            this.inventoryData.data.polymermodifiedcementgrout.crossgirders.volumeofacrossgirder;
          this.PMTSIVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.volumeoftopslab;
          this.PMTSIPorousity =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.porosity;
          this.PMTSIPorousVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.porousvolume;
          this.PMTSIPorousPercent =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.pcofporousvolfilled;
          this.PMTSINetVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.netvolumetobefilled;
          this.PMTSITotalVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabinterior.totalvoltobefilled;
          this.PMTSCVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.volumeoftopslab;
          this.PMTSCPorousity =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.porosity;
          this.PMTSCPorousVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.porousvolume;
          this.PMTSCPorousPercent =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.pcofporousvolfilled;
          this.PMTSCNetVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.netvolumetobefilled;
          this.PMTSCTotalVolume =
            this.inventoryData.data.polymermodifiedcementgrout.topslabcantilever.totalvoltobefilled;
          this.pierVolume =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.volumeofpiercap;
          this.NoPierCap =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.noofpiercap;
          this.GroutedNoPierCap =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.noofpiercaptobegrouted;
          this.pierCapTotalVolume =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.noofpiercap;
          this.pierCapPorosity =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.porosity;
          this.pierCapPorousVolume =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.porousvolume;
          this.pierCapPercentPorous =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.pcofporousvolfilled;
          this.pierCapNetVolume =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.netvolumetobefilled;
          this.pierCapTotalVolumeOfGrout =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.totalvolofpiercap;
          this.pierCapVolume =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.volumeofpiercap;
          this.totalpmcgroutbyweight =
            this.inventoryData.data.polymermodifiedcementgrout.piercap.noofpiercap;
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
    this.inventoryData.status = event.value ? '0' : '1';
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
          this.dialog.open(DaidailogeComponent, {
            width: '550px',
            data: { message: response.ResponseDesc },
          });
        }
      });
  }
}
