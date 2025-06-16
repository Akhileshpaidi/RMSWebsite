import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CareateUpdateProductComponent } from './createUpdateProduct/careate-update-product/careate-update-product.component';
import { ProductListComponent } from './productList/product-list/product-list.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductComponent,
    CareateUpdateProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    // ProductRoutingModule
  ]
})
export class ProductModule { }
