import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) { }
  errorSubject = new Subject<any>(); // any can be replaced by the error resp JSON Type


  // Inventory summary
  InventorySummary(body: any) {
    return this.http.post(`${BASE_URL}/Inventory/InventorySummary`, body);
  }

  // Submit Inventory

  submitInventory(body: any) {
    return this.http.post(`${BASE_URL}/Inventory/CRUDInventory`, body);
  }

  getAllMaster(body:any){
    return this.http.post(`${BASE_URL}/Masters/AllMasters`, body);
  }

  getAddonMasters(body:any){
    return this.http.post(`${BASE_URL}/Masters/AddOnBridgeMasters`, body);
  }

  getBUID(body:any){
    return this.http.post(`${BASE_URL}/Masters/BridgeForInventory`, body);
  }
}
