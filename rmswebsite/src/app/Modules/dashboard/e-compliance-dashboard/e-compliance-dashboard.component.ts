import { ChangeDetectorRef, Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { InfoDialogComponent } from 'src/app/Common/daidailoge/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import {ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { EComplianceDataService } from '../e-compliance-data.service';
const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
  interface ComplianceTask {
    entityName: string;
    unitLocationName: string;
    complianceID: string;
    complianceName: string;
    actName: string;
    ruleName: string;
    statutoryForm: string;
    sectionRuleRegulation: string;
    compliancePeriod: string;
    riskClassification: string;
    dueDate: Date;
    compliaanceType: string;
    remedialDate: string;
    categoryLaw: string;
    complianceStage: string;
    entityid: number;
    unitlocationid: number;
    no_of_Attachements: number;
    days_status: string;
    departmentId: number;
    mandatory?: boolean; 
    disabled?: boolean;
    auditWorkflow:string,
    authWorkflow:string,
    review:string,
    approve:string,
  }
  
@Component({
  selector: 'app-e-compliance-dashboard',
  templateUrl: './e-compliance-dashboard.component.html',
  styleUrls: ['./e-compliance-dashboard.component.scss'],
})
export class EComplianceDashboardComponent implements OnInit {
  complianceStageColors: { [key: string]: string } = {
    'Due': 'rgb(157, 191, 241)',
    'Due(RPA)': 'rgb(240, 192, 62)',
    'Overdue': 'rgb(235, 144, 91)',
    'Overdue(RPA)': 'rgb(199, 191, 191)',
    'Remediation In Progress': 'rgb(128, 125, 125)'
  };
  showMandatory = false;
  showNonMandatory = false;
  dataTypes = []; // Populate with actual data
  originalData: any[] = [];  // Store the original data here
 // filteredData: any[] = []; // Store your filtered results
  selectedDays: number | null = null; // Store selected days filter\
  selectedOption3: any[] = [];
  department:any; 
  EntityUnitLocationDepartmentColumns: any[] = [
    { dataField: 'entity_Master_Name', caption: 'Entity' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
    { dataField: 'department_Master_name', caption: 'Department' },
];
  //dataSource = new MatTableDataSource<any>([]);  
  dataSource = new MatTableDataSource<ComplianceTask>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedPage: string = 'dashboard'; // Default to Compliance Dashboard
  displayedColumns: string[] = ['select', 'matCardColumn', 'dueDate', 'compliaanceType', 'remedialDate', 'categoryLaw', 'complianceStage']; // Add other columns as needed
  //displayedColumns: string[] = ['select', 'matCardColumn', 'dueDate', 'complianceType', 'remedialDate', 'categoryLaw', 'complianceStage'];

  selectedItems: Set<any> = new Set<any>();
  // selectedEntity: any[] = [];  // Ensure this is an array for multiple selection
  // selectedUnitLocation: any[] = [];
  // selectedDepartment: any[] = [];

  selectedShowDataFor: any;
//selectedDepartment: string | null = null; // This variable tracks the selected department

  //filterFormGroup: FormGroup;
  //selectedStage: string = '';  
  searchText: string = '';
  selectedOption: string = '0'; // Default to 'Select Action'
  complianceCount: number = 0; 
  searchTerm: string = '';
  selectedDate: Date | null = null;
  selectedDateDetails: Array<{ type: string; description: string }> = [];
  filteredDateDetails: Array<{ type: string; description: string }> = [];
  selectedStage: string | null = null; 
  Useridvalue:any;
  EntityNameDB:any;
  UnitLocationMaster:any;
  EntityID:any;
  Selectedunit:any;
  SelectedEntity:any;
  form1: any;
  ShowDatafords:any;


  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router,private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private complianceDataService: EComplianceDataService) {
    
  const storedData:any = localStorage.getItem('user');
  const parsedData = JSON.parse(storedData);
  
  const Userid = parsedData ? parsedData.profile.userid : null;
    console.log('User id:', Userid);
    this.Useridvalue=Userid;
   }

  ngOnInit(): void {
         this.department={
          paginate: true,
          store: new CustomStore({
            key: 'locationdepartmentmappingid',
            loadMode: 'raw',
            load:()=>{return new Promise((resolve, reject) => {
              this.http.get(URL + '/departmentlocationmapping/GetdepartmentmappingDetails')
                .subscribe(res => {
                 (resolve(res));
      
                }, (err) => {
                  reject(err);
                });
          });
          },
        }),
          
        };

    this.ShowDatafords=[
      {id:30,text:'30 Days'},
      {id:60,text:'60 Days'},
      {id:90,text:'90 Days'},
      {id:180,text:'180 Days'},
    ]

    this.loadComplianceTasks();
    this.dataSource.data = [...this.originalData]; // Set initial data for the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openInfoDialog(item: any) {
    this.dialog.open(InfoDialogComponent, {
      data: {
        item: item,
        complianceStage: item.complianceStage
      }
    });
  }
  
  
  getComplianceStageColor(stage: string): string {
    return this.complianceStageColors[stage] || 'transparent'; // Fallback to transparent if not found
  }

  getCellStyle(stage: string): { [key: string]: string } {
    return {
      'background-color': this.complianceStageColors[stage] || 'transparent',
      'color': 'Black', // Optional: Set the text color
      'border-radius': '20px',
      'padding': '5px 12px',
      'text-align': 'center',
      'display': 'inline-block', // Keep the "button" size small
      'min-width': '80px', // Optional: Set a minimum width for consistency
      'font-size': '14px' // Adjust the font size if needed
    };
  }

  onSelectionChange(event: any): void {
    if (event.value === '2') { // REQUEST TO REMEDIATE
      if (this.selectedItems.size > 0) {
      const selectedCompliance = Array.from(this.selectedItems);
      this.complianceDataService.setRequestToRemediationData(selectedCompliance);
      this.router.navigate(['dashboard/e-compliance-dashboard/RequestToRemediate']);
    } else {
      this.selectedOption = "";
      alert("Select at least one compliance to Request To Remediate.");
    }
    }
  
    if (event.value === '1') { // UPDATE MAPPING COMPLIANCE
      if (this.selectedItems.size > 0) { 
      const selectedCompliance = Array.from(this.selectedItems);
      this.complianceDataService.setUpdateMappingComplianceData(selectedCompliance);
      this.router.navigate(['dashboard/e-compliance-dashboard/update-mapping-compliance']);
    } else {
      alert("Select at least one compliance for Updation.");
      setTimeout(() => {
        this.selectedOption = '0'; // Reset after alert
      });
    }
    }
  }
  

  getSelectedComplianceData() {
    return this.originalData[0]; // Adjust according to your selection logic
  }
  
complianceDetails: { [key: string]: { type: string; description: string }[] } = {
  '2024-09-18': [
    { type: 'Due', description: 'Task A is due.' },
    { type: 'Overdue', description: 'Task B is overdue.' },
  ],
  '2024-09-20': [
    { type: 'Remediation in Progress', description: 'Task C is in progress.' }
  ],
};
  // Return a class for the date based on compliance details
  dateClass = (date: Date): string => {
    const dateString = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.complianceDetails[dateString] ? 'compliance-dot' : '';
  };

  // When a date is selected, update the details and filtered details
  onDateChange(date: Date | null) {
    if (date) {
      const dateString = formatDate(date, 'yyyy-MM-dd', 'en-US');
      this.selectedDateDetails = this.complianceDetails[dateString] || [];
      this.filteredDateDetails = [...this.selectedDateDetails];
    }
  }

  // Filter the mat-cards based on the search input
  filterCards(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDateDetails = this.selectedDateDetails.filter(detail =>
      detail.type.toLowerCase().includes(filterValue) ||
      detail.description.toLowerCase().includes(filterValue)
    );
  }
  
  loadComplianceTasks(): void {
    this.http.get<any[]>(`${URL}/ComplainceListController/GetComplainceListUserWise?userid=${this.Useridvalue}`)
      .subscribe(
        (data) => {
          this.originalData = data.map(item => ({
            entityName: item.entity_Master_Name,
            unitLocationName: item.unit_location_Master_name,
            complianceID: item.compliance_id,
            complianceName: item.compliance_name,
            actName: item.actregulatoryname,
            ruleName: item.act_rule_name,
            statutoryForm: item.compliance_name,
            sectionRuleRegulation: item.section_rule_regulation_ref,
            compliancePeriod: item.complaincePeriod,
            riskClassification: item.riskClassification,
            dueDate: item.due_date,
            complianceType: item.compliance_type_name,
            remedialDate: item.proposed_remedial_comply_date,  // Add handling if needed
            categoryLaw: item.law_Categoryname,
            complianceStage: item.complianceStage,
            compliance_status: item.compliance_status,
            entityid: item.entityid,
            unitlocationid: item.unitlocationid,
            no_of_Attachements: item.no_of_Attachements,
            days_status: item.days_status,
            departmentId: item.departmentid,
            mandatory:item.mandatory,
            compliance_stage_progress:item.compliance_stage_progress,
            compliance_description:item.compliance_description,
            auditWorkflow:item.auditWorkflow,
            authWorkflow:item.authWorkflow,
            review_Workflow:item.review_Workflow,
            approve_Workflow:item.approve_Workflow,
            location_department_mapping_id:item.location_department_mapping_id
            //Include_Review_Approve_by_Same_User,
          }));
  
          this.dataSource.data = [...this.originalData];
          this.complianceCount = this.dataSource.data.length;
         // console.log(JSON.stringify(this.dataSource.data))
        },
        (error) => {
          console.error('Error fetching compliance tasks:', error);
        }
      );
  }
  
// Method to handle filtering based on selections
filterData1(): void {
  let filteredData = [...this.originalData]; // Start with the original unfiltered data
  console.log("original data : ", filteredData);
//alert(JSON.stringify(filteredData))
//console.log("Selected entity1: ", filteredData);
  // Apply compliance stage filter
  if (this.selectedStage) {
    const stageFilterMap: { [key: string]: string } = {
      due: 'Due',
      dueRPA: 'Due(RPA)',
      overdue: 'Overdue',
      overdueRPA: 'Overdue(RPA)',
      remediation: 'Remediation In Progress',
    };

    const complianceStageFilter = stageFilterMap[this.selectedStage];
    if (complianceStageFilter) {
      filteredData = filteredData.filter(item => item.complianceStage === complianceStageFilter);
     // this.complianceCount = filteredData.length;
    }
  }
  this.dataSource.data = filteredData; // Update the data source with the filtered data
  this.complianceCount = this.dataSource.data.length;
  console.log("After Filter:" , this.dataSource.data)
}

filterData(): void {
  let filteredData = [...this.originalData];

  // Filter by Compliance Stage
  if (this.selectedStage) {
    const stageFilterMap: { [key: string]: string } = {
      due: 'Due',
      dueRPA: 'Due(RPA)',
      overdue: 'Overdue',
      overdueRPA: 'Overdue(RPA)',
      remediation: 'Remediation In Progress',
    };
    const complianceStageFilter = stageFilterMap[this.selectedStage];
    if (complianceStageFilter) {
      filteredData = filteredData.filter(item => item.complianceStage === complianceStageFilter);
    }
  }

// Filter by Mandatory/Non-Mandatory
  if (this.showMandatory) {
    filteredData = filteredData.filter(item => item.mandatory === true);
  } else if (this.showNonMandatory) {
    filteredData = filteredData.filter(item => item.mandatory === false);
  }

  //  Filter by Department
  const selectedIds = this.selectedOption3.map(id => Number(id));
  if (selectedIds.length > 0) {
    filteredData = filteredData.filter(item => selectedIds.includes(Number(item.location_department_mapping_id)));
  }

  //  Filter by Days (Show Data For)
  if (this.selectedDays != null) {
    const today = new Date(); // Define today's date
    filteredData = filteredData.filter(item => {
      if (item.dueDate) {
        const dueDate = new Date(item.dueDate);
        const diffInDays = Math.ceil(
          (today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
        );
  
        console.log(
          `Due Date: ${dueDate.toDateString()}, Diff: ${diffInDays}, Selected Days: ${this.selectedDays}`
        );
  
        // Correct condition to get previous due dates within selectedDays
        return diffInDays <= (this.selectedDays ?? 0) && diffInDays > 0;
      }
      return false; // Skip if no valid due date
    });
  
    console.log('Filtered Data:', filteredData);
  }
  
  
  
  
  
    // if (this.selectedDays !== null) {
    //   filteredData = filteredData.filter(item => Number(item.days_status) === Number(this.selectedDays));
    // }

  //  Search Filter
  if (this.searchText && this.searchText.trim() !== '') {
    
    const searchTextLower = this.searchText.toLowerCase();
    
     filteredData = filteredData.filter(item =>
      Object.values(item).some(value => {
        if (typeof value === 'string' || value instanceof String) {
          return value.toString().toLowerCase().includes(searchTextLower);
        }
        return JSON.stringify(value).toLowerCase().includes(searchTextLower);
      })
    );
  }
  // Set filtered data
  this.dataSource.data = filteredData;
  this.complianceCount = this.dataSource.data.length;
}

onDaysChanged(event: any): void {
  this.selectedDays = event.value || null; // Update selected days
  this.filterData(); // Apply filters after selection
}


onRefresh(): void {
  this.selectedOption3 = []; // Clear department selection
  this.selectedDays = null; // Clear days selection
  this.selectedStage = null; // Clear compliance stage selection
  this.showMandatory = false;
  this.showNonMandatory = false;

  this.dataSource.data = [...this.originalData]; // Reset data
  this.complianceCount = this.dataSource.data.length;
}

performSearch(): void {
  if (!this.searchText || this.searchText.trim() === '') {
    return; 
  }
  this.filterData(); // Call filtering function
}

resetSearch(): void {
  this.searchText = ''; 
  this.filterData(); // Reset filters to original state
}

searchComplianceTasks(): void {
  this.filterData(); 
}



selectStage(stage: string): void {
  this.selectedStage = (this.selectedStage === stage) ? null : stage; // Toggle stage selection
  this.filterData(); // Call filterData to apply the selected filters
}

clearFilters(): void {
  this.selectedStage = null; // Reset selected stage
  this.department = []; // Reset selected department
  this.selectedShowDataFor = null; // Reset show data for
  this.filterData(); // Call filterData to reset the displayed data
}
// Method to check if a stage is selected for highlighting
SelectedStage(stage: string): boolean {
  return this.selectedStage === stage;
}

mandatoryCheckboxChange(type: string): void {
  if (type === 'mandatory') {
    this.showMandatory = !this.showMandatory; 
    if (this.showMandatory) {
      this.showNonMandatory = false;  
    }
  } else if (type === 'nonMandatory') {
    this.showNonMandatory = !this.showNonMandatory;  
    if (this.showNonMandatory) {
      this.showMandatory = false;  
    }
  }

  // if (!this.showMandatory && !this.showNonMandatory) {
  //   filteredData = [...this.originalData];  
  // }

  this.filterData(); 
}

  getDaysStatus(dueDate: string | Date | null): string {
    if (!dueDate) {
      return 'NA'; // If no due date, show NA
    }
  
    const dueDateObj = new Date(dueDate);
    const today = new Date();
  
    // Reset time to midnight for accurate day comparison
    dueDateObj.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    // Calculate difference in days
    const timeDiff = dueDateObj.getTime() - today.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
  
    if (daysDiff < 0) {
      return `Overdue by ${Math.abs(daysDiff)} days`;
    } else if (daysDiff === 0) {
      return '0 Remaining days'; // Show 0 days if the due date is today
    } else {
      return `${daysDiff} Remaining days`;
    }
  }
  
  // toggleAll(event: MatCheckboxChange) {
  //   if (event.checked) {
  //     this.dataSource.data.forEach(item => this.selectedItems.add(item));
  //   } else {
  //     this.selectedItems.clear();
  //   }
  // }
  toggleAll(event: MatCheckboxChange) {
    if (event.checked && !this.isMandatorySelected()) {
      // Select all non-mandatory items if no mandatory item is selected
      this.dataSource.data.forEach(item => {
        if (!item.mandatory) {
          this.selectedItems.add(item);
        }
      });
    } else if (event.checked && this.isMandatorySelected()) {
      // Select all mandatory items if a mandatory item is already selected
      this.dataSource.data.forEach(item => {
        if (item.mandatory) {
          this.selectedItems.add(item);
        }
      });
    } else {
      // Deselect all
      this.selectedItems.clear();
    }
  }

  // Logic to show items based on checkbox selection
  shouldShowItem(item: any): boolean {
    if (this.showMandatory && item.isMandatory) {
      return true;
    } else if (this.showNonMandatory && !item.isMandatory) {
      return true;
    }
    return false;
  }
  onCheckboxChange(event: MatCheckboxChange, item: any) {
    if (event.checked) {
      this.selectedItems.add(item);
    } else {
      this.selectedItems.delete(item);
    }
    this.dataSource.data.forEach(compliance => {
      compliance.disabled = this.shouldDisableCheckbox(compliance);
    });
  }
  
  isMandatorySelected(): boolean {
    return Array.from(this.selectedItems).some(item => item.mandatory === true);
  }

  shouldDisableCheckbox(item: any): boolean {
    // If a mandatory item is selected, disable non-mandatory items
    if (this.isMandatorySelected()) {
      return !item.mandatory; // Disable non-mandatory items
    }
    // If a non-mandatory item is selected, disable mandatory items
    if (this.selectedItems.size > 0 && Array.from(this.selectedItems).some(item => item.mandatory === false)) {
      return item.mandatory; // Disable mandatory items
    }
    return false; // Enable other items when nothing is selected
  }

  isAllSelected() {
    return this.dataSource.data.length > 0 && this.dataSource.data.every(item => this.selectedItems.has(item));
  }

  isSomeSelected() {
    return this.selectedItems.size > 0 && !this.isAllSelected();
  }

  isSelected(item: any) {
    return this.selectedItems.has(item);
  }
  
  public formatTime1(time: Date): string {
    // Format time function (you can customize this)
    return time.toISOString().substring(11, 16);
  }
  }
