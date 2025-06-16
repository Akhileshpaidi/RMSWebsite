import { Injectable } from '@angular/core';
import { BASE_URL } from '../../Constant/apiConstant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // getProductList
  productSummary(body: any) {
    return this.http.post(`${BASE_URL}/Masters/MaterialPriceSummary`, body);
  }

  // CRUDProduct
  CRUDProduct(body: any) {
    return this.http.post(`${BASE_URL}/Masters/CRUDMaterialPrice`, body);
  }

}
