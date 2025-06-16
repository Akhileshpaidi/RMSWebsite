import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generation-of-ecompliance-certificate',
  templateUrl: './generation-of-ecompliance-certificate.component.html',
  styleUrls: ['./generation-of-ecompliance-certificate.component.scss']
})
export class GenerationOfEcomplianceCertificateComponent {
  public selectedOption=[{
    
  }];
  public dropdownOptions = [
    { label: 'Neemus', value: 'Neemus' },
    { label: 'Wipro', value: 'Wipro' },
    { label: 'Tech.M', value: 'Tech.M' }
  ];

  selectedOption1: string = this.dropdownOptions[0].value;
  public dropdownOptions1 = [
    { label: 'HR', value: 'HR' },
    { label: 'IT', value: 'IT' },
    { label: 'Finance', value: 'Finance' }
  ];
  

  selectedOption2: string = this.dropdownOptions1[0].value;
  public dropdownOptions2 = [
    { label: 'HR', value: 'HR' },
    { label: 'IT', value: 'IT' },
    { label: 'Finance', value: 'Finance' }
  ];
  selectedOption3: string = this.dropdownOptions2[0].value;
 
  public dropdownOptions4 = [
    { label: 'HR', value: 'HR' },
    { label: 'IT', value: 'IT' },
    { label: 'Finance', value: 'Finance' }
  ];
  formdata1=new FormGroup({
    
  })
  selectedOption5: string = this.dropdownOptions4[0].value;
  formdata=new FormGroup({
    typeofcompliancecertificate:new FormControl('Overview',[Validators.required]),
    Selectdate:new FormControl('',[Validators.required]),
    EtrRecidetails:new FormControl('',[Validators.required]),
    CertificateAddress:new FormControl('',[Validators.required,Validators.minLength(3)]),
    nameofcompany:new FormControl('',[Validators.required]),
    Addressline1:new FormControl('',[Validators.required]),
    Addressline2:new FormControl('',[Validators.required]),
    Addressline3:new FormControl('',[Validators.required]),
    Selectcompany:new FormControl('',[Validators.required]),
    selectdept:new FormControl('',[Validators.required]),
    stageofcompliance:new FormControl('',[Validators.required]),
    fromdate:new FormControl('',[Validators.required]),
    todate:new FormControl('',[Validators.required]),
    riskcategory:new FormControl('',[Validators.required]),

  });
  handleonsubmit(){
    console.log(this.formdata.value)
  }
  get f(){
    return this.formdata.controls;
  }
  myForm=new FormGroup({
    firstName:new FormControl('Overview',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    Phone:new FormControl('',[Validators.required]),
    Address:new FormControl('',[Validators.required]),
  });
  onSubmit(){
    console.log(this.myForm.value)
  }
  formatDate(event: any): void {
    // Assuming the input value is a string in the format yyyy-mm-dd
    const formattedDate = this.formatDateToDDMMYYYY(event.target.value);
    event.target.value = formattedDate;
  }

  formatDateToDDMMYYYY(dateString: string): string {
    const [day, month,year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
}
