import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { Subject ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  readonly apiUrl = 'http://localhost:18593/api/';
  constructor(private http: HttpClient) {}

  // getUserList
  roleSummary(body: any) {
    return this.http.post(`${BASE_URL}/Masters/RoleSummary`, body);
  }


    // getUserList
    roleFilter(body: any) {
      return this.http.post(`${BASE_URL}/Masters/RoleFilter`, body);
    }

  // CRUDRole
  InsertRole(body: any) {
    return this.http.post(this.apiUrl + 'RoleDetails/InsertRoleDetails', body);
  }
 
  CRUDRole(body: any) {
    return this.http.post(`${BASE_URL}/Masters/CRUDRole`, body);
  }

  // Dashboarddata
  Dashboarddata(body: any) {
    return this.http.post(`${BASE_URL}/Dashboard/Dashboarddata`, body);
  }
  // api/Documentmaster/GetDepositoryCount
  getDepositoryCount(fromDate: string, toDate: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDepositoryCount`, { params });
  }
  DepositoryCount(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDepositoryCount`);
  }
  getDraftStatusCount(fromDate: string, toDate: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDraftStatus`, { params });
  }
  DraftStatusCount(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDraftStatus`);
  }
  newlyaddedDoc(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetNewlyAddedDoc`);
  }
  getnewlyaddedDoc(formattedFromDate: string, formattedToDate: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', formattedFromDate)
      .set('toDate', formattedToDate);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetNewlyAddedDoc`, { params });
  }
  getTOnewlyaddedDoc(fromDate: string, toDate: string,userid:any): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTONewlyAddedDoc`, { params });
  }
  getdisabledDoc(fromDate: string, toDate: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisaleddoc`, { params });
  }
  disabledDoc(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDisaleddoc`);
  }
  getAllpublishedDoc(formattedFromDate: string, formattedToDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', formattedFromDate)
      .set('toDate', formattedToDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetAllPublishedDoc`, { params });
  }
  AllpublishedDoc(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetAllPublishedDoc`);
  }
  getDocSummaryCount(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocumentsSummary`, { params });
  }
  DocSummaryCount(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDocumentsSummary`);
  }
  getDocTypeData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocTypeData`, { params });
  }
  DocTypeData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDocTypeData`);
  }
  getDocCategoryData(DocTypeID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocCategoryData`, { params });
  }
  getDocSubCategoryData(DocCategoryID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocSubCategoryData`, { params });
  }
  getDocAuthorityData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocAuthoritydata`, { params });
  }
  DocAuthorityData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDocAuthoritydata`);
  }
  getRecentDocData(fromDate: string, toDate: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetRecentDocdata`, { params });
  }
  RecentDocData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetRecentDocdata`);
  }
  getDocConfidentialityData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDocConfidentiality`, { params });
  }
  getNatureofDocdata(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetNatureofDocdata`, { params });
  }
  getReadingTimedata(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetReadingTimedata`, { params });
  }

  // SavedDraft Data API
  getSavedDraftDocTypeData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetSavedDraftDocTypeData`, { params });
  }
  SavedDraftDocTypeData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetSavedDraftDocTypeData`);
  }
  getSavedDraftDocCategoryData(DocTypeID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetSavedDraftDocCategoryData`, { params });
  }
  getSavedDraftDocSubCategoryData(DocCategoryID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetSavedDraftDocSubCategoryData`, { params });
  }
  // SavedDraft Data API
  getDiscardedDraftDocTypeData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDiscardedDraftDocTypeData`, { params });
  }
  DiscardedDraftDocTypeData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDiscardedDraftDocTypeData`);
  }
  getDiscardedDraftDocCategoryData(DocTypeID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDiscardedDraftDocCategoryData`, { params });
  }
  getDiscardedDraftDocSubCategoryData(DocCategoryID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDiscardedDraftDocSubCategoryData`, { params });
  }
 
  getDisabledDocTypeData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledDocTypeData`, { params });
  }
  DisabledDocTypeData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDisabledDocTypeData`);
  }
  getDisabledDocCategoryData(DocTypeID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledDocCategoryData`, { params });
  }
  getDisabledDocSubCategoryData(DocCategoryID:string,fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledDocSubCategoryData`, { params });
  }
  getDisabledDocAuthorityData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledDocAuthoritydata`, { params });
  }
  DisabledDocAuthorityData(){
    return this.http.get(`${BASE_URL}/Documentmaster/GetDisabledDocAuthoritydata`);
  }
  getDisabledDocConfidentialityData(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledDocConfidentiality`, { params });
  }
  getDisabledNatureofDocdata(fromDate: string, toDate: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetDisabledNatureofDocdata`, { params });
  }
  TaskownerDepositoryCount(userid:string):Observable<any>{
    let params = new HttpParams()
      .set('userid',userid);
      return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDepositoryCount`, { params });
  }
  getTaskownerDepositoryCount(fromDate: string, toDate: string,userid:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid',userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDepositoryCount`, { params });
  }
  TaskownerAllpublishedDoc(userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerAllPublishedDoc`, { params });
  }
  getTaskownerAllpublishedDoc(fromDate: string, toDate: string,userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerAllPublishedDoc`, { params });
  }
  TaskownerDocSummaryCount(userid: string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocumentsSummary`, { params });
  }
  getTaskownerDocSummaryCount(fromDate: string, toDate: string,userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocumentsSummary`, { params });
  }
  //Home Newly Added
  TaskownerDocTypeDataNewCC(userid: string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days)
      .set('datetype',datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataNew`, { params });
  }
  //Newly Added
  getContentManagerDocTypeDataNew(fromDate: string, toDate: string,userid: string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetContentManagerDocTypeDataNew`, { params });
  }
  getContentManagerDocCategoryDataNew(DocTypeID:string,fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetContentManagerDocCategoryDataNew`, { params });
  }
  getContentManagerDocSubCategoryDataNew(DocCategoryID:string,fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetContentManagerDocSubCategoryDataNew`, { params });
  }
  getCMDocConfidentialityDataNew(fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocConfidentialityNew`, { params });
  }
  getCMDocAuthorityDataNew(fromDate: string, toDate: string,userid: string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocAuthoritydataNew`, { params });
  }
  getCMNatureofDocdataNew(fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMNatureofDocdataNew`, { params });
  }
  getCMReadingTimedataNew(fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMReadingTimedataNew`, { params });
  }
  CMAckReqSummary(userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMAckReqSummary`, { params });
  }
  getCMAckReqSummary(fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMAckReqSummary`, { params });
  }
  CMDocTypeDataAckreq(userid: string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocTypeDataAckreq`, { params });
  }
  getCMDocTypeDataAckreq(fromDate: string, toDate: string,userid: string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocTypeDataAckreq`, { params });
  }
  getCMDocCategoryDataAckreq(DocTypeID:string,fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocCategoryDataAckreq`, { params });
  }
  getCMDocSubCategoryDataAckreq(DocCategoryID:string,fromDate: string, toDate: string,userid:string,days:number,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetCMDocSubCategoryDataAckreq`, { params });
  }

  //Newly Added Doc Content Manager
  TaskownerDocTypeDataNew(userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataNew`, { params });
  }
  getTaskownerDocTypeDataNew(userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataNew`, { params });
  }
  getTaskownerDocCategoryDataNew(DocTypeID:string,fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocCategoryDataNew`, { params });
  }
  getTaskownerDocSubCategoryDataNew(DocCategoryID:string,fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocSubCategoryDataNew`, { params });
  }
  getTODocConfidentialityDataNew(fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocConfidentialityNew`, { params });
  }
  TODocAuthorityDataNew(userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocAuthoritydataNew`, { params });
  }
  getTODocAuthorityDataNew(fromDate: string, toDate: string,userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocAuthoritydataNew`, { params });
  }
  getTONatureofDocdataNew(fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTONatureofDocdataNew`, { params });
  }
  getTOReadingTimedataNew(fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOReadingTimedataNew`, { params });
  }
  //------------------------------------------
  TaskownerDocTypeData(userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeData`, { params });
  }
  getTaskownerDocTypeData(fromDate: string, toDate: string,userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeData`, { params });
  }
  getTaskownerDocCategoryData(DocTypeID:string,fromDate: string, toDate: string,userid:string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocCategoryData`, { params });
  }
  getTaskownerDocSubCategoryData(DocCategoryID:string,fromDate: string, toDate: string,userid:string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocSubCategoryData`, { params });
  }
  getTODocConfidentialityData(fromDate: string, toDate: string,userid:string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocConfidentiality`, { params });
  }
  TODocAuthorityData(userid: string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocAuthoritydata`, { params });
  }
  getTODocAuthorityData(fromDate: string, toDate: string,userid: string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTODocAuthoritydata`, { params });
  }
  getTONatureofDocdata(fromDate: string, toDate: string,userid:string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTONatureofDocdata`, { params });
  }
  getTOReadingTimedata(fromDate: string, toDate: string,userid:string,datetype:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('datetype', datetype);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOReadingTimedata`, { params });
  }
  getTOAckReqSummaryLD(fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOAckReqSummary`, { params });
  }
  getTOAckReqSummary(fromDate: string, toDate: string,userid:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOAckReqSummary`, { params });
  }
  TOAckReqSummary(userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOAckReqSummary`, { params });
  }
  
  TaskownerDocTypeDataAckreq(userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataAckreq`, { params });
  }
  getTaskownerDocTypeDataAckreq(fromDate: string, toDate: string,userid: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataAckreq`, { params });
  }
  getTaskownerDocTypeDataAckreqLD(fromDate: string, toDate: string,userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataAckreq`, { params });
  }
  getTaskownerDocCategoryDataAckreq(DocTypeID:string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      // .set('fromDate', fromDate)
      // .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocCategoryDataAckreq`, { params });
  }
  getTaskownerDocSubCategoryDataAckreq(DocCategoryID:string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      // .set('fromDate', fromDate)
      // .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocSubCategoryDataAckreq`, { params });
  }
  
  //Average Reading Time Data
  getTOARTReqSummaryLD(fromDate: string, toDate: string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOARTReqSummary`, { params });
  }
  getTOARTReqSummary(fromDate: string, toDate: string,userid:string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOARTReqSummary`, { params });
  }
  TOARTReqSummary(userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTOARTReqSummary`, { params });
  }
  TaskownerDocTypeDataART(userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid)
      .set('days', days);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataART`, { params });
  }
  getTaskownerDocTypeDataART(fromDate: string, toDate: string,userid: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataART`, { params });
  }
  getTaskownerDocTypeDataARTLD(fromDate: string, toDate: string,userid: string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataART`, { params });
  }
  getTaskownerDocCategoryDataART(DocTypeID:string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      // .set('fromDate', fromDate)
      // .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocCategoryDataART`, { params });
  }
  getTaskownerDocSubCategoryDataART(DocCategoryID:string,userid:string,days:number): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      // .set('fromDate', fromDate)
      // .set('toDate', toDate)
      .set('userid', userid)
      .set('days', days);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocSubCategoryDataART`, { params });
  }

//Document Pending Reading
  TaskownerDocTypeDataDPR(userid: string): Observable<any> {
    let params = new HttpParams()
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataDPR`, { params });
  }
  getTaskownerDocTypeDataDPR(fromDate: string, toDate: string,userid: string): Observable<any> {
    let params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocTypeDataDPR`, { params });
  }
  getTaskownerDocCategoryDataDPR(DocTypeID:string,fromDate: string, toDate: string,userid:string): Observable<any> {
    let params = new HttpParams()
      .set('DocTypeID', DocTypeID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);

    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocCategoryDataDPR`, { params });
  }
  getTaskownerDocSubCategoryDataDPR(DocCategoryID:string,fromDate: string, toDate: string,userid:string): Observable<any> {
    let params = new HttpParams()
      .set('DocCategoryID', DocCategoryID)
      .set('fromDate', fromDate)
      .set('toDate', toDate)
      .set('userid', userid);
    return this.http.get<any>(`${BASE_URL}/Documentmaster/GetTaskownerDocSubCategoryDataDPR`, { params });
  }
  //Governance HomePage
  GetAcknowlwdgedata(USR_ID:string):Observable<any> {
    let params = new HttpParams()
    .set('USR_ID',USR_ID);
    return this.http.get<any>(`${BASE_URL}/Acknowledgement/GetAcknowlwdgedata`, { params });
  }
  GetAckUserAccessability(USR_ID:string):Observable<any> {
    let params = new HttpParams()
    .set('USR_ID',USR_ID);
    return this.http.get<any>(`${BASE_URL}/Acknowledgement/GetAckUserAccessability`, { params });
  }
  GetAssesmentsInitiated(userid:string):Observable<any> {
    let params = new HttpParams()
    .set('userid',userid);
    return this.http.get<any>(`${BASE_URL}/BeginAssessementController/GetAssesmentsInitiated`, { params });
  }
  GetActiveScheduleAssesment(userid:string):Observable<any> {
    let params = new HttpParams()
    .set('userid',userid);
    return this.http.get<any>(`${BASE_URL}/BeginAssessementController/GetActiveScheduleAssesment`, { params });
  }
  GetAssessmentdata(){
    return this.http.get(`${BASE_URL}/MitigationController/GetAssessmentdata`);
  }
  GetPublishedData2(RoleId:string,userid:string):Observable<any> {
    alert(JSON.stringify(RoleId))
    let params = new HttpParams()
    .set('RoleId',RoleId)
    .set('userid',userid);
    return this.http.get<any>(`${BASE_URL}/SavedDraftDocuments/GetPublishedData2`, { params });
  }
}
