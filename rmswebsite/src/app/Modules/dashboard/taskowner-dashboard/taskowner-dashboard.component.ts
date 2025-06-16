import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import activitiesData from '../../../Common/dummy-data/activities.json';
import { SessionService } from 'src/app/core/Session/session.service';
import { Router,ActivatedRoute } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSelectChange } from '@angular/material/select';
import DataSource from 'devextreme/data/data_source';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-taskowner-dashboard',
  templateUrl: './taskowner-dashboard.component.html',
  styleUrls: ['./taskowner-dashboard.component.scss']
})
export class TaskownerDashboardComponent implements OnInit {
  // fromDate: string = '';
  // toDate: string = '';
  selectedTabIndex = 0;
  selected:any;
  dateTypes: string[] = ['Publishing Date', 'Effective Date', 'Acknowledgement Date', 'Reading Date'];
  selectedDateType: string = '';
  fromDate:any;
  toDate:any;
  public chartData: any[] = [];
  // dataSource = new MatTableDataSource<any>();
  dataSource:any[]=[];
  selectedDocId: string | null = null;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  displayedColumns = ['srno', 'Title_Doc', 'Doc_Confidentiality', 'Eff_Date', 'Doc_process_Owner','Doc_Approver'];
  sessionData: any;
  erroMessage: any;
  totalDepositoryCount: any;
  newlyaddedDocCount:any;
  userData:any;
  TOdocTypeData: any[] = [];
 TOdocCategotyData: any[] = [];
 TOdocSubCategoryData:any[] = [];
 TOdocTypeDataART: any[] = [];
 TOdocCategotyDataART: any[] = [];
 TOdocSubCategoryDataART:any[] = [];
 TOdocTypeDataDPR: any[] = [];
 TOdocCategotyDataDPR: any[] = [];
 TOdocSubCategoryDataDPR:any[] = [];
  docTypeData: any[] = [];
 docCategotyData: any[] = [];
 docSubCategoryData:any[] = [];
 DocConfidentiality:any;
 flatData: any[] = [];
 transformedData: any[] = [];
 NatureOfDoc:any;
 ReadingTimeData:any[]=[];
 readingTimes: string[] = [];
 AckreqStatus:any[]=[];
 docTypeDataNew: any[] = [];
 docCategotyDataNew: any[] = [];
 docSubCategoryDataNew:any[] = [];
 DocConfidentialityNew:any;
 flatDataNew: any[] = [];
 transformedDataNew: any[] = [];
 NatureOfDocNew:any;
 ReadingTimeDataNew:any[]=[];
 readingTimesNew: string[] = [];
 selectedOption: any;
 selectedOptionNew: any;
 selectedAckOption:any;
 selectedARTOption:any;
 selectedDPROption:any;
  options = [
    { value: 'option1', viewValue: 'DocType,Category,SubCategory' },
    { value: 'option2', viewValue: 'Doc Confidentiality' },
    { value: 'option3', viewValue: 'Authority Type' },
    { value: 'option4', viewValue: 'Nature of Doc' },
    { value: 'option5', viewValue: 'Average Indicative Reading Time' },
    // { value: 'option6', viewValue: 'SavedDrafts DocType,Category,SubCategory' },
    // { value: 'option7', viewValue: 'DiscardedDraft DocType,Category,SubCategory' }
  ];
  optionsNew = [
    { value: 'option1', viewValue: 'DocType,Category,SubCategory' },
    { value: 'option2', viewValue: 'Doc Confidentiality' },
    { value: 'option3', viewValue: 'Authority Type' },
    { value: 'option4', viewValue: 'Nature of Doc' },
    { value: 'option5', viewValue: 'Average Indicative Reading Time' },
  ];
  Ackoptions = [
    { value: 'option1', viewValue: 'Acknowledgement Request-Summary' },
    { value: 'option2', viewValue: 'Acknowledgement Request-Doc Type' },
  ];
  ARToptions = [
    { value: 'option1', viewValue: 'Average Reading Time-Summary' },
    { value: 'option2', viewValue: 'Average Reading Time-Doc Type ' },
  ];
  DPRoptions = [
    { value: 'option1', viewValue: 'Documents-Summary with Pending Status' },
    { value: 'option2', viewValue: 'Document Pending Reading-Doc Type ' },
  ];
  Disabledoptions = [
    { value: 'option1', viewValue: 'DocType,Category,SubCategory' },
    { value: 'option2', viewValue: 'Doc Confidentiality' },
    { value: 'option3', viewValue: 'Authority Type' },
    { value: 'option4', viewValue: 'Nature of Doc' },
  ];
  timeRanges = [
    { label: 7, value: 7 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 420, value: 420 }
  ];
  AcktimeRanges = [
    { label: 7, value: 7 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 420, value: 420 }
  ];
  ArttimeRanges = [
    { label: 7, value: 7 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 60, value: 60 },
    { label: 90, value: 90 },
    { label: 420, value: 420 }
  ];

  selectedDays: number = 7;
  AckselectedDays: number = 7;
  ArtselectedDays: number = 7;
  showFirstDPRChart=true;
  showFirstDoctypeChartDPR=false;
  showSecondDoctypeChartDPR=false;
  showThirdDoctypeChartDPR=false;
  showFirstARTChart=true;
  showFirstARTDoctypeChart=false;
  showFirstDoctypeChartART=false;
  showSecondDoctypeChartART=false;
  showThirdDoctypeChartART=false;
  showFirstAckChart=true;
  showSecondAckChart=false;
  showFirstDoctypeChart=false;
  showSecondDoctypeChart=false;
  showThirdDoctypeChart=false;
  showSecondChart = false;
  showThirdChart = false;
  showFirstChart=true;
  showFirstChartNew=true;
  showSecondChartNew = false;
  showThirdChartNew = false;
  showDocConfChart=false;
  showAuthorityChart=false;
  showNatureofDoc=false;
  showReadingTime=false;
  showDocConfChartNew=false;
  showAuthorityChartNew=false;
  showNatureofDocNew=false;
  showReadingTimeNew=false;
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
  value:any;
  totalRequested:any;
  totalAcknowledged:any;
  ARTvalue:any;
  Actual:any;
  Indicative:any;
  TODPRData:any;
  series: any[] = [];
  seriesNew: any[] = [];
  ReadingTimeSeriesNew:any[]=[];
  ReadingTimeSeries:any[]=[];
  constructor(
    private session: SessionService,
    private router: Router,
    private authService: AuthService,
    private role: RoleService,
    private encrypt: EncryptionService,
    private user: UserService,
    private route: ActivatedRoute,
  ) {
    //this.MyActivity();
  }
  
  ngOnInit() {
    // Check if there is a tab query param in the URL
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'monitored') {
        this.selectedTabIndex = 1; // Set to "Monitored Tasks"
      } else {
        this.selectedTabIndex = 0; // Default to "My Tasks"
      }
    });
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
    if (this.options.length > 0) {
      this.selectedOption = this.options[0].value;
    }
    if (this.optionsNew.length > 0) {
      this.selectedOptionNew = this.optionsNew[0].value;
    }
    if (this.Ackoptions.length > 0) {
      this.selectedAckOption = this.Ackoptions[0].value;
    }
    if (this.ARToptions.length > 0) {
      this.selectedARTOption = this.ARToptions[0].value;
    }
    if (this.DPRoptions.length > 0) {
      this.selectedDPROption = this.DPRoptions[0].value;
    }
    this.userData = this.session.getUserId();
    this.onApiService();
    // this.fetchChartData(this.selectedDays);
    // this.fetchChartDataAck(this.AckselectedDays);
    // this.fetchChartDataArt(this.ArtselectedDays);

    // console.log('User ID:', this.userData);
    // alert(JSON.stringify(this.userData))
    //this.dataSource.paginator = this.paginator;
    // this.role.TaskownerDepositoryCount().subscribe((response: any) => {
    //   this.totalDepositoryCount = response[0].summaryCount;
    // });
    // this.role.TaskownerDepositoryCount(this.userData).subscribe(
    //   data => {
    //     this.totalDepositoryCount = data[0].summaryCount;
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    // this.role.newlyaddedDoc().subscribe((response: any) => {
    //   this.newlyaddedDocCount = response[0].summaryCount;
    // });
    // this.role.TaskownerAllpublishedDoc(this.userData,this.selectedDateType).subscribe(
    //   data => {
    //     const data1: Document[]=data;
    //     this.dataSource=data;
    //     // this.dataSource.data = data1;
    //     // this.dataSource.paginator = this.paginator;
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    // this.role.TaskownerDocSummaryCount(this.userData).subscribe(
    //   data => {
    //     this.chartData = data.map((item :any)=> ({
    //       ...item,
    //       displayText: `${item.reviewStatusName} (${item.status_Count})`
    //     }));
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    this.role.TaskownerDocTypeDataNew(this.userData,this.selectedDays).subscribe(
      data => {
        this.docTypeDataNew = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    //Published Documents
    // this.role.TaskownerDocTypeData(this.userData,this.selectedDateType).subscribe(
    //   data => {
    //     this.docTypeData = data;
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );

    // this.role.TODocAuthorityData(this.userData).subscribe(
    //   data => {
    //     this.transformedData = data.reduce((acc: any[], item:any) => {
    //       let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
    //       if (!group) {
    //         group = { authorityTypeName: item.authorityTypeName, items: [] };
    //         acc.push(group);
    //       }
    //       group.items.push(item);
    //       return acc;
    //     }, []);
  
    //     // Flatten the data for the chart
    //     this.flatData = this.transformedData.flatMap(group => group.items);
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    this.role.TODocAuthorityDataNew(this.userData,this.selectedDays).subscribe(
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
      // data => {
      //   this.transformedDataNew = data.reduce((acc: any[], item:any) => {
      //     let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
      //     if (!group) {
      //       group = { authorityTypeName: item.authorityTypeName, items: [] };
      //       acc.push(group);
      //     }
      //     group.items.push(item);
      //     return acc;
      //   }, []);
  
      //   // Flatten the data for the chart
      //   this.flatDataNew = this.transformedDataNew.flatMap(group => group.items);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

    //Acknowledgement Requested Data
    this.role.TOAckReqSummary(this.userData,this.AckselectedDays).subscribe(
      (data: any) => {
        this.AckreqStatus = data.map((item :any)=> ({
          ...item,
          displaydoc_AckStatus: `${item.acknowledment} (${item.count})`
        }));
      
        //this.ReadingTimeData = data;
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
  //   this.totalRequested = 200; // Example data
  // this.totalAcknowledged = 150; // Example data
  // this.value = (this.totalAcknowledged / this.totalRequested) * 100; // Calculate percentage
  //Acknowledgement Requested Documents
  this.role.TaskownerDocTypeDataAckreq(this.userData,this.AckselectedDays).subscribe(
    data => {
      this.TOdocTypeData = data;
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );

   //Average Reading Time Data
   this.role.TOARTReqSummary(this.userData,this.ArtselectedDays).subscribe(
    (data: any) => {
       alert(JSON.stringify(data))
      //this.ReadingTimeData = data;
      this.Actual=data.Actual;
      this.Indicative=data.Indicative;
      this.ARTvalue = (this.Indicative / this.Actual) * 100; // Calculate percentage
       // Get unique indicative_reading_time values for the series generation
  //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
  this.role.TaskownerDocTypeDataART(this.userData,this.ArtselectedDays).subscribe(
    data => {
      this.TOdocTypeDataART = data;
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
  }
  onArtTimeRangeChange(event: any): void {
    this.fetchChartDataArt(event.value);
  }
  fetchChartDataArt(days: number): void {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
    const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    this.ArtselectedDays=days;
    //this.role.getTOARTReqSummaryLD(formattedFromDate, formattedToDate,this.userData,days).subscribe(
    this.role.TOARTReqSummary(this.userData,days).subscribe(
      (data: any) => {
        // alert(JSON.stringify(data))
        //this.ReadingTimeData = data;
        this.Actual=data[0].Actual;
        this.Indicative=data[0].Indicative;
        this.ARTvalue = (this.Indicative / this.Actual) * 100; // Calculate percentage
         // Get unique indicative_reading_time values for the series generation
    //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.role.TaskownerDocTypeDataART(this.userData,days).subscribe(
      data => {
        this.TOdocTypeDataART = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // this.role.getTaskownerDocTypeDataARTLD(formattedFromDate, formattedToDate,this.userData,days).subscribe(
    //   data => {
    //     this.TOdocTypeDataART = data;
    //   },
    //   error => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
  }
  onAckTimeRangeChange(event: any): void {
    this.fetchChartDataAck(event.value);
  }
  fetchChartDataAck(days: number): void {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
    const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    this.AckselectedDays=days;
    //this.role.getTOAckReqSummaryLD(formattedFromDate, formattedToDate,this.userData,days).subscribe(
      this.role.TOAckReqSummary(this.userData,days).subscribe(
      data => {
        this.AckreqStatus = data.map((item :any)=> ({
          ...item,
          displaydoc_AckStatus: `${item.acknowledment} (${item.count})`
        }));
        //this.ReadingTimeData = data;
        // this.totalRequested=data[0].total_requested;
        // this.totalAcknowledged=data[0].total_acknowledged;
        // this.value = (this.totalAcknowledged / this.totalRequested) * 100; // Calculate percentage
         // Get unique indicative_reading_time values for the series generation
    //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

    //this.role.getTaskownerDocTypeDataAckreqLD(formattedFromDate, formattedToDate,this.userData,days).subscribe(
    this.role.TaskownerDocTypeDataAckreq(this.userData,days).subscribe(
      data => {
        this.TOdocTypeData = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    
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
    const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    
    this.selectedDays=days;
    this.role.getTaskownerDocTypeDataNew(this.userData,days).subscribe(
      data => {
        this.docTypeDataNew = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

    this.role.getTODocConfidentialityDataNew(formattedFromDate, formattedToDate,this.userData,days).subscribe(
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

    this.role.getTODocAuthorityDataNew(formattedFromDate, formattedToDate,this.userData,days).subscribe(
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
      // data => {
      //   this.transformedDataNew = data.reduce((acc: any[], item:any) => {
      //     let group = acc.find(g => g.authorityTypeName === item.authorityTypeName);
      //     if (!group) {
      //       group = { authorityTypeName: item.authorityTypeName, items: [] };
      //       acc.push(group);
      //     }
      //     group.items.push(item);
      //     return acc;
      //   }, []);
  
      //   // Flatten the data for the chart
      //   this.flatDataNew = this.transformedDataNew.flatMap(group => group.items);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.role.getTONatureofDocdataNew(formattedFromDate, formattedToDate,this.userData,days).subscribe(
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
    //     this.ReadingTimeDataNew = data;
    // this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // this.http.get<any[]>(`/api/chart-data?days=${days}`).subscribe(data => {
    //   this.chartData = data;
    //   this.updateChart();
    // });
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
goBackToFirstDocChart(): void {
  this.showFirstDoctypeChart = true;
  this.showSecondDoctypeChart = false;
}
// Go back from third chart to second chart
goBackToSecondDocChart(): void {
  this.showSecondDoctypeChart = true;
  this.showThirdDoctypeChart = false;
}
goBackToFirstDocChartART(): void {
  this.showFirstDoctypeChartART = true;
  this.showSecondDoctypeChartART = false;
}
// Go back from third chart to second chart
goBackToSecondDocChartART(): void {
  this.showSecondDoctypeChartART = true;
  this.showThirdDoctypeChartART = false;
}
goBackToFirstDocChartDPR(): void {
  this.showFirstDoctypeChartDPR = true;
  this.showSecondDoctypeChartDPR = false;
}
// Go back from third chart to second chart
goBackToSecondDocChartDPR(): void {
  this.showSecondDoctypeChartDPR = true;
  this.showThirdDoctypeChartDPR = false;
}
customizeLabel = (pointInfo: any) => {
  return `${pointInfo.argumentText}: ${pointInfo.valueText}`;
};
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
getFilteredDataNew() {
  return this.ReadingTimeDataNew.filter(item => item.time_period && item.indicative_reading_time);
}
selectCard(docId: string): void {
  this.selectedDocId = this.selectedDocId === docId ? null : docId;
}

  onSubmit(): void {
    this.onApiService();
  }

  onApiService()
  {
           const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    const selectedDatetype=this.selectedDateType;
    //const docid='1';
    // this.role.getTOnewlyaddedDoc().subscribe((response: any) => {
    //   this.newlyaddedDocCount = response[0].summaryCount;
    // });
    this.role.TaskownerDepositoryCount(this.userData).subscribe(
      data => {
        this.totalDepositoryCount = data[0].summaryCount;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    if (formattedFromDate && formattedToDate) {
      this.role.getTOnewlyaddedDoc(formattedFromDate,formattedToDate,this.userData).subscribe(
        data => {
          this.newlyaddedDocCount = data[0].summaryCount;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getTaskownerAllpublishedDoc(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
        data => {
          const data1: Document[]=data;
          this.dataSource=data;
          // this.dataSource.data = data1;
          // this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getTaskownerDocSummaryCount(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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

      this.role.getTaskownerDocTypeData(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
        data => {
          this.docTypeData = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      // this.role.getTaskownerDocTypeDataAckreq(formattedFromDate, formattedToDate,this.userData).subscribe(
      //   data => {
      //     this.TOdocTypeData = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
      // this.role.getTaskownerDocTypeDataART(formattedFromDate, formattedToDate,this.userData).subscribe(
      //   data => {
      //     this.TOdocTypeDataART = data;
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
      
      // this.role.getTODocConfidentialityData(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
      // this.role.getTODocAuthorityDataNew(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
      // this.role.getTONatureofDocdata(formattedFromDate, formattedToDate,this.userData).subscribe(
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
      // this.role.getTOReadingTimedata(formattedFromDate, formattedToDate,this.userData).subscribe(
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
//---------------------------------------------------------------------------
      this.role.getTODocConfidentialityData(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
      this.role.getTODocAuthorityData(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
        // data => {
        //   this.transformedData = data.reduce((acc: any[], item:any) => {
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
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );

      this.role.getTONatureofDocdata(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
      this.role.getTOReadingTimedata(formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
        (data: any[]) => {
          this.ReadingTimeData=this.transformData(data);
      //     this.ReadingTimeData = data;
      // this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      // this.role.getTOAckReqSummary(formattedFromDate, formattedToDate,this.userData).subscribe(
      //   data => {
      //     //this.ReadingTimeData = data;
      //     this.AckreqStatus = data.map((item :any)=> ({
      //       ...item,
      //       displaydoc_AckStatus: `${item.Acknowledment} (${item.count})`
      //     }));
      //     // this.totalRequested=data[0].total_requested;
      //     // this.totalAcknowledged=data[0].total_acknowledged;
      //     // this.value = (this.totalAcknowledged / this.totalRequested) * 100; // Calculate percentage
      //      // Get unique indicative_reading_time values for the series generation
      // //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
      //   },
      //   error => {
      //     console.error('Error fetching data:', error);
      //   }
      // );
       //Average Reading Time Data
  //  this.role.getTOARTReqSummary(formattedFromDate, formattedToDate,this.userData).subscribe(
  //   (data: any) => {
  //     this.Actual=data[0].Actual;
  //     this.Indicative=data[0].Indicative;
  //     this.ARTvalue = (this.Indicative / this.Actual) * 100; // Calculate percentage
  //      // Get unique indicative_reading_time values for the series generation
  // //this.readingTimes = [...new Set(data.map((item:any) => item.indicative_reading_time))];
  //   },
  //   error => {
  //     console.error('Error fetching data:', error);
  //   }
  // );
     
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

  onAckOptionChange(event: MatSelectChange) {
    if(event.value=='option1')
      {
        this.showFirstAckChart=true;
        this.showFirstDoctypeChart=false;
      }
      else if(event.value=='option2')
        {
          this.showFirstAckChart=false;
          this.showFirstDoctypeChart=true;
        }
  }
  onARTOptionChange(event: MatSelectChange) {
    if(event.value=='option1')
      {
        this.showFirstARTChart=true;
        this.showFirstDoctypeChartART=false;
      }
      else if(event.value=='option2')
        {
          this.showFirstARTChart=false;
          this.showFirstDoctypeChartART=true;
        }
  }
  onDPROptionChange(event: MatSelectChange) {
    if(event.value=='option1')
      {
        this.showFirstDPRChart=true;
        this.showFirstDoctypeChartDPR=false;
      }
      else if(event.value=='option2')
        {
          this.showFirstDPRChart=false;
          this.showFirstDoctypeChartDPR=true;
        }
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
        // this.showSavedDraftFirstChart=false;
        // this.showSavedDraftSecondChart=false;
        // this.showSavedDraftThirdChart=false;
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
      // this.showSavedDraftFirstChart=false;
      // this.showSavedDraftSecondChart=false;
      // this.showSavedDraftThirdChart=false;
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
        // this.showSavedDraftFirstChart=false;
        // this.showSavedDraftSecondChart=false;
        // this.showSavedDraftThirdChart=false;
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
        //   this.showSavedDraftFirstChart=false;
        //   this.showSavedDraftSecondChart=false;
        //  this.showSavedDraftThirdChart=false;
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
            // this.showSavedDraftFirstChart=false;
            // this.showSavedDraftSecondChart=false;
            // this.showSavedDraftThirdChart=false;
          }
          
  }

  onFirstChartClicks(e: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
           const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstChart=false;
    this.showSecondChart=true;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getTaskownerDocCategoryData(DocTypeID,formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
          const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstChart=false;
    this.showSecondChart=false;
    this.showThirdChart=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getTaskownerDocSubCategoryData(DocCategoryID,formattedFromDate, formattedToDate,this.userData,this.selectedDateType).subscribe(
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
  onFirstChartClicksNew(e: any) {
     if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
          const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    
    
    this.showFirstChartNew=false;
    this.showSecondChartNew=true;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getTaskownerDocCategoryDataNew(DocTypeID,formattedFromDate, formattedToDate,this.userData,this.selectedDays).subscribe(
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
           const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstChartNew=false;
    this.showSecondChartNew=false;
    this.showThirdChartNew=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getTaskownerDocSubCategoryDataNew(DocCategoryID,formattedFromDate, formattedToDate,this.userData,this.selectedDays).subscribe(
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
  onFirstDocChartClicks(e: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
          const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstAckChart=false;
    this.showFirstDoctypeChart=false;
    this.showSecondDoctypeChart=true;
    this.showThirdDoctypeChart=false;
    const DocTypeID=e.target.data.docTypeID;
    //this.role.getTaskownerDocCategoryDataAckreq(DocTypeID,formattedFromDate, formattedToDate,this.userData,this.AckselectedDays).subscribe(
    this.role.getTaskownerDocCategoryDataAckreq(DocTypeID,this.userData,this.AckselectedDays).subscribe(
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
           const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstAckChart=false;
    this.showFirstDoctypeChart=false;
    this.showSecondDoctypeChart=false;
    this.showThirdDoctypeChart=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    //this.role.getTaskownerDocSubCategoryDataAckreq(DocCategoryID,formattedFromDate, formattedToDate,this.userData,this.AckselectedDays).subscribe(
    this.role.getTaskownerDocSubCategoryDataAckreq(DocCategoryID,this.userData,this.AckselectedDays).subscribe(
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

  // Average Reading Time
  onFirstDocChartClicksART(e: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
    const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    this.showFirstARTChart=false;
    this.showFirstDoctypeChartART=false;
    this.showSecondDoctypeChartART=true;
    this.showThirdDoctypeChartART=false;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getTaskownerDocCategoryDataART(DocTypeID,this.userData,this.ArtselectedDays).subscribe(
      data => {
        this.TOdocCategotyDataART = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    const clickedBarData = e.target.data;
    console.log('Clicked bar data:', clickedBarData);
  }

  onSecondDocChartClicksART(data: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
    const formattedFromDate = formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US');
    const formattedToDate = formatDate(this.toDate, 'yyyy-MM-dd', 'en-US');
    this.showFirstARTChart=false;
    this.showFirstDoctypeChartART=false;
    this.showSecondDoctypeChartART=false;
    this.showThirdDoctypeChartART=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getTaskownerDocSubCategoryDataART(DocCategoryID,this.userData,this.ArtselectedDays).subscribe(
      data => {
        this.TOdocSubCategoryDataART = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // You can use the `data` from the clicked bar to fetch or display relevant information
    console.log('Show data for:', data);
  }
  // Document Pending Reading
  onFirstDocChartClicksDPR(e: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
           const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstDPRChart=false;
    this.showFirstDoctypeChartDPR=false;
    this.showSecondDoctypeChartDPR=true;
    this.showThirdDoctypeChartDPR=false;
    const DocTypeID=e.target.data.docTypeID;
    this.role.getTaskownerDocCategoryDataDPR(DocTypeID,formattedFromDate, formattedToDate,this.userData).subscribe(
      data => {
        this.TOdocCategotyDataDPR = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    const clickedBarData = e.target.data;
    console.log('Clicked bar data:', clickedBarData);
  }

  onSecondDocChartClicksDPR(data: any) {
    if (this.fromDate == undefined) {
      this.fromDate=null;
    } 
    if (this.toDate == undefined) {
      this.toDate=null;
    } 
          const formattedFromDate = formatDate(new Date(this.fromDate), 'yyyy-MM-dd', 'en-US');
const formattedToDate = formatDate(new Date(this.toDate), 'yyyy-MM-dd', 'en-US');
    this.showFirstDPRChart=false;
    this.showFirstDoctypeChartDPR=false;
    this.showSecondDoctypeChartDPR=false;
    this.showThirdDoctypeChartDPR=true;
    const DocCategoryID=data.target.data.doc_CategoryID;
    this.role.getTaskownerDocSubCategoryDataDPR(DocCategoryID,formattedFromDate, formattedToDate,this.userData).subscribe(
      data => {
        this.TOdocSubCategoryDataDPR = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    // You can use the `data` from the clicked bar to fetch or display relevant information
    console.log('Show data for:', data);
  }
  exportToPDF1() {
    const data = document.getElementById('export-content');
  
    if (data) {
      html2canvas(data, { scale: 1.5 }).then(canvas => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        const doc = new jsPDF('p', 'mm', 'a4');
        let yPosition = 10; // Initial Y position
  
        if (imgHeight <= pageHeight) {
          // Chart fits in a single page
          doc.addImage(canvas.toDataURL('image/png', 0.07), 'PNG', 0, yPosition, imgWidth, imgHeight);
        } else {
          // If the chart is too large, split it into multiple pages
          let heightLeft = imgHeight;
          let position = 0;
  
          while (heightLeft > 0) {
            doc.addImage(canvas.toDataURL('image/png', 0.07), 'PNG', 0, position, imgWidth, Math.min(heightLeft, pageHeight));
            heightLeft -= pageHeight;
            if (heightLeft > 0) {
              doc.addPage();
              position = 0;
            }
          }
        }
  
        // Save the PDF only after adding necessary pages
        doc.save('Task_Owner_Dashboard.pdf');
      });
    }
  }

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
  
        doc.save('Task_Owner_Dashboard.pdf');
      });
    }
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

  //       doc.save('Task_Owner_Dashboard.pdf');
  //     });
  //   }
  // }

}
