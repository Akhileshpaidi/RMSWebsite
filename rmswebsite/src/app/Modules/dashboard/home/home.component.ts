import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import activitiesData from '../../../Common/dummy-data/activities.json';
import { SessionService } from 'src/app/core/Session/session.service';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSelectChange } from '@angular/material/select';
import DataSource from 'devextreme/data/data_source';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ChartData {
  DoctypeName: string;
  Doctype_Count: number;
}
export interface Activity {
  id: string;
  activity: string;
  author: string;
  date: string;
  time: string;
  status: string;
}
export interface Document {
  addDoc_id: number;
  title_Doc: string;
  doc_Confidentiality: string;
  eff_Date: string;
  doc_process_Owner: string;
  doc_Approver: string;
}
interface AuthorityData {
  authorityTypeName: string;
  authorityName: string;
  count: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selected:any;
  dateTypes: string[] = ['Publishing Date', 'Effective Date','Discard Date','Disable Date', 'Acknowledgement Date'];
  selectedDateType: string = '';
  fromDate:any;
  toDate:any;
  // fromDate: string = '';
  // toDate: string = '';
 public chartData: any[] = [];
 RecentdocData:any;
 DocConfidentiality:any;
 DisabledDocConfidentiality:any;
 NatureOfDoc:any;
 DisabledNatureOfDoc:any;
 ReadingTimeData:any[]=[];
 readingTimes: string[] = [];
 DisableddocTypeData: any[] = [];
 DisableddocCategotyData: any[] = [];
 DisableddocSubCategoryData:any[] = [];
 docTypeData: any[] = [];
 docCategotyData: any[] = [];
 docSubCategoryData:any[] = [];
 SavedDraftdocTypeData: any[] = [];
 SavedDraftdocCategotyData: any[] = [];
 SavedDraftdocSubCategoryData:any[] = [];
 DiscardedDraftData: ChartData[] = [];
 isDrilldown: boolean = false;
 drilldownLevel: number = 0; 
//  authorityData :any;
//  transformedData:any;
authorityData: AuthorityData[] = [];
  transformedData: any[] = [];
  flatData: any[] = [];
  series: any[] = [];
  seriesNew: any[] = [];
  Disabledseries: any[] = [];
  DisabledflatData:any[] = [];
  // AuthorityData[] = [];
 authorityDataGrouped!: DataSource;
//  docTypeData1:any;
//  docCategoryData:any;
//  docSubCategoryData:any;
//  barchartData = [
//   { level: 'Type', parent: null, name: 'Type A', count: 20 },
//   { level: 'Category', parent: 'Type A', name: 'Category 1', count: 10 },
//   { level: 'Subcategory', parent: 'Category 1', name: 'Subcategory 1', count: 6 },
//   { level: 'Subcategory', parent: 'Category 1', name: 'Subcategory 2', count: 4 },
//   { level: 'Category', parent: 'Type A', name: 'Category 2', count: 8 },
//   { level: 'Type', parent: null, name: 'Type B', count: 15 },
//   { level: 'Category', parent: 'Type B', name: 'Category 3', count: 7 },
//   { level: 'Subcategory', parent: 'Category 3', name: 'Subcategory 3', count: 3 }
// ];
 // Example data for main chart
 documentTypes: any[] = [];
  categories: { [key: string]: any[] } = {};
  subcategories: { [key: string]: { [key: string]: any[] } } = {};
  selectedCategories: any[] = [];
  selectedSubCategories: any[] = [];
  showCategoryChart = false;
  showSubCategoryChart = false;
  // subcategories: { [key: string]: any[] } = {};
 documentTypeData: ChartData[] = [
  // { category: 'Document Type 1', count: 10 },
  // { category: 'Document Type 2', count: 20 },
  // { category: 'Document Type 3', count: 30 }
];
// Example drilldown data
categoryData: { [key: string]: ChartData[] } = {
  // 'Document Type 1': [
  //   { category: 'Category 1', count: 5 },
  //   { category: 'Category 2', count: 5 }
  // ],
  // 'Document Type 2': [
  //   { category: 'Category 3', count: 10 },
  //   { category: 'Category 4', count: 10 }
  // ],
  // 'Document Type 3': [
  //   { category: 'Category 5', count: 15 },
  //   { category: 'Category 6', count: 15 }
  // ]
};
subcategoryData: { [key: string]: ChartData[] } = {
  // 'Category 1': [
  //   { category: 'Subcategory 1.1', count: 2 },
  //   { category: 'Subcategory 1.2', count: 3 }
  // ],
  // 'Category 2': [
  //   { category: 'Subcategory 2.1', count: 5 }
  // ],
  // 'Category 3': [
  //   { category: 'Subcategory 3.1', count: 8 },
  //   { category: 'Subcategory 3.2', count: 2 }
  // ],
  // // Add more subcategories as needed
};
CARoptions = [
  { value: 'option1', viewValue: 'Acknowledgement Request Status' },
  { value: 'option2', viewValue: 'DocType,Category,SubCategory' },
]
options = [
  { value: 'option1', viewValue: 'DocType,Category,SubCategory' },
  { value: 'option2', viewValue: 'Doc Confidentiality' },
  { value: 'option3', viewValue: 'Authority Type' },
  { value: 'option4', viewValue: 'Nature of Doc' },
  { value: 'option5', viewValue: 'Average Indicative Reading Time' },
  // { value: 'option6', viewValue: 'SavedDrafts DocType,Category,SubCategory' },
  // { value: 'option7', viewValue: 'DiscardedDraft DocType,Category,SubCategory' }
];
Disabledoptions = [
  { value: 'option1', viewValue: 'DocType,Category,SubCategory' },
  { value: 'option2', viewValue: 'Doc Confidentiality' },
  { value: 'option3', viewValue: 'Authority Type' },
  { value: 'option4', viewValue: 'Nature of Doc' },
];
showSecondChart = false;
showThirdChart = false;
showFirstChart=true;
showDocConfChart=false;
showAuthorityChart=false;
showNatureofDoc=false;
showReadingTime=false;
showSavedDraftFirstChart=true;
showSavedDraftSecondChart=false;
showSavedDraftThirdChart=false;
showDisabledFirstChart=true;
showDisabledSecondChart=false;
showDisabledThirdChart=false;
showDisabledDocConfChart=false;
showDisabledAuthorityChart=false;
showDisabledNatureofDoc=false;
showDiscardedDraftFirstChart=true;
  displayedColumns = ['srno', 'Title_Doc', 'Doc_Confidentiality', 'Eff_Date', 'Doc_process_Owner','Doc_Approver'];
  sessionData: any;
  erroMessage: any;
  totalDepositoryCount: any;
  savedDraftsCount:any;
  discardedDraftsCount:any;
  newlyaddedDocCount:any;
  disabledDocCount:any;

  // dataSource = new MatTableDataSource<any>();
  dataSource :any[]= [];
  dataSource1=[
    {
      AddDoc_id:'1',
      doc_Type: 'Policy',
      doc_Category: 'Human Resource',
      doc_SubCategory: 'Employee Related',
      title_Doc: '12th_IT Strategy Committee Meeting - 13.11.23',
      doc_Id: '023-240912-98875 : 1.0',
      version: '1.0',
      publishing_Date: '01/Jun/2024',
      doc_Confidentiality: 'Confidential',
      effective_Date: '01/Sep/2024',
      process_Owner: 'Tamesh Jairam',
      approver: 'Banesh Vardhan',
      doc_Classification: 'Internal',
      publish_Authority: 'Company',
      name_of_Authority: 'By Board'
    },
    
  ];
  selectedDocId: string | null = null;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  dashboardData: any;
  filderData: any;
  admin: any = false;
  inspector: any = false;
  reviewer: any = false;
  adminData: any;
  inspectorData: any;
  reviewerData: any;
  showFirstChartNew=true;
  showSecondChartNew = false;
  showThirdChartNew = false;
  showDocConfChartNew=false;
  showAuthorityChartNew=false;
  showNatureofDocNew=false;
  showReadingTimeNew=false;
  showAckReqfChart=true;
  showFirstDoctypeChart=false;
  showSecondDoctypeChart=false;
  showThirdDoctypeChart=false;
  TOdocTypeData: any[] = [];
 TOdocCategotyData: any[] = [];
 TOdocSubCategoryData:any[] = [];
  AckreqStatus:any[]=[];
 docTypeDataNew: any[] = [];
 docCategotyDataNew: any[] = [];
 docSubCategoryDataNew:any[] = [];
 DocConfidentialityNew:any;
 flatDataNew: any[] = [];
 transformedDataNew: any[] = [];
 NatureOfDocNew:any;
 ReadingTimeDataNew:any[]=[];
 ReadingTimeSeriesNew:any[]=[];
 ReadingTimeSeries:any[]=[];
 readingTimesNew: string[] = [];
  selectedDays: number = 7;
  selectedOption: any;
  CARselectedDays: number = 7;
  CARselectedOption: any;
  userData:any;
  timeRanges = [
    { label: 7, value: 7 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 420, value: 420 }
  ];
  CARtimeRanges = [
    { label: 7, value: 7 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 420, value: 420 }
  ];
   rawData = [
    { count: 8, authorityTypeName: 'Company', authorityName: 'By Board' },
    { count: 3, authorityTypeName: 'Company', authorityName: 'By Board Committee' },
    { count: 5, authorityTypeName: 'Company', authorityName: 'By Department Head' },
    { count: 2, authorityTypeName: 'Statutory', authorityName: 'RBI' }
  ];
  constructor(
    private session: SessionService,
    private router: Router,
    private authService: AuthService,
    private role: RoleService,
    private encrypt: EncryptionService,
    private user: UserService
  ) {
    this.MyActivity();
  }

  ngOnInit() {
    this.selectedDateType = this.dateTypes[0];
    // Auto-fill the 'To Date' with today's date
    // this.toDate = new Date();

    // // Auto-fill the 'From Date' with 30 days before today's date
    // const thirtyDaysAgo = new Date();
    // thirtyDaysAgo.setDate(this.toDate.getDate() - 30);
    // this.fromDate = thirtyDaysAgo;
const today = new Date();
this.toDate = formatDate(today, 'yyyy-MM-dd', 'en-US');

// Set 'From Date' to 30 days before today
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
this.fromDate = formatDate(thirtyDaysAgo, 'yyyy-MM-dd', 'en-US');
    //this.dataSource.paginator = this.paginator;
    if (this.options.length > 0) {
      this.selectedOption = this.options[0].value;
    }
    this.selectedDays=this.timeRanges[0].value;
    if (this.CARoptions.length > 0) {
      this.CARselectedOption = this.CARoptions[0].value;
    }
    this.CARselectedDays=this.CARtimeRanges[0].value;
    
    // if (this.Ackoptions.length > 0) {
    //   this.selectedAckOption = this.Ackoptions[0].value;
    // }
    // if (this.ARToptions.length > 0) {
    //   this.selectedARTOption = this.ARToptions[0].value;
    // }
    // if (this.DPRoptions.length > 0) {
    //   this.selectedDPROption = this.DPRoptions[0].value;
    // }
    this.userData = this.session.getUserId();
    // this.getDashboardData();
    this.onApiService();
    this.fetchChartData(this.selectedDays);
    // this.role.DepositoryCount().subscribe((response: any) => {
    //   this.totalDepositoryCount = response[0].summaryCount;
    //   // console.log(response[0].summaryCount, 'Dashbpard data');
    // });
    // this.role.DraftStatusCount().subscribe((response: any) => {
    //   if(response[0].draft_Status=='Completed')
    //     {
    //       this.savedDraftsCount=response[0].status_Count;
    //     }
    //   if(response[1].draft_Status=='Incomplete')
    //     {
    //       this.discardedDraftsCount=response[1].status_Count;
    //     }
    // });
    // this.role.newlyaddedDoc().subscribe((response: any) => {
    //   this.newlyaddedDocCount = response[0].summaryCount;
    // });
    // this.role.disabledDoc().subscribe((response: any) => {
    //   this.disabledDocCount = response[0].summaryCount;
    // });
    // this.role.AllpublishedDoc().subscribe((response: any) => {
    //   const data1: Document[]=response;
    //   this.dataSource.data = data1;
    //   this.dataSource.paginator = this.paginator;
    //   // this.dataSource = response;
    // });
    // this.role.DocSummaryCount().subscribe((response: any) => {
    //   // this.chartData = response;
    //   this.chartData = response.map((item :any)=> ({
    //     ...item,
    //     displayText: `${item.reviewStatusName} (${item.status_Count})`
    //   }));
    // });

    // this.role.DocTypeData().subscribe((response: any) => {
    //   this.docTypeData = response;
    // });
    // this.role.SavedDraftDocTypeData().subscribe((response: any) => {
    //   this.SavedDraftdocTypeData = response;
    // });
    // this.role.DiscardedDraftDocTypeData().subscribe((response: any) => {
    //   this.DiscardedDraftData = response;
    // });
    // this.role.DisabledDocTypeData().subscribe((response: any) => {
    //   this.DisableddocTypeData = response;
    // });
    // // this.DiscardedDraftData = this.documentTypeData;
    // this.role.DocAuthorityData().subscribe((response: any) => {
    //   this.transformedData = response.reduce((acc: any[], item:any) => {
    //     let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
    //     if (!group) {
    //       group = { authorityTypeName: item.authorityTypeName, items: [] };
    //       acc.push(group);
    //     }
    //     group.items.push(item);
    //     return acc;
    //   }, []);

    //   // Flatten the data for the chart
    //   this.flatData = this.transformedData.flatMap(group => group.items);

    //   // Debug output to verify data
    //   // console.log('Transformed Data:', this.transformedData);
    //   // console.log('Flattened Data:', this.flatData);
    // });
    // this.role.RecentDocData().subscribe((response: any) => {
    //   this.RecentdocData = response;
    // });
   
    // // this.docTypeData1 = this.barchartData.filter(item => item.level === 'Type');
    // // this.docCategoryData = this.barchartData.filter(item => item.level === 'Category');
    // // this.docSubCategoryData = this.barchartData.filter(item => item.level === 'Subcategory');
    // //this.totalDepositoryCount =123;
    // //  // this.calculateTotalDepositoryCount();
  }
 
  selectCard(docId: string): void {
    this.selectedDocId = this.selectedDocId === docId ? null : docId;
  }
  customizeLabel = (pointInfo: any) => {
    return `${pointInfo.argumentText}: ${pointInfo.valueText}`;
  };
  calculateTotalDepositoryCount(): number {
    // Replace with your actual logic to get the total depository count
    const dataSource = [
      { category: 'Category1', count: 10 },
      { category: 'Category2', count: 20 }
    ];
    return dataSource.reduce((acc, item) => acc + item.count, 0);
  }
  onDatetypeChange(event:MatSelectChange)
  {
    this.selectedDateType=event.value;
  }
  onOptionChange(event: MatSelectChange) {
    // console.log('Selected value:', event.value);
    if(event.value=='option1')
      {
        this.showFirstChart=true;
        this.showSecondChart=false;
        this.showThirdChart=false;
        this.showDocConfChart=false;
        this.showAuthorityChart=false;
        this.showNatureofDoc=false;
        this.showReadingTime=false;
        // this.showSavedDraftFirstChart=false;
        // this.showSavedDraftSecondChart=false;
        // this.showSavedDraftThirdChart=false;
      }
    else if(event.value=='option2')
    {
      this.showFirstChart=false;
      this.showSecondChart=false;
      this.showThirdChart=false;
      this.showDocConfChart=true;
      this.showAuthorityChart=false;
      this.showNatureofDoc=false;
      this.showReadingTime=false;
      // this.showSavedDraftFirstChart=false;
      // this.showSavedDraftSecondChart=false;
      // this.showSavedDraftThirdChart=false;
    }
    else if(event.value=='option3')
      {
        this.showFirstChart=false;
        this.showSecondChart=false;
        this.showThirdChart=false;
        this.showDocConfChart=false;
        this.showAuthorityChart=true;
        this.showNatureofDoc=false;
        this.showReadingTime=false;
        // this.showSavedDraftFirstChart=false;
        // this.showSavedDraftSecondChart=false;
        // this.showSavedDraftThirdChart=false;
      }
      else if(event.value=='option4')
        {
          this.showFirstChart=false;
          this.showSecondChart=false;
          this.showThirdChart=false;
          this.showDocConfChart=false;
          this.showAuthorityChart=false;
          this.showNatureofDoc=true;
          this.showReadingTime=false;
        //   this.showSavedDraftFirstChart=false;
        //   this.showSavedDraftSecondChart=false;
        //  this.showSavedDraftThirdChart=false;
        }
        else if(event.value=='option5')
          {
            this.showFirstChart=false;
            this.showSecondChart=false;
            this.showThirdChart=false;
            this.showDocConfChart=false;
            this.showAuthorityChart=false;
            this.showNatureofDoc=false;
            this.showReadingTime=true;
            // this.showSavedDraftFirstChart=false;
            // this.showSavedDraftSecondChart=false;
            // this.showSavedDraftThirdChart=false;
          }
          // else if(event.value=='option6')
          //   {
          //     this.showFirstChart=false;
          //     this.showSecondChart=false;
          //     this.showThirdChart=false;
          //     this.showDocConfChart=false;
          //     this.showAuthorityChart=false;
          //     this.showNatureofDoc=false;
          //     this.showReadingTime=false;
          //     this.showSavedDraftFirstChart=true;
          //     this.showSavedDraftSecondChart=false;
          //     this.showSavedDraftThirdChart=false;
          //   }
          //   else if(event.value=='option7')
          //     {
          //       this.showFirstChart=false;
          //       this.showSecondChart=false;
          //       this.showThirdChart=false;
          //       this.showDocConfChart=false;
          //       this.showAuthorityChart=false;
          //       this.showNatureofDoc=false;
          //       this.showReadingTime=false;
          //       this.showSavedDraftFirstChart=false;
          //       this.showSavedDraftSecondChart=false;
          //       this.showSavedDraftThirdChart=false;
          //       this.showDiscardedDraftFirstChart=true;
          //     }
  }
  onDisabledOptionChange(event: MatSelectChange) {
    // console.log('Selected value:', event.value);
    if(event.value=='option1')
      {
        this.showDisabledFirstChart=true;
        this.showDisabledSecondChart=false;
        this.showDisabledThirdChart=false;
        this.showDisabledDocConfChart=false;
        this.showDisabledAuthorityChart=false;
        this.showDisabledNatureofDoc=false;
      }
    else if(event.value=='option2')
    {
      this.showDisabledFirstChart=false;
      this.showDisabledSecondChart=false;
      this.showDisabledThirdChart=false;
      this.showDisabledDocConfChart=true;
      this.showDisabledAuthorityChart=false;
      this.showDisabledNatureofDoc=false;
      
    }
    else if(event.value=='option3')
      {
        this.showDisabledFirstChart=false;
        this.showDisabledSecondChart=false;
        this.showDisabledThirdChart=false;
        this.showDisabledDocConfChart=false;
        this.showDisabledAuthorityChart=true;
        this.showDisabledNatureofDoc=false;
        
      }
      else if(event.value=='option4')
        {
          this.showDisabledFirstChart=false;
          this.showDisabledSecondChart=false;
          this.showDisabledThirdChart=false;
          this.showDisabledDocConfChart=false;
          this.showDisabledAuthorityChart=false;
          this.showDisabledNatureofDoc=true;
          
        }
  }

  customizeText(pointInfo:any) {
    return `${pointInfo.argumentText} (${pointInfo.point.data.AuthorityTypeName})`;
  }
  customizeLabelText = (info: any) => {
    return `${info.valueText} (${info.seriesName})`;
  };
  
  goBackToFirstDocChart(): void {
    this.showFirstDoctypeChart = true;
    this.showSecondDoctypeChart = false;
  }
  // Go back from third chart to second chart
  goBackToSecondDocChart(): void {
    this.showSecondDoctypeChart = true;
    this.showThirdDoctypeChart = false;
  }
   // Go back from second chart to first chart
goBackToFirstChartNew(): void {
  this.showFirstChartNew = true;
  this.showSecondChartNew = false;
}
// Go back from third chart to second chart
goBackToSecondChartNew(): void {
  this.showSecondChartNew = true;
  this.showThirdChartNew = false;
}
   // Go back from second chart to first chart
   goBackToFirstChart(): void {
    this.showFirstChart = true;
    this.showSecondChart = false;
  }
  // Go back from third chart to second chart
  goBackToSecondChart(): void {
    this.showSecondChart = true;
    this.showThirdChart = false;
  }
  goBackToFirstSavedDraft(): void {
    this.showSavedDraftFirstChart = true;
    this.showSavedDraftSecondChart = false;
  }
  // Go back from third chart to second chart
  goBackToSecondSavedDraft(): void {
    this.showSavedDraftSecondChart = true;
    this.showSavedDraftThirdChart = false;
  }
  goBackToDiscardedDraftFirstChart(): void {
    this.showDiscardedDraftFirstChart = true;
    this.showCategoryChart = false;
  }
  goBackCategoryChart(): void {
    this.showCategoryChart = true;
    this.showSubCategoryChart = false;
  }
  goBackToFirstDisabled(): void {
    this.showDisabledFirstChart = true;
    this.showDisabledSecondChart = false;
  }
  // Go back from third chart to second chart
  goBackToSecondDisabled(): void {
    this.showDisabledSecondChart = true;
    this.showDisabledThirdChart = false;
  }
  getFilteredDataNew() {
    return this.ReadingTimeDataNew.filter(item => item.time_period && item.indicative_reading_time);
  }

  onSubmit(): void {
    this.onApiService();
    this.fetchChartData(this.selectedDays);
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    // const docid='1';
    // if (formattedFromDate && formattedToDate) {
    //   this.role.getDepositoryCount(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.totalDepositoryCount = data[0].summaryCount;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
      
    //   this.role.getDraftStatusCount(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       if(data[0].draft_Status=='Completed')
    //         {
    //           this.savedDraftsCount=data[0].status_Count;
    //         }
    //       if(data[1].draft_Status=='Incomplete')
    //         {
    //           this.discardedDraftsCount=data[1].status_Count;
    //         }
    //       // this.totalDepositoryCount = data[0].summaryCount;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getdisabledDoc(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.disabledDocCount = data[0].summaryCount;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getAllpublishedDoc(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       const data1: Document[]=data;
    //       this.dataSource.data = data1;
    //       this.dataSource.paginator = this.paginator;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getDocSummaryCount(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.chartData = data.map((item :any)=> ({
    //         ...item,
    //         displayText: `${item.reviewStatusName} (${item.status_Count})`
    //       }));
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getDocTypeData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.docTypeData = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   this.role.getSavedDraftDocTypeData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.SavedDraftdocTypeData = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   this.role.getDiscardedDraftDocTypeData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       // this.DiscardedDraftData = data;
    //       this.processData(data);
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   this.role.getDisabledDocTypeData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.DisableddocTypeData = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   // this.role.getDiscardedDraftDocCategoryData(docid,formattedFromDate, formattedToDate).subscribe(
    //   //   data => {
    //   //     this.categoryData = data;
    //   //     alert(JSON.stringify(this.categoryData))
    //   //   },
    //   //   error => {
    //   //     console.error('Error fetching data:', error);
    //   //   }
    //   // );
    //   // this.role.getDiscardedDraftDocSubCategoryData(docid,formattedFromDate, formattedToDate).subscribe(
    //   //   data => {
    //   //     this.subcategoryData = data;
    //   //   },
    //   //   error => {
    //   //     console.error('Error fetching data:', error);
    //   //   }
    //   // );
    //   // this.DiscardedDraftData = this.documentTypeData;

    //   this.role.getRecentDocData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.RecentdocData = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getDocConfidentialityData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //         this.DocConfidentiality = data.map((item :any)=> ({
    //           ...item,
    //           displaydoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
    //         }));
    //       // this.DocConfidentiality = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   this.role.getDocAuthorityData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.transformedData = data.reduce((acc: any[], item:any) => {
    //         let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
    //         if (!group) {
    //           group = { authorityTypeName: item.authorityTypeName, items: [] };
    //           acc.push(group);
    //         }
    //         group.items.push(item);
    //         return acc;
    //       }, []);
    
    //       // Flatten the data for the chart
    //       this.flatData = this.transformedData.flatMap(group => group.items);
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getNatureofDocdata(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.NatureOfDoc = data.map((item :any)=> ({
    //         ...item,
    //         naturedocdisplayText: `${item.natureOf_Doc_Name} (${item.count})`
    //       }));
    //       // this.NatureOfDoc = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   ); 
    //   this.role.getReadingTimedata(formattedFromDate, formattedToDate).subscribe(
    //     (data: any[]) => {
    //       // alert(JSON.stringify(data))
    //       this.ReadingTimeData = data;
    //        // Get unique indicative_reading_time values for the series generation
    //   this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getDisabledDocConfidentialityData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //         this.DisabledDocConfidentiality = data.map((item :any)=> ({
    //           ...item,
    //           displayDisableddoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
    //         }));
    //       // this.DocConfidentiality = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );
    //   this.role.getDisabledDocAuthorityData(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.transformedData = data.reduce((acc: any[], item:any) => {
    //         let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
    //         if (!group) {
    //           group = { authorityTypeName: item.authorityTypeName, items: [] };
    //           acc.push(group);
    //         }
    //         group.items.push(item);
    //         return acc;
    //       }, []);
    
    //       // Flatten the data for the chart
    //       this.DisabledflatData = this.transformedData.flatMap(group => group.items);
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   );

    //   this.role.getDisabledNatureofDocdata(formattedFromDate, formattedToDate).subscribe(
    //     data => {
    //       this.DisabledNatureOfDoc = data.map((item :any)=> ({
    //         ...item,
    //         disableddisplayText: `${item.natureOf_Doc_Name} (${item.count})`
    //       }));
    //       // this.DisabledNatureOfDoc = data;
    //     },
    //     error => {
    //       console.error('Error fetching data:', error);
    //     }
    //   ); 

    // }
  }

  onApiService(){
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    const docid='1';
    this.role.DepositoryCount().subscribe((response: any) => {
          this.totalDepositoryCount = response[0].summaryCount;
        });
    this.role.DraftStatusCount().subscribe((response: any) => {
            if(response[1].draft_Status=='Incomplete')
              {
                this.savedDraftsCount=response[1].status_Count;
              }
            if(response[2].draft_Status=='Draft Discarded')
              {
                this.discardedDraftsCount=response[2].status_Count;
              }
          });
    if (formattedFromDate && formattedToDate) {
     
      this.role.getnewlyaddedDoc(formattedFromDate, formattedToDate).subscribe(
        data => {
          this.newlyaddedDocCount = data[0].summaryCount;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getdisabledDoc(formattedFromDate, formattedToDate).subscribe(
        data => {
          this.disabledDocCount = data[0].summaryCount;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getAllpublishedDoc(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          const data1: Document[]=data;
          this.dataSource=data;
          //alert(JSON.stringify(this.dataSource))
          // this.dataSource.data = data1;
          // this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getDocSummaryCount(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.chartData = data.map((item :any)=> ({
            ...item,
            displayText: `${item.reviewStatusName} (${item.status_Count})`
          }));
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getDocTypeData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.docTypeData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getSavedDraftDocTypeData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.SavedDraftdocTypeData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getDiscardedDraftDocTypeData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          // this.DiscardedDraftData = data;
          this.processData(data);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getDisabledDocTypeData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.DisableddocTypeData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      // this.role.getDiscardedDraftDocCategoryData(docid,formattedFromDate, formattedToDate).subscribe(
      //   data => {
      //     this.categoryData = data;
      //     alert(JSON.stringify(this.categoryData))
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
      // this.role.getDiscardedDraftDocSubCategoryData(docid,formattedFromDate, formattedToDate).subscribe(
      //   data => {
      //     this.subcategoryData = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
      // this.DiscardedDraftData = this.documentTypeData;

      this.role.getRecentDocData(formattedFromDate, formattedToDate).subscribe(
        data => {
          this.RecentdocData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getDocConfidentialityData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
            this.DocConfidentiality = data.map((item :any)=> ({
              ...item,
              displaydoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
            }));
          // this.DocConfidentiality = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getDocAuthorityData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        (data:any[]) => {
          // Extract unique authority names for series
  const authorityNames = Array.from(new Set(data.map((item:any) => item.authorityName)));

  // Group data by authorityTypeName
  const groupedData: Record<string, any>[] = data.reduce((acc:any, item:any) => {
    let existing = acc.find((obj:any) => obj.authorityTypeName === item.authorityTypeName);
    
    if (!existing) {
      existing = { authorityTypeName: item.authorityTypeName } as Record<string, any>;
      authorityNames.forEach(name => (existing[name] = 0)); // Initialize counts to 0
      acc.push(existing);
    }

    existing[item.authorityName] = item.count; // Assign count
    return acc;
  }, [] as Record<string, any>[]);

  this.flatData = groupedData;
  console.log("Transformed Data for Chart:", groupedData); // Debugging step
  // Define series dynamically
  this.series = authorityNames.map(name => ({
    valueField: name,
    name: name
  }));
  console.log("Series Config:", this.series); // Debugging step
          // alert(JSON.stringify(data))
          // this.transformedData = data.reduce((acc: any[], item:any) => {
          //   let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
          //   if (!group) {
          //     group = { authorityTypeName: item.authorityTypeName, items: [] };
          //     acc.push(group);
          //   }
          //   group.items.push(item);
          //   return acc;
          // }, []);
    
          // // Flatten the data for the chart
          // this.flatData = this.transformedData.flatMap(group => group.items);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getNatureofDocdata(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.NatureOfDoc = data.map((item :any)=> ({
            ...item,
            naturedocdisplayText: `${item.natureOf_Doc_Name} (${item.count})`
          }));
          // this.NatureOfDoc = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      ); 
      this.role.getReadingTimedata(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        (data: any[]) => {
          this.ReadingTimeData=this.transformData(data);
          // alert(JSON.stringify(data))
      //     this.ReadingTimeData = data;
      //      // Get unique indicative_reading_time values for the series generation
      // this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getDisabledDocConfidentialityData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
            this.DisabledDocConfidentiality = data.map((item :any)=> ({
              ...item,
              displayDisableddoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
            }));
          // this.DocConfidentiality = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getDisabledDocAuthorityData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        (data:any[]) => {
          // Extract unique authority names for series
  const authorityNames = Array.from(new Set(data.map((item:any) => item.authorityName)));

  // Group data by authorityTypeName
  const groupedData: Record<string, any>[] = data.reduce((acc:any, item:any) => {
    let existing = acc.find((obj:any) => obj.authorityTypeName === item.authorityTypeName);
    
    if (!existing) {
      existing = { authorityTypeName: item.authorityTypeName } as Record<string, any>;
      authorityNames.forEach(name => (existing[name] = 0)); // Initialize counts to 0
      acc.push(existing);
    }

    existing[item.authorityName] = item.count; // Assign count
    return acc;
  }, [] as Record<string, any>[]);

  this.DisabledflatData = groupedData;
  console.log("Transformed Data for Chart Disabled:", groupedData); // Debugging step
  // Define series dynamically
  this.Disabledseries = authorityNames.map(name => ({
    valueField: name,
    name: name
  }));
  console.log("Series Config Disabled:", this.series); // Debugging step
          // this.transformedData = data.reduce((acc: any[], item:any) => {
          //   let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
          //   if (!group) {
          //     group = { authorityTypeName: item.authorityTypeName, items: [] };
          //     acc.push(group);
          //   }
          //   group.items.push(item);
          //   return acc;
          // }, []);
    
          // // Flatten the data for the chart
          // this.DisabledflatData = this.transformedData.flatMap(group => group.items);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getDisabledNatureofDocdata(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
        data => {
          this.DisabledNatureOfDoc = data.map((item :any)=> ({
            ...item,
            disableddisplayText: `${item.natureOf_Doc_Name} (${item.count})`
          }));
          // this.DisabledNatureOfDoc = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      ); 
      //Acknowledgement Requested Data
      this.role.CMAckReqSummary(this.userData,this.CARselectedDays,this.selectedDateType).subscribe(
       (data: any) => {
         //alert(JSON.stringify(data))
        //this.AckreqStatus = data;
        this.AckreqStatus = data.map((item :any)=> ({
          ...item,
          displaydoc_AckStatus: `${item.Acknowledment} (${item.count})`
        }));
        // this.totalRequested=data.total_requested;
        // this.totalAcknowledged=data.total_acknowledged;
        // this.value = (this.totalAcknowledged / this.totalRequested) * 100; // Calculate percentage
         // Get unique indicative_reading_time values for the series generation
         //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      },
      error => {
         console.error('Error fetching data:', error);
      }
      );

    }
  }

  transformData(data: any[]) {
    let result: any[] = [];
    let groupedData: { [key: string]: any } = {};
    let uniqueSeries = new Set<string>(); // Store unique series (indicative reading times)
  
    data.forEach(item => {
      let period = item.time_period?.trim() || "Unknown"; // Handle empty values
      let readingTime = item.indicative_reading_time?.trim() 
                        ? `${item.indicative_reading_time} (IndicativeReadingTime)` 
                        : "Unknown (IndicativeReadingTime)"; // Format Series
  
      // Collect unique series
      uniqueSeries.add(readingTime);
  
      if (!groupedData[period]) {
        groupedData[period] = { time_period: period, Total: 0 };
      }
  
      groupedData[period][readingTime] = (groupedData[period][readingTime] || 0) + item.count;
      groupedData[period]["Total"] += item.count;
    });
  
    result = Object.values(groupedData);
    console.log("Transformed Data:", result);
  
    // Generate dynamic series based on unique indicative reading times
    this.ReadingTimeSeries = Array.from(uniqueSeries).map(time => ({
      valueField: time,
      name: time
    }));
  
    console.log("Dynamic Series:", this.series);
  
    return result;
  }
  transformDataNew(data: any[]) {
    let result: any[] = [];
    let groupedData: { [key: string]: any } = {};
    let uniqueSeries = new Set<string>(); // Store unique series (indicative reading times)
  
    data.forEach(item => {
      let period = item.time_period?.trim() || "Unknown"; // Handle empty values
      let readingTime = item.indicative_reading_time?.trim() 
                        ? `${item.indicative_reading_time} (IndicativeReadingTime)` 
                        : "Unknown (IndicativeReadingTime)"; // Format Series
  
      // Collect unique series
      uniqueSeries.add(readingTime);
  
      if (!groupedData[period]) {
        groupedData[period] = { time_period: period, Total: 0 };
      }
  
      groupedData[period][readingTime] = (groupedData[period][readingTime] || 0) + item.count;
      groupedData[period]["Total"] += item.count;
    });
  
    result = Object.values(groupedData);
    console.log("Transformed DataNew:", result);
  
    // Generate dynamic series based on unique indicative reading times
    this.ReadingTimeSeriesNew = Array.from(uniqueSeries).map(time => ({
      valueField: time,
      name: time
    }));
  
    console.log("Dynamic SeriesNew:", this.series);
  
    return result;
  }

  customizeSeries(value:any) {
    return {
      type: 'bar',
      label: {
        visible: true,
        customizeText: () => `${value.name}: ${value.value}`
      }
    };
  }
  getFilteredData() {
  return this.ReadingTimeData.filter(item => item.time_period && item.indicative_reading_time);
}
  ReadingcustomizeLabel(arg: any) {
    return `${arg.valueText}`; 
  }
  // getColor(time: string): string {
  //   const colors = {
  //     '10 mins': '#FF5733',
  //     '20 mins': '#33FF57',
  //     '30 mins': '#3357FF',
  //     '15 mins': '#FFC300'
  //   };
  //   return colors[time] || '#999999'; // Default color if not defined
  // }
  onFirstChartClicks(e: any) {
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstChart=false;
    this.showSecondChart=true;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getDocCategoryData(DocTypeID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.docCategotyData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    const clickedBarData = e.target.data;
    console.log('Clicked bar data:', clickedBarData);
  }

  onSecondChartClicks(data: any) {
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstChart=false;
    this.showSecondChart=false;
    this.showThirdChart=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getDocSubCategoryData(DocCategoryID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.docSubCategoryData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // You can use the `data` from the clicked bar to fetch or display relevant information
    console.log('Show data for:', data);
  }
  onFirstSavedDraftClicks(e: any) {
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showSavedDraftFirstChart=false;
    this.showSavedDraftSecondChart=true;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getSavedDraftDocCategoryData(DocTypeID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.SavedDraftdocCategotyData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    const clickedBarData = e.target.data;
    console.log('Clicked bar data:', clickedBarData);
  }

  onSecondSavedDraftClicks(data: any) {
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    // this.showFirstChart=false;
    this.showSavedDraftSecondChart=false;
    this.showSavedDraftThirdChart=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getSavedDraftDocSubCategoryData(DocCategoryID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.SavedDraftdocSubCategoryData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // You can use the `data` from the clicked bar to fetch or display relevant information
    console.log('Show data for:', data);
  }
  onFirstDisabledClicks(e: any){
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showDisabledFirstChart=false;
    this.showDisabledSecondChart=true;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getDisabledDocCategoryData(DocTypeID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.DisableddocCategotyData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  onSecondDisabledClicks(data: any) {
    // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    // this.showFirstChart=false;
    this.showDisabledSecondChart=false;
    this.showDisabledThirdChart=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getDisabledDocSubCategoryData(DocCategoryID,formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
      data => {
        this.DisableddocSubCategoryData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  MyActivity(){
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let Payload = {
      authid: this.sessionData.profile.authid,
    };

    let RequestPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(Payload)),
    };

    this.user.MyActivity(RequestPayload).subscribe((response: any) => {
      let MyActivity = this.encrypt.decryptionAES(response.ResponseData);
      let data = JSON.parse(MyActivity);
      this.dataSource=data;
      // this.dataSource = new MatTableDataSource(data.activitylist);
      // this.dataSource.paginator = this.paginator;
      console.log("MyActivity",data);

    });
  }

  getDashboardData() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);
    let rolePayload = {
      authid: this.sessionData.profile.authid,
    };
    let roleRequestPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(rolePayload)),
    };

    this.role.Dashboarddata(roleRequestPayload).subscribe((response: any) => {
      // console.log(response);
      if (response.ResponseCode === '0') {
        let data = this.encrypt.decryptionAES(response.ResponseData);
        this.dashboardData = JSON.parse(data);
        // console.log(this.dashboardData, 'Dashbpard data');
      } else {
        this.erroMessage = response.ResponseDesc;
        // console.log(this.erroMessage, 'Error');
      }
      if (this.sessionData.profile.defaultrolename == 'Admin') {
        this.admin = true;
        this.adminData = this.dashboardData.admininsepectiondata;
        // console.log(this.adminData, 'this.adminData');
      } else if (this.sessionData.profile.defaultrolename == 'Inspector') {
        this.inspector = true;
        this.inspectorData = this.dashboardData.myinsepectiondata;
        // console.log(this.inspectorData, 'this.inspectorData');
      } else if (this.sessionData.profile.defaultrolename == 'Reviewer') {
        this.reviewer = true;
        this.reviewerData = this.dashboardData.myreviewdata;
        // console.log(this.reviewer, 'this.reviewer');
      }
    });
  }
  // onPointClick(event: any): void {
  //   alert(JSON.stringify(event))
  //   const clickedCategory: string = event.target.originalArgument;
  //   if (this.drilldownLevel === 0 && this.categoryData[clickedCategory]) {
  //     // Drilldown to categories
  //     this.DiscardedDraftData = this.categoryData[clickedCategory];
  //     this.isDrilldown = true;
  //     this.drilldownLevel = 1;  // Move to next drilldown level
  //   } else if (this.drilldownLevel === 1 && this.subcategoryData[clickedCategory]) {
  //     // Drilldown to subcategories
  //     this.DiscardedDraftData = this.subcategoryData[clickedCategory];
  //     this.drilldownLevel = 2;  // Move to the final drilldown level
  //   }
  //   // const clickedCategory: string = event.target.originalArgument;
  //   // // Check if the clicked category exists in the drilldown data
  //   // if (this.drilldownData.hasOwnProperty(clickedCategory)) {
  //   //   this.DiscardedDraftData = this.drilldownData[clickedCategory];
  //   //   this.isDrilldown = true;
  //   // }
  // }
  processData(data: any[]): void {
    data.forEach(row => {
      // Check if the document type already exists
      let docType = this.documentTypes.find(dt => dt.category === row.doctypeName);
      if (!docType) {
        this.documentTypes.push({
          category: row.doctypeName,
          count: row.doctype_Count
        });
        this.categories[row.doctypeName] = [];
      }
      let category = this.categories[row.doctypeName].find(cat => cat.category === row.doc_CategoryName);
      // Add categories for each document type
      if (!category) {
      this.categories[row.doctypeName].push({
        category: row.doc_CategoryName,  // Treat Draft_Status as categories
        count: row.doccategory_Count
      });
      if (!this.subcategories[row.doctypeName]) {
        this.subcategories[row.doctypeName] = {};
      }
      if (!this.subcategories[row.doctypeName][row.doc_CategoryName]) {
        this.subcategories[row.doctypeName][row.doc_CategoryName] = [];
      }
    }
     // Add subcategories for each category
     this.subcategories[row.doctypeName][row.doc_CategoryName].push({
      category: row.doc_SubCategoryName,  // Assuming `SubCategory` exists in the dataset
      count: row.docsubcategory_Count
    });
    });

  }
  onDocumentTypeClick(e: any): void {
    const documentType = e.target.data.category;
    this.selectedCategories = this.categories[documentType]?.map(categoryData => {
      return {
        category: categoryData.category,
        count: categoryData.count  // Ensure the count is included
      };
    }) || [];
    // this.selectedCategories = this.categories[documentType] || [];
    this.showCategoryChart = true;
    this.showSubCategoryChart = false;
  }
onCategoryClick(e: any): void {
const documentType = this.selectedCategories.find(cat => cat.category === e.target.data.category);
const categoryKey  = documentType.category;
// Loop through subcategories object to find the main key (like 'Policy')
const documentTypeKey = Object.keys(this.subcategories).find(key => {
  return this.subcategories[key][categoryKey] !== undefined;
});
console.log('Selected Document Type:', documentType);
console.log('Subcategories Object:', this.subcategories);
console.log('Subcategories:',documentTypeKey);
if (documentTypeKey) {
  // Now you have the correct documentTypeKey and categoryKey
  this.selectedSubCategories = this.subcategories[documentTypeKey][categoryKey].map(subcategory => ({
    category: subcategory.category,
    count: subcategory.count
  }));

  console.log('Selected Subcategories:', this.selectedSubCategories);
  this.showSubCategoryChart = true;
} else {
  console.log('No subcategories found for this category.');
}
this.showCategoryChart = false;
this.showSubCategoryChart = true;
  }

    onTimeRangeChange(event: any): void {
      this.fetchChartData(event.value);
    }
  
    fetchChartData(days: number): void {
      if (this.fromDate == undefined) {
        this.fromDate=null;
      } 
      if (this.toDate == undefined) {
        this.toDate=null;
      } 
      // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
      // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
      const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
      this.selectedDays=days;
      this.role.getContentManagerDocTypeDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
        data => {
          this.docTypeDataNew = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  
      this.role.getCMDocConfidentialityDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
        data => {
            this.DocConfidentialityNew = data.map((item :any)=> ({
              ...item,
              displaydoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
            }));
          // this.DocConfidentiality = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  
      this.role.getCMDocAuthorityDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
        (data:any[]) => {
          // Extract unique authority names for series
  const authorityNames = Array.from(new Set(data.map((item:any) => item.authorityName)));

  // Group data by authorityTypeName
  const groupedData: Record<string, any>[] = data.reduce((acc:any, item:any) => {
    let existing = acc.find((obj:any) => obj.authorityTypeName === item.authorityTypeName);
    
    if (!existing) {
      existing = { authorityTypeName: item.authorityTypeName } as Record<string, any>;
      authorityNames.forEach(name => (existing[name] = 0)); // Initialize counts to 0
      acc.push(existing);
    }

    existing[item.authorityName] = item.count; // Assign count
    return acc;
  }, [] as Record<string, any>[]);

  this.flatDataNew = groupedData;
  console.log("Transformed Data for Chart New:", groupedData); // Debugging step
  // Define series dynamically
  this.seriesNew = authorityNames.map(name => ({
    valueField: name,
    name: name
  }));
  console.log("Series Config New:", this.series); // Debugging step
          // this.transformedDataNew = data.reduce((acc: any[], item:any) => {
          //   let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
          //   if (!group) {
          //     group = { authorityTypeName: item.authorityTypeName, items: [] };
          //     acc.push(group);
          //   }
          //   group.items.push(item);
          //   return acc;
          // }, []);
    
          // // Flatten the data for the chart
          // this.flatDataNew = this.transformedDataNew.flatMap(group => group.items);
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.role.getCMNatureofDocdataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
        data => {
          this.NatureOfDocNew = data.map((item :any)=> ({
            ...item,
            naturedocdisplayText: `${item.natureOf_Doc_Name} (${item.count})`
          }));
          // this.NatureOfDoc = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      ); 
      this.role.getTOReadingTimedataNew(formattedFromDate, formattedToDate,this.userData,days).subscribe(
        (data: any[]) => {
          this.ReadingTimeDataNew=this.transformDataNew(data);
          // alert(JSON.stringify(data))
      //     this.ReadingTimeDataNew = data;
      //      // Get unique indicative_reading_time values for the series generation
      // this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
     
    }

      onFirstChartClicksNew(e: any) {
         if (this.fromDate == undefined) {
          this.fromDate=null;
        } 
        if (this.toDate == undefined) {
          this.toDate=null;
        } 
        // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
        // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
        
        const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
        this.showFirstChartNew=false;
        this.showSecondChartNew=true;
        const DocTypeID=e.target.data.docTypeID;
        this.role.getContentManagerDocCategoryDataNew(DocTypeID,formattedFromDate, formattedToDate,this.userData,this.selectedDays,this.selectedDateType).subscribe(
          data => {
            this.docCategotyDataNew = data;
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
        const clickedBarData = e.target.data;
        console.log('Clicked bar data:', clickedBarData);
      }
    
      onSecondChartClicksNew(data: any) {
        if (this.fromDate == undefined) {
          this.fromDate=null;
        } 
        if (this.toDate == undefined) {
          this.toDate=null;
        } 
        // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
        // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
        const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
        this.showFirstChartNew=false;
        this.showSecondChartNew=false;
        this.showThirdChartNew=true;
        const DocCategoryID=data.target.data.doc_CategoryID;
        this.role.getContentManagerDocSubCategoryDataNew(DocCategoryID,formattedFromDate, formattedToDate,this.userData,this.selectedDays,this.selectedDateType).subscribe(
          data => {
            this.docSubCategoryDataNew = data;
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
        // You can use the `data` from the clicked bar to fetch or display relevant information
        console.log('Show data for:', data);
      }

    onNewOptionChange(event: MatSelectChange) {
      // console.log('Selected value:', event.value);
      if(event.value=='option1')
        {
          this.showFirstChartNew=true;
          this.showSecondChartNew=false;
          this.showThirdChartNew=false;
          this.showDocConfChartNew=false;
          this.showAuthorityChartNew=false;
          this.showNatureofDocNew=false;
          this.showReadingTimeNew=false;
        }
      else if(event.value=='option2')
      {
        this.showFirstChartNew=false;
        this.showSecondChartNew=false;
        this.showThirdChartNew=false;
        this.showDocConfChartNew=true;
        this.showAuthorityChartNew=false;
        this.showNatureofDocNew=false;
        this.showReadingTimeNew=false;
      }
      else if(event.value=='option3')
        {
          this.showFirstChartNew=false;
          this.showSecondChartNew=false;
          this.showThirdChartNew=false;
          this.showDocConfChartNew=false;
          this.showAuthorityChartNew=true;
          this.showNatureofDocNew=false;
          this.showReadingTimeNew=false;
        }
        else if(event.value=='option4')
          {
            this.showFirstChartNew=false;
            this.showSecondChartNew=false;
            this.showThirdChartNew=false;
            this.showDocConfChartNew=false;
            this.showAuthorityChartNew=false;
            this.showNatureofDocNew=true;
            this.showReadingTimeNew=false;
          }
          else if(event.value=='option5')
            {
              this.showFirstChartNew=false;
              this.showSecondChartNew=false;
              this.showThirdChartNew=false;
              this.showDocConfChartNew=false;
              this.showAuthorityChartNew=false;
              this.showNatureofDocNew=false;
              this.showReadingTimeNew=true;
            }
            
    }
  
    onCARTimeRangeChange(event: any): void {
       this.fetchCARChartData(event.value)
    }
    fetchCARChartData(days: number): void {
      if (this.fromDate == undefined) {
        this.fromDate=null;
      } 
      if (this.toDate == undefined) {
        this.toDate=null;
      } 
      // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
      // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
      const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
      this.CARselectedDays=days;
      //Acknowledgement Requested Data
      this.role.getCMAckReqSummary(formattedFromDate,formattedToDate,this.userData,this.CARselectedDays,this.selectedDateType).subscribe(
        (data: any) => {
         this.AckreqStatus = data.map((item :any)=> ({
           ...item,
           displaydoc_AckStatus: `${item.acknowledment} (${item.count})`
           
         }));
       },
       error => {
          console.error('Error fetching data:', error);
       }
       );
       this.role.getCMDocTypeDataAckreq(formattedFromDate,formattedToDate,this.userData,this.CARselectedDays,this.selectedDateType).subscribe(
        data => {
          this.TOdocTypeData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      // this.role.getContentManagerDocTypeDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
      //   data => {
      //     this.docTypeDataNew = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
  
      // this.role.getCMDocConfidentialityDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
      //   data => {
      //       this.DocConfidentialityNew = data.map((item :any)=> ({
      //         ...item,
      //         displaydoc_Confidentiality: `${item.doc_Confidentiality} (${item.count})`
      //       }));
      //     // this.DocConfidentiality = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
  
      // this.role.getCMDocAuthorityDataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
      //   data => {
      //     this.transformedDataNew = data.reduce((acc: any[], item:any) => {
      //       let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
      //       if (!group) {
      //         group = { authorityTypeName: item.authorityTypeName, items: [] };
      //         acc.push(group);
      //       }
      //       group.items.push(item);
      //       return acc;
      //     }, []);
    
      //     // Flatten the data for the chart
      //     this.flatDataNew = this.transformedDataNew.flatMap(group => group.items);
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
      // this.role.getCMNatureofDocdataNew(formattedFromDate, formattedToDate,this.userData,days,this.selectedDateType).subscribe(
      //   data => {
      //     this.NatureOfDocNew = data.map((item :any)=> ({
      //       ...item,
      //       naturedocdisplayText: `${item.natureOf_Doc_Name} (${item.count})`
      //     }));
      //     // this.NatureOfDoc = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // ); 
      // this.role.getTOReadingTimedataNew(formattedFromDate, formattedToDate,this.userData,days).subscribe(
      //   (data: any[]) => {
      //     // alert(JSON.stringify(data))
      //     this.ReadingTimeDataNew = data;
      //      // Get unique indicative_reading_time values for the series generation
      // this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
     
    }
    onCAROptionChange(event: MatSelectChange) {
      if(event.value=='option1')
        {
          this.showAckReqfChart=true;
          this.showFirstDoctypeChart=false;
        }
        if(event.value=='option2')
          {
            this.showAckReqfChart=false;
            this.showFirstDoctypeChart=true;
          }
    }
      onFirstDocChartClicks(e: any) {
        if (this.fromDate == undefined) {
          this.fromDate=null;
        } 
        if (this.toDate == undefined) {
          this.toDate=null;
        } 
        // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
        // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
        const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
        this.showAckReqfChart=false;
        this.showFirstDoctypeChart=false;
        this.showSecondDoctypeChart=true;
        this.showThirdDoctypeChart=false;
        const DocTypeID=e.target.data.docTypeID;
        this.role.getCMDocCategoryDataAckreq(DocTypeID,formattedFromDate, formattedToDate,this.userData,this.CARselectedDays,this.selectedDateType).subscribe(
          data => {
            this.TOdocCategotyData = data;
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
        const clickedBarData = e.target.data;
        console.log('Clicked bar data:', clickedBarData);
      }
    
      onSecondDocChartClicks(data: any) {
        if (this.fromDate == undefined) {
          this.fromDate=null;
        } 
        if (this.toDate == undefined) {
          this.toDate=null;
        } 
        // const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
        // const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
        const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
        this.showAckReqfChart=false;
        this.showFirstDoctypeChart=false;
        this.showSecondDoctypeChart=false;
        this.showThirdDoctypeChart=true;
        const DocCategoryID=data.target.data.doc_CategoryID;
        this.role.getCMDocSubCategoryDataAckreq(DocCategoryID,formattedFromDate, formattedToDate,this.userData,this.CARselectedDays,this.selectedDateType).subscribe(
          data => {
            this.TOdocSubCategoryData = data;
          },
          error => {
            console.error('Error fetching data:', error);
          }
        );
        // You can use the `data` from the clicked bar to fetch or display relevant information
        console.log('Show data for:', data);
      }

      // exportToPDF() {
      //   const data = document.getElementById('export-content'); // Change this ID based on your page container
    
      //   if (data) {
      //     html2canvas(data, { scale: 2 }).then(canvas => {
      //       const imgWidth = 210; // A4 size width in mm
      //       const pageHeight = 297; // A4 size height in mm
      //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      //       let heightLeft = imgHeight;
    
      //       const doc = new jsPDF('p', 'mm', 'a4');
      //       let position = 0;
    
      //       doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      //       heightLeft -= pageHeight;
    
      //       while (heightLeft > 0) {
      //         position = heightLeft - imgHeight;
      //         doc.addPage();
      //         doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      //         heightLeft -= pageHeight;
      //       }
    
      //       doc.save('ContentController_Dashboard.pdf');
      //     });
      //   }
      // }

      exportToPDF() {
        const data = document.getElementById('export-content'); 
      
        if (data) {
          html2canvas(data, { scale: 1.5 }).then(canvas => { // Reduced scale
            const imgWidth = 210; 
            const pageHeight = 297; 
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
      
            const doc = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'a4',
              compress: true // Enable compression
            });
           // doc.addImage(canvas.toDataURL('image/jpeg', 0.07), 'JPEG', 0, position, imgWidth, imgHeight);
           // heightLeft -= pageHeight;
            while (heightLeft > 0) {
             // position = heightLeft - imgHeight;
             //if (position > 0) doc.addPage();
              doc.addImage(canvas.toDataURL('image/jpeg', 0.07), 'JPEG', 0, position, imgWidth, Math.min(heightLeft, pageHeight));
              heightLeft -= pageHeight;
              position += pageHeight;
            }
            doc.save('ContentController_Dashboard.pdf');
          });
        }
      }
}
