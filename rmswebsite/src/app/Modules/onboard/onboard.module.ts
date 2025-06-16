import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { TermsConditionPageComponent } from './terms-condition-page/terms-condition-page.component';
import { CustomerregformComponent } from './customerregform/customerregform.component';
import { DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { ViewcustomerregformComponent } from './viewcustomerregform/viewcustomerregform.component';
import { DxoDataSourceModule } from 'devextreme-angular/ui/nested';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { FocrechangepasswordComponent } from './focrechangepassword/focrechangepassword.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotpasswordComponent, TermsConditionPageComponent, CustomerregformComponent, ViewcustomerregformComponent, UnauthorizedComponent, FocrechangepasswordComponent, ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    DxFormModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxoDataSourceModule,
    DxNumberBoxModule ,
    DxDateBoxModule,
    DxDropDownBoxModule,

    //ng-container,
  ],
})
export class OnboardModule {}
