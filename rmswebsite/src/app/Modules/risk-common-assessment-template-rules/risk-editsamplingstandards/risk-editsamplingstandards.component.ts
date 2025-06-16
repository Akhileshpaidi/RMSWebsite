import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder,FormControl ,Validators} from '@angular/forms';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// Import other necessary modules...
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-risk-editsamplingstandards',
  templateUrl: './risk-editsamplingstandards.component.html',
  styleUrls: ['./risk-editsamplingstandards.component.scss']
})
export class RiskEditsamplingstandardsComponent {
  isGridBoxOpened: boolean;
  sample:any;
  samplingdata:any;
 // isGridBoxOpened:boolean;

 selectedValue:any;
 selectedIDs:any;
  selectedOption1:any[] =[];
  Frequencycontrol:any;
  KeyControlsVisible:boolean=false;
  NONKeyControlsVisible:boolean=false;
  GeneralControlsvisible:boolean=false;
  gridColumns: any[] = [
    { dataField: 'samplingAuthority', caption: 'Sampling Authority Name'},
    { dataField: 'risk_admin_frqcontrapplidname', caption: 'Frequency Control Name' },];

  start:any = 1;
  end:any =  999999999999999;
  format = (value: unknown) => `${value}`;
  start1:any = 1;
  format1 = (value: number | Date): string => `${value}%`;

  nonkeystart:any = 1;
  nonkeyend:any =  999999999999999;
  nonkeyformat = (value: unknown) => `${value}`;
  nonkeystart1:any = 1;
  nonkeyformat1 = (value: number | Date): string => `${value}%`;



  genericstart:any = 1;
  genericend:any =  999999999999999;
  genericformat = (value: unknown) => `${value}`;
  genericstart1:any = 1;
  genericformat1 = (value: number | Date): string => `${value}%`;


  constructor(private fb:FormBuilder,private http: HttpClient,public dialog: MatDialog, private router: Router,   private ref: ChangeDetectorRef,){
    this.isGridBoxOpened = false;
  }

  ngOnInit(): void{
    //this.isGridBoxOpened = false;
    
    this.sample = this.fb.group({
      nameofsampling:['',Validators.required],
      Frequencycontrol:['',Validators.required],

      first: this.fb.group({
      startValue :['', this.KeyControlsVisible ? Validators.required : []],
      endValues:['', this.KeyControlsVisible ? Validators.required : []],
      keycontroltranscationDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      rangestartValue:['', this.KeyControlsVisible ? Validators.required : []],
      keycontrolpercantageDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      keycontroltextDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
    }),
    second: this.fb.group({
      nonkeystartValue :['', this.KeyControlsVisible ? Validators.required : []],
      nonkeyendValues:['', this.KeyControlsVisible ? Validators.required : []],
      NoncontroltranscationDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      nonkeyrangestartValue:['', this.KeyControlsVisible ? Validators.required : []],
      nonkeycontrolpercantageDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      nonkeykeycontroltextDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
    }),
    third: this.fb.group({
      genericstartValue :['', this.KeyControlsVisible ? Validators.required : []],
      genericendValues:['', this.KeyControlsVisible ? Validators.required : []],
      generictranscationDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      genericrangestartValue:['', this.KeyControlsVisible ? Validators.required : []],
      genericpercantageDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
      generictextDescsampling:['', this.KeyControlsVisible ? Validators.required : []],
    }),
    })
    this.Frequencycontrol ={
      store: new CustomStore({
        key: 'risk_admin_frqcontrapplidid',
        loadMode: 'raw',
        load:()=>{return new Promise((resolve, reject) => {
          this.http.get(URL + '/FrequencyOfControlApplied/Getrisk_admin_frqcontrapplid', {headers})
            .subscribe(res => {
             (resolve(res));
      
            }, (err) => {
              reject(err);
            });
      });
      },
      }),
      };

      this.samplingdata ={
        store: new CustomStore({
          key: 'risksamplingstandardsId',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get(URL + '/risksamplingstandards/Getrisksamplingstandards', {headers})
              .subscribe(res => {
               (resolve(res));
        
              }, (err) => {
                reject(err);
              });
        });
        },
        }),
        };
  }
  getUpdateFormData(event:any){

    console.log("selected Type id: ", event.value);
  //  this.isGridBoxOpened = false;
  this.isGridBoxOpened = false;
    const data:any=event.value;
  
    this.selectedValue=event.value; 
  
        this.http.get(URL+'/risksamplingstandards/Getrisksamplingstandardsbyid/'+data).subscribe((data:any)=>{
          if (Array.isArray(data) && data.length > 0) {
           
            const PubList:any = data[0]; 
         
            console.log(PubList)
          this.sample.controls['nameofsampling'].setValue(PubList.samplingAuthority);
          this.sample.controls['Frequencycontrol'].setValue(PubList.risk_admin_frqcontrapplidid);

          if(PubList.keyControlscheckedstatus == true){
            this.KeyControlsVisible = true;
          this.sample.get('first.startValue')?.setValue(PubList.keyControlsstartValue);
          this.sample.get('first.endValues')?.setValue(parseInt(PubList.keyControlsendValue));
          this.sample.get('first.keycontroltranscationDescsampling')?.setValue(PubList.keyControlstransactionDescription);
          this.sample.get('first.rangestartValue')?.setValue(parseInt(PubList.keyControlsrangeStartValue));
          this.sample.get('first.keycontrolpercantageDescsampling')?.setValue(PubList.keyControlspercentageDescription);
          this.sample.get('first.keycontroltextDescsampling')?.setValue(PubList.keyControlstextDescription);
          }else{
            this.KeyControlsVisible = false;
            this.sample.get('first.startValue')?.setValue(PubList.keyControlsstartValue);
            this.sample.get('first.endValues')?.setValue(parseInt(PubList.keyControlsendValue));
            this.sample.get('first.keycontroltranscationDescsampling')?.setValue(PubList.keyControlstransactionDescription);
            this.sample.get('first.rangestartValue')?.setValue(parseInt(PubList.keyControlsrangeStartValue));
            this.sample.get('first.keycontrolpercantageDescsampling')?.setValue(PubList.keyControlspercentageDescription);
            this.sample.get('first.keycontroltextDescsampling')?.setValue(PubList.keyControlstextDescription);
          }
          // Bind values for controls in 'second' form group
          
          if(PubList.NONKeyControlsVisible == true){
            this.NONKeyControlsVisible = true;
          this.sample.get('second.nonkeystartValue')?.setValue(PubList.nonKeyControlsstartValue);
          this.sample.get('second.nonkeyendValues')?.setValue(parseInt(PubList.nonKeyControlsendValue));
          this.sample.get('second.NoncontroltranscationDescsampling')?.setValue(PubList.nonKeyControlstransactionDescription);
          this.sample.get('second.nonkeyrangestartValue')?.setValue(parseInt(PubList.nonKeyControlsrangeStartValue));
          this.sample.get('second.nonkeycontrolpercantageDescsampling')?.setValue(PubList.nonKeyControlspercentageDescription);
          this.sample.get('second.nonkeykeycontroltextDescsampling')?.setValue(PubList.nonKeyControlstextDescription);
        }else{
         
          this.NONKeyControlsVisible = false;
          this.sample.get('second.nonkeystartValue')?.setValue(PubList.nonKeyControlsstartValue);
          this.sample.get('second.nonkeyendValues')?.setValue(parseInt(PubList.nonKeyControlsendValue));
          this.sample.get('second.NoncontroltranscationDescsampling')?.setValue(PubList.nonKeyControlstransactionDescription);
          this.sample.get('second.nonkeyrangestartValue')?.setValue(parseInt(PubList.nonKeyControlsrangeStartValue));
          this.sample.get('second.nonkeycontrolpercantageDescsampling')?.setValue(PubList.nonKeyControlspercentageDescription);
          this.sample.get('second.nonkeykeycontroltextDescsampling')?.setValue(PubList.nonKeyControlstextDescription);
        }
          // Bind values for controls in 'third' form group
          if(PubList.GeneralControlsvisible == true){
            this.GeneralControlsvisible = true;
          this.sample.get('third.genericstartValue')?.setValue(PubList.generalControlsstartValue);
          this.sample.get('third.genericendValues')?.setValue(parseInt(PubList.generalControlsendValue));
          this.sample.get('third.generictranscationDescsampling')?.setValue(PubList.generalControlstransactionDescription);
          this.sample.get('third.genericrangestartValue')?.setValue(parseInt(PubList.generalControlsstartValue));
          this.sample.get('third.genericpercantageDescsampling')?.setValue(PubList.generalControlspercentageDescription);
          this.sample.get('third.generictextDescsampling')?.setValue(PubList.generalControlstextDescription);
        }else{  this.GeneralControlsvisible = false;
          this.sample.get('third.genericstartValue')?.setValue(PubList.generalControlsstartValue);
          this.sample.get('third.genericendValues')?.setValue(parseInt(PubList.generalControlsendValue));
          this.sample.get('third.generictranscationDescsampling')?.setValue(PubList.generalControlstransactionDescription);
          this.sample.get('third.genericrangestartValue')?.setValue(parseInt(PubList.generalControlsstartValue));
          this.sample.get('third.genericpercantageDescsampling')?.setValue(PubList.generalControlspercentageDescription);
          this.sample.get('third.generictextDescsampling')?.setValue(PubList.generalControlstextDescription);
        }
       //   this.selectedIDs = PubList.unitlocationid;
  
          // Fetch unitlocationid based on entity selection
         // this.fetchUnitLocationId(PubList.entityid);
        //  this.ref.detectChanges();
        
      } else {
        // Data is either not an array or it's empty
        // Handle this case as needed
      }
  
        })
      }    
  onEscaltion(event:any){
    console.log('Checkbox:', event.target.checked);
    this.KeyControlsVisible = event.target.checked;
    this.KeyControlsVisibleValidatorsa();
    //  const EscalationStatus = event.target.checked ? 1 : 0;
    //  this.Notifier.get('EscalationStatus')?.setValue(EscalationStatus);
  }
  onNotifiers(event:any){
    this.NONKeyControlsVisible = event.target.checked;
    this.NONKeyControlsVisibleValidations(); 
  }
  onAdditional (event:any){
    this.GeneralControlsvisible = event.target.checked;
    this.GeneralControlsvisibleValidations(); 
    this.updateValidators();
  }
  KeyControlsVisibleValidatorsa(){
    if (this.KeyControlsVisible) {
      (this.sample.get('startValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('endValues') as FormControl).setValidators([Validators.required]);
      (this.sample.get('keycontroltranscationDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('rangestartValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('keycontrolpercantageDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('keycontroltextDescsampling') as FormControl).setValidators([Validators.required]);

    } else {
      (this.sample.get('startValue') as FormControl).clearValidators();
      (this.sample.get('endValues') as FormControl).clearValidators();
      (this.sample.get('keycontroltranscationDescsampling') as FormControl).clearValidators();
      (this.sample.get('rangestartValue') as FormControl).clearValidators();
      (this.sample.get('keycontrolpercantageDescsampling') as FormControl).clearValidators();
      (this.sample.get('keycontroltextDescsampling') as FormControl).clearValidators();

    }
   // (this.sample.get('startValue') as FormControl).updateValueAndValidity();
   // (this.sample.get('endValues') as FormControl).updateValueAndValidity();
    (this.sample.get('startValue') as FormControl).updateValueAndValidity();
    (this.sample.get('endValues') as FormControl).updateValueAndValidity();
    (this.sample.get('keycontroltranscationDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('rangestartValue') as FormControl).updateValueAndValidity();
    (this.sample.get('keycontrolpercantageDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('keycontroltextDescsampling') as FormControl).updateValueAndValidity();
  }
  NONKeyControlsVisibleValidations(){
    if (this.NONKeyControlsVisible) {
      (this.sample.get('nonkeystartValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('nonkeyendValues') as FormControl).setValidators([Validators.required]);
      (this.sample.get('NoncontroltranscationDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('nonkeyrangestartValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('nonkeycontrolpercantageDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('nonkeykeycontroltextDescsampling') as FormControl).setValidators([Validators.required]);

    } else {
      (this.sample.get('nonkeystartValue') as FormControl).clearValidators();
      (this.sample.get('nonkeyendValues') as FormControl).clearValidators();
      (this.sample.get('NoncontroltranscationDescsampling') as FormControl).clearValidators();
      
      (this.sample.get('nonkeyrangestartValue') as FormControl).clearValidators();
      (this.sample.get('nonkeycontrolpercantageDescsampling') as FormControl).clearValidators();
      (this.sample.get('nonkeykeycontroltextDescsampling') as FormControl).clearValidators();

    }
   // (this.sample.get('startValue') as FormControl).updateValueAndValidity();
   // (this.sample.get('endValues') as FormControl).updateValueAndValidity();
   (this.sample.get('nonkeystartValue') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeyendValues') as FormControl).updateValueAndValidity();
    (this.sample.get('keycontroltranscationDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeyrangestartValue') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeycontrolpercantageDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeykeycontroltextDescsampling') as FormControl).updateValueAndValidity();
  }
  GeneralControlsvisibleValidations(){
    if (this.NONKeyControlsVisible) {
      (this.sample.get('genericstartValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('genericendValues') as FormControl).setValidators([Validators.required]);
      (this.sample.get('generictranscationDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('genericrangestartValue') as FormControl).setValidators([Validators.required]);
      (this.sample.get('genericpercantageDescsampling') as FormControl).setValidators([Validators.required]);
      (this.sample.get('generictextDescsampling') as FormControl).setValidators([Validators.required]);

    } else {
      (this.sample.get('genericstartValue') as FormControl).clearValidators();
      (this.sample.get('genericendValues') as FormControl).clearValidators();
      (this.sample.get('generictranscationDescsampling') as FormControl).clearValidators();
      
      (this.sample.get('genericrangestartValue') as FormControl).clearValidators();
      (this.sample.get('genericpercantageDescsampling') as FormControl).clearValidators();
      (this.sample.get('generictextDescsampling') as FormControl).clearValidators();

    }
   // (this.sample.get('startValue') as FormControl).updateValueAndValidity();
   // (this.sample.get('endValues') as FormControl).updateValueAndValidity();
   (this.sample.get('nonkeystartValue') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeyendValues') as FormControl).updateValueAndValidity();
    (this.sample.get('keycontroltranscationDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeyrangestartValue') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeycontrolpercantageDescsampling') as FormControl).updateValueAndValidity();
    (this.sample.get('nonkeykeycontroltextDescsampling') as FormControl).updateValueAndValidity();
 

  }
  updateValidators() {
    // Apply validators based on checkbox selections
    this.toggleFieldValidators('first', this.KeyControlsVisible);
    this.toggleFieldValidators('second', this.NONKeyControlsVisible);
    this.toggleFieldValidators('third', this.GeneralControlsvisible);
  }
  toggleFieldValidators(groupName: string, isVisible: boolean) {
    const group = this.sample.get(groupName) as any;
    for (let control in group.controls) {
      if (isVisible) {
        group.get(control).setValidators([Validators.required]);
      } else {
        group.get(control).clearValidators();
      }
      group.get(control).updateValueAndValidity();
    }
  }
  updateUser(): void{
    if (!this.KeyControlsVisible && !this.NONKeyControlsVisible && !this.GeneralControlsvisible) {
      alert('Please select at least one control type checkbox.');
      return;
    }

    if (this.sample.invalid) {
      alert('Form is invalid! Please fill in all required fields.');
      console.log('Form validation errors:', this.sample.errors);
      return;
    }

    // Validate that at least one control type has data
  const isKeyControlFilled = this.KeyControlsVisible && (
    this.sample.get('first.startValue')?.value ||
    this.sample.get('first.endValues')?.value ||
    this.sample.get('first.keycontroltranscationDescsampling')?.value ||
    this.sample.get('first.rangestartValue')?.value ||
    this.sample.get('first.keycontrolpercantageDescsampling')?.value ||
    this.sample.get('first.keycontroltextDescsampling')?.value
  );

  const isNonKeyControlFilled = this.NONKeyControlsVisible && (
    this.sample.get('second.nonkeystartValue')?.value ||
    this.sample.get('second.nonkeyendValues')?.value ||
    this.sample.get('second.NoncontroltranscationDescsampling')?.value ||
    this.sample.get('second.nonkeyrangestartValue')?.value ||
    this.sample.get('second.nonkeycontrolpercantageDescsampling')?.value ||
    this.sample.get('second.nonkeykeycontroltextDescsampling')?.value
  );

  const isGeneralControlFilled = this.GeneralControlsvisible && (
    this.sample.get('third.genericstartValue')?.value ||
    this.sample.get('third.genericendValues')?.value ||
    this.sample.get('third.generictranscationDescsampling')?.value ||
    this.sample.get('third.genericrangestartValue')?.value ||
    this.sample.get('third.genericpercantageDescsampling')?.value ||
    this.sample.get('third.generictextDescsampling')?.value
  );

  if (!isKeyControlFilled && !isNonKeyControlFilled && !isGeneralControlFilled) {
    alert('Please fill data for at least one control type (Key, Non-Key, or General Control) before submitting.');
    return;
  }
  this.http.get(URL + '/risksamplingstandards/Getrisksamplingstandardsbyid/' + this.selectedValue).subscribe((response: any) => {
    console.log('API Response:', response);
  alert (JSON.stringify(response) )
      const risksamplingstandardsId =   response[0].risksamplingstandardsId;
    const dataToSend: any = {
      risksamplingstandardsId:risksamplingstandardsId,
      samplingAuthority: this.sample.get('nameofsampling')?.value,
      frequencyControl: this.sample.get('Frequencycontrol')?.value,
    };
  
    // Add key control data if visible
    if (this.KeyControlsVisible) {
      dataToSend.keyControls = {
        controltype :'Key Control',
        risksamplingstandardsId:risksamplingstandardsId,
        keyControlsstartValue: this.sample.get('first.startValue').value,
        keyControlsendValue: this.sample.get('first.endValues').value,
        keyControlstransactionDescription: this.sample.get('first.keycontroltranscationDescsampling').value,
        keyControlsrangeStartValue: this.sample.get('first.rangestartValue').value,
        keyControlspercentageDescription: this.sample.get('first.keycontrolpercantageDescsampling').value,
        keyControlstextDescription: this.sample.get('first.keycontroltextDescsampling').value,
      };
    }
  
    // Add non-key control data if visible
    if (this.NONKeyControlsVisible) {
      dataToSend.nonKeyControls = {
        noncontroltype :' Non-Key Control',
        risksamplingstandardsId:risksamplingstandardsId,
        nonKeyControlsstartValue: this.sample.get('second.nonkeystartValue')?.value,
        nonKeyControlsendValue: this.sample.get('second.nonkeyendValues')?.value,
        nonKeyControlstransactionDescription: this.sample.get('second.NoncontroltranscationDescsampling')?.value,
        nonKeyControlsrangeStartValue: this.sample.get('second.nonkeyrangestartValue')?.value,
        nonKeyControlspercentageDescription: this.sample.get('second.nonkeycontrolpercantageDescsampling')?.value,
        nonKeyControlstextDescription: this.sample.get('second.nonkeykeycontroltextDescsampling')?.value,
      };
    }
  
    // Add general control data if visible
    if (this.GeneralControlsvisible) {
      dataToSend.generalControls = {
        gencontroltype :'General Control',
        risksamplingstandardsId:risksamplingstandardsId,
        generalControlsstartValue: this.sample.get('third.genericstartValue')?.value,
        generalControlsendValue: this.sample.get('third.genericendValues')?.value,
        generalControlstransactionDescription: this.sample.get('third.generictranscationDescsampling')?.value,
        generalControlsrangeStartValue: this.sample.get('third.genericrangestartValue')?.value,
        generalControlspercentageDescription: this.sample.get('third.genericpercantageDescsampling')?.value,
        generalControlstextDescription: this.sample.get('third.generictextDescsampling')?.value,
      };
    }

alert(JSON.stringify(dataToSend))
console.log(dataToSend);
  
    this.http.post(URL + '/risksamplingstandards/Updaterisksamplingstandards/',dataToSend, { headers })
    .subscribe({
      next: (response: any) => {
        console.log(response, 'response');
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: "Data Updated Successfully" },
        });
        this.sample.reset();
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
  });
}
  Cancel(): void{
    this.reloadComponent();
  }
  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
    }

}

