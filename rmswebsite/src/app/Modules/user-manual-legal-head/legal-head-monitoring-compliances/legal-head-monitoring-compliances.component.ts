import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-legal-head-monitoring-compliances',
  templateUrl: './legal-head-monitoring-compliances.component.html',
  styleUrls: ['./legal-head-monitoring-compliances.component.scss']
})
export class LegalHeadMonitoringCompliancesComponent {


  public selectedOption=[{
    
  }];
 public dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  selectedOption1: string = this.dropdownOptions[0].value;


 
  formData= new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required])


  });
get f(){
  return this.formData.controls;
}
  onSubmit(){
    console.log(this.formData.value);
  }
  
    oncontactus(): void {
      // Specify the URL and other options for the new window
      const popupOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
  
      // Open a new window
      window.open('https://example.com', 'PopupWindow', popupOptions);
    }
    onreport():void{
      const popupOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
      window.open('',popupOptions );
    }
    onusermanual():void{
      const popupOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
      window.open('',popupOptions );
    }
    onecommerce(){
      const popupOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
      window.open('',popupOptions );
    }
    onlogout(){
      const popupOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
      window.open('',popupOptions );
    }



}
