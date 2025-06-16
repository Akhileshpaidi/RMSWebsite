import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-careate-update-product',
  templateUrl: './careate-update-product.component.html',
  styleUrls: ['./careate-update-product.component.scss']
})
export class CareateUpdateProductComponent {
  createProductForm!: FormGroup;
  authid: any;
  sessionData: any;
  erroMessage: any;
  productData: any;
  dropDownList: any;
  selected: any = 30;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private session: SessionService,
    private encrypt: EncryptionService,
    private product: ProductService,
    private router: Router,
  ) {
    this.productData = window.history.state.data;
    if(this.productData){
      this.selected =  this.productData.id;
    }
  }

  getDropDownList =() => {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
      mode: "S",
      status: "0"
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.product.CRUDProduct(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');

      if (response.ResponseCode === '0') {
        let material:any = this.encrypt.decryptionAES(response.ResponseData);

        this.dropDownList = JSON.parse(material);
        if(this.productData) {
          const defaultSelection = this.dropDownList.material.find((x: any) => x.manufacturerid === this.productData.manufacturerid);
          this.createProductForm.get('manufacturername')?.patchValue(defaultSelection.manufacturerid.toString());  
        }
        console.log(this.dropDownList.material, 'data');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  ngOnInit() {
    this.createProductForm = this.fb.group({
      name: this.productData ? this.productData.name: '',
      manufacturername: '',
      unitprice: this.productData ? this.productData.unitprice: '',
      description: this.productData ? this.productData.description: ''
    });
    this.getDropDownList();
  }

  showInvalidFieldsAlert() {
    let invalidFields = '';    

    if (this.createProductForm.controls['name'].invalid) {
      invalidFields += '- Product Name\n';
    }

    if (this.createProductForm.controls['manufacturername'].invalid) {
      invalidFields += '- Manufacturer Name\n';
    }
    if (this.createProductForm.controls['unitprice'].invalid) {
      invalidFields += '- Unit Price\n';
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

  createUpdateProduct(data: any) {

    if (this.createProductForm.invalid) {
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
      id: this.productData? this.productData?.id : "0",
      manufacturerid: data.manufacturername,
      description: data.description,
      unitrate: data.unitprice,
      mode: this.productData? "U" : "I",
	    status: this.productData? this.productData.status :"0" 
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };
    console.log('encryptedPayload', encryptedPayload);

    // Calling Api
    this.product.CRUDProduct(encryptedPayload).subscribe((response: any) => {
      console.log('response', response);
      if (response.ResponseCode === '0') {
        this.erroMessage = response.ResponseDesc;
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.router.navigate(['dashboard/manufacturer/product-list']);
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  Cancel(){
    this.router.navigate(['/dashboard/manufacturer/product-list']);
  }
}
