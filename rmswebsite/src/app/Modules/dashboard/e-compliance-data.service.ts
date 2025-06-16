import { Injectable } from '@angular/core';
import { EncryptionService } from 'src/app/core/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class EComplianceDataService {

  private complianceData: any;

  constructor(  private encrypt: EncryptionService) {}

  setRequestToRemediationData(data: any){
    const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
    localStorage.setItem('RTRCcomplianceData', encryptedData);
  }  
  getRequestToRemediationData(){
      const encryptedData = localStorage.getItem('RTRCcomplianceData');
      if (encryptedData) {
        try {
          const decryptedData = this.encrypt.decryptionAES(encryptedData);
          this.complianceData = JSON.parse(decryptedData);
        } catch (error) {
          console.error('Error decrypting data:', error);
          return null;
        }
      }
    return this.complianceData;
  }
  setApproveToRemediationData(data: any){
    const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
    localStorage.setItem('ATRCcomplianceData', encryptedData);
  }  
  getApproveToRemediationData(){
      const encryptedData = localStorage.getItem('ATRCcomplianceData');
      if (encryptedData) {
        try {
          const decryptedData = this.encrypt.decryptionAES(encryptedData);
          this.complianceData = JSON.parse(decryptedData);
        } catch (error) {
          console.error('Error decrypting data:', error);
          return null;
        }
    }
    return this.complianceData;
  } 
   setUpdateMappingComplianceData(data: any){
    const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
    localStorage.setItem('UCcomplianceData', encryptedData);
  }  
  getUpdateMappingComplianceData(){
      const encryptedData = localStorage.getItem('UCcomplianceData');
      if (encryptedData) {
        try {
          const decryptedData = this.encrypt.decryptionAES(encryptedData);
          this.complianceData = JSON.parse(decryptedData);
        } catch (error) {
          console.error('Error decrypting data:', error);
          return null;
        }
    }
    return this.complianceData;
  }
  setReviewUpdateComplianceData(data: any){
   const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
   localStorage.setItem('RUCcomplianceData', encryptedData);
 }  
 getReviewUpdateComplianceData(){
    const encryptedData = localStorage.getItem('RUCcomplianceData');
    if (encryptedData) {
      try {
        const decryptedData = this.encrypt.decryptionAES(encryptedData);
        this.complianceData = JSON.parse(decryptedData);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
  }
   return this.complianceData;
  }
  setApproverUpdateComplianceData(data: any){
    const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
    localStorage.setItem('ARCcomplianceData', encryptedData);
  }  
  getApproverUpdateComplianceData(){
      const encryptedData = localStorage.getItem('ARCcomplianceData');
      if (encryptedData) {
        try {
          const decryptedData = this.encrypt.decryptionAES(encryptedData);
          this.complianceData = JSON.parse(decryptedData);
        } catch (error) {
          console.error('Error decrypting data:', error);
          return null;
        }
    }
    return this.complianceData;
   }
 setAuditUpdateComplianceData(data: any){
   const encryptedData = this.encrypt.encryptionAES(JSON.stringify(data));
   localStorage.setItem('AACcomplianceData', encryptedData);
 }  
 getAuditUpdateComplianceData(){
    const encryptedData = localStorage.getItem('AACcomplianceData');
    if (encryptedData) {
      try {
        const decryptedData = this.encrypt.decryptionAES(encryptedData);
        this.complianceData = JSON.parse(decryptedData);
      } catch (error) {
        console.error('Error decrypting data:', error);
        return null;
      }
  }
   return this.complianceData;
  }
  clearComplianceData() {
    this.complianceData = null;
  }
  
}
// private complianceDataKey = 'complianceData';

//   // Save data to localStorage
//   private saveToSessionStorage (data: any) {
//     sessionStorage .setItem(this.complianceDataKey, JSON.stringify(data));
//   }

//   // Get data from localStorage
//   private getFromLocalStorage() {
//     const storedData = localStorage.getItem(this.complianceDataKey);
//     return storedData ? JSON.parse(storedData) : null;
//   }

//   setRequestToRemediationData(data: any) {
//     this.saveToSessionStorage(data); 
//   }
//   getRequestToRemediationData() {
//     return this.getFromLocalStorage();
//   }

//   setApproveToRemediationData(data: any) {
//     this.saveToSessionStorage(data);
//   }
//   getApproveToRemediationData() {
//     return this.getFromLocalStorage();
//   }

//   setUpdateMappingComplianceData(data: any) {
//     this.saveToSessionStorage(data);
//   }
//   getUpdateMappingComplianceData() {
//     return this.getFromLocalStorage();
//   }

//   setReviewUpdateComplianceData(data: any) {
//     this.saveToSessionStorage(data);
//   }
//   getReviewUpdateComplianceData() {
//     return this.getFromLocalStorage();
//   }

//   setApproverUpdateComplianceData(data: any) {
//     this.saveToSessionStorage(data);
//   }
//   getApproverUpdateComplianceData() {
//     return this.getFromLocalStorage();
//   }

//   setAuditUpdateComplianceData(data: any) {
//     this.saveToSessionStorage(data);
//   }
//   getAuditUpdateComplianceData() {
//     return this.getFromLocalStorage();
//   }

//   clearComplianceData() {
//     sessionStorage .removeItem(this.complianceDataKey);
//   }
