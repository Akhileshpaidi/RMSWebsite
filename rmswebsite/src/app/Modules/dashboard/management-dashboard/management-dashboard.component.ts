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

@Component({
  selector: 'app-management-dashboard',
  templateUrl: './management-dashboard.component.html',
  styleUrls: ['./management-dashboard.component.scss']
})
export class ManagementDashboardComponent implements OnInit {
  totalDepositoryCount: any;
  savedDraftsCount:any;
  discardedDraftsCount:any;
  newlyaddedDocCount:any;
  disabledDocCount:any;
  selected:any;
  dateTypes: string[] = ['Publishing Date', 'Effective Date','Discard Date','Disable Date', 'Acknowledgement Date'];
  selectedDateType: string = '';
  fromDate:any;
  toDate:any;
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
  // dataSource = new MatTableDataSource<any>();
  dataSource :any[]= [];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  selectedDocId: string | null = null;
  public chartData: any[] = [];
  showFirstChartNew=true;
  showSecondChartNew = false;
  showThirdChartNew = false;
  showDocConfChartNew=false;
  showAuthorityChartNew=false;
  showNatureofDocNew=false;
  showReadingTimeNew=false;
  showSecondChart = false;
showThirdChart = false;
showFirstChart=true;
showDocConfChart=false;
showAuthorityChart=false;
showNatureofDoc=false;
showReadingTime=false;
showDisabledFirstChart=true;
showDisabledSecondChart=false;
showDisabledThirdChart=false;
showDisabledDocConfChart=false;
showDisabledAuthorityChart=false;
showDisabledNatureofDoc=false;
showDiscardedDraftFirstChart=true;
docTypeData: any[] = [];
 docCategotyData: any[] = [];
 docSubCategoryData:any[] = [];
 DocConfidentiality:any[]=[];
 flatData: any[] = [];
 DisabledflatData:any[] = [];
 transformedData: any[] = [];
 NatureOfDoc:any;
 DisabledNatureOfDoc:any;
 ReadingTimeData:any[]=[];
 DisableddocTypeData: any[] = [];
 DisableddocCategotyData: any[] = [];
 DisableddocSubCategoryData:any[] = [];
 DisabledDocConfidentiality:any;
 readingTimes: string[] = [];
 docTypeDataNew: any[] = [];
 docCategotyDataNew: any[] = [];
 docSubCategoryDataNew:any[] = [];
 DocConfidentialityNew:any;
 flatDataNew: any[] = [];
 transformedDataNew: any[] = [];
 NatureOfDocNew:any;
 ReadingTimeDataNew:any[]=[];
 readingTimesNew: string[] = [];
 series: any[] = [];
  seriesNew: any[] = [];
  Disabledseries: any[] = [];
  ReadingTimeSeriesNew:any[]=[];
  ReadingTimeSeries:any[]=[];
  constructor(
    private session: SessionService,
    private router: Router,
    private authService: AuthService,
    private role: RoleService,
    private encrypt: EncryptionService,
    private user: UserService
  ) {
    //this.MyActivity();
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
    this.userData = this.session.getUserId();

    //this.dataSource.paginator = this.paginator;
    this.role.DepositoryCount().subscribe((response: any) => {
      this.totalDepositoryCount = response[0].summaryCount;
    });
    this.role.newlyaddedDoc().subscribe((response: any) => {
      this.newlyaddedDocCount = response[0].summaryCount;
    });
    this.role.disabledDoc().subscribe((response: any) => {
      this.disabledDocCount = response[0].summaryCount;
    });
      this.onApiService();
    this.fetchChartData(this.selectedDays);
  }
  selectCard(docId: string): void {
    this.selectedDocId = this.selectedDocId === docId ? null : docId;
  }
  onDatetypeChange(event:MatSelectChange)
  {
    this.selectedDateType=event.value;
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
  goBackToFirstDisabled(): void {
    this.showDisabledFirstChart = true;
    this.showDisabledSecondChart = false;
  }
  // Go back from third chart to second chart
  goBackToSecondDisabled(): void {
    this.showDisabledSecondChart = true;
    this.showDisabledThirdChart = false;
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
  onSubmit(): void {
    this.onApiService();
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
        this.role.getDisabledDocTypeData(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
          data => {
            this.DisableddocTypeData = data;
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
          //   this.flatData = this.transformedData.flatMap(group => group.items);
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
          },
          error => {
            console.error('Error fetching data:', error);
          }
        ); 
        this.role.getReadingTimedata(formattedFromDate, formattedToDate,this.selectedDateType).subscribe(
          (data: any[]) => {
            this.ReadingTimeData=this.transformData(data);
        //     this.ReadingTimeData = data;
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
          //   this.DisabledflatData = this.transformedData.flatMap(group => group.items);
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

    onOptionChange(event: MatSelectChange) {
      if(event.value=='option1')
        {
          this.showFirstChart=true;
          this.showSecondChart=false;
          this.showThirdChart=false;
          this.showDocConfChart=false;
          this.showAuthorityChart=false;
          this.showNatureofDoc=false;
          this.showReadingTime=false;
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
        
          //       doc.save('Management_Dashboard.pdf');
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
          
                doc.save('Management_Dashboard.pdf');
              });
            }
          }
}
