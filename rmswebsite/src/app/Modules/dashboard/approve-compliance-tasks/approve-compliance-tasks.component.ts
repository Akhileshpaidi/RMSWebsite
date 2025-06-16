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
  selector: 'app-approve-compliance-tasks',
  templateUrl: './approve-compliance-tasks.component.html',
  styleUrls: ['./approve-compliance-tasks.component.scss']
})
export class ApproveComplianceTasksComponent {
  complianceStageColors: { [key: string]: string } = {
    'approvalDue': 'rgb(157, 191, 241)',
    'approvalOverdue': 'rgb(235, 144, 91)',
    'Unknown': 'rgb(240, 192, 62)',
  };
  showMandatory = false;
  showNonMandatory = false;
  entityNames = []; // Populate with actual data
  unitLocations = []; // Populate with actual data
  departments = []; // Populate with actual data
  dataTypes = []; // Populate with actual data
  originalData: any[] = [];  // Store the original data here
  selectedEntity: number[] = [];
   selectedUnitLocation: number[] = [];
   selectedDepartment: number[] = []; // Changed to an array
  filteredData: any[] = []; // Store your filtered results
  //dataSource = new MatTableDataSource<any>([]);  
  dataSource = new MatTableDataSource<ComplianceTask>([]);
  expectedDays: number = 0; 
  selectedOption3: any[] = [];
  department:any; 
  selectedDays: number | null = null; // Store selected days filter\
  EntityUnitLocationDepartmentColumns: any[] = [
    { dataField: 'entity_Master_Name', caption: 'Entity' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
    { dataField: 'department_Master_name', caption: 'Department' },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedPage: string = 'dashboard'; // Default to Compliance Dashboard
  displayedColumns: string[] = ['select', 'matCardColumn', 'dueDate', 'complianceUpdateDate', 'approveDueDate', 'complianceStage']; // Add other columns as needed
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
  selectedStage: string | null = null; // This variable tracks the currently selected stage
  Useridvalue:any;
  ShowDatafords:any;


  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router,private http: HttpClient, private changeDetectorRef: ChangeDetectorRef, private complianceDataService: EComplianceDataService,) {
    
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
      {id:1,text:'30 Days'},
      {id:2,text:'60 Days'},
      {id:3,text:'90 Days'},

      {id:4,text:'180 Days'},

    ]
    //this.loadAlertReminders();
    this.loadComplianceTasks();
    this.dataSource.data = [...this.originalData]; // Set initial data for the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
// Fetch unit locations based on the 
    // this.Departmentmaster={
    //   paginate: true,
    //   store: new CustomStore({
    //       key: 'Value',
    //       loadMode: 'raw',
    //       load:()=>{return new Promise((resolve, reject) => {
    //         this.http.get(URL + '/DepartmentMaster/GetDepartmentMasterDetails', {headers})
    //           .subscribe(res => {
    //            (resolve(res));
    
    //           }, (err) => {
    //             reject(err);
    //           });
    //     });
    //     },
    //   }),
    // };
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
getComplianceStage(approvaerDueDateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const approvalDueDate = new Date(approvaerDueDateStr);
  approvalDueDate.setHours(0, 0, 0, 0); 

  if (today < approvalDueDate) {
    return 'Approval Due';
  } else {
    return 'Approval Overdue';
  }
}
  onSelectionChange(event: any): void {
    if (event.value === '1') { 
      if (this.selectedItems.size > 0) {
        const selectedCompliance = Array.from(this.selectedItems);
        
        // Set data in service
        this.complianceDataService.setReviewUpdateComplianceData(selectedCompliance);
        
        // Backup data in localStorage
        localStorage.setItem('reviewComplianceData', JSON.stringify(selectedCompliance));
  
        this.router.navigate(['dashboard/e-compliance-dashboard/ReviewReviewerCompliance']);
      } else {
        this.selectedOption = "";
        alert("Select at least one compliance to review.");
      }
    }
  }
  
  getSelectedComplianceData() {
    return this.originalData[0]; 
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
    this.http.get<any[]>(`${URL}/ApproverCompliance/GetApproveComplianceListUserWise?userid=${this.Useridvalue}`)
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
              remedialDate: "",  // Add handling if needed
              categoryLaw: item.law_Categoryname,
              compliance_status: item.compliance_status,
              entityid: item.entityid,
              unitlocationid: item.unitlocationid,
              no_of_Attachements: item.no_of_Attachements,
              days_status: item.days_status,
              departmentId: item.departmentid,
              mandatory: item.mandatory,
              compliance_stage_progress: item.compliance_stage_progress,
              compliance_description: item.compliance_description,
              auditWorkflow: item.auditWorkflow,
              authWorkflow: item.authWorkflow,
              review_Workflow: item.review_Workflow,
              approve_Workflow: item.approve_Workflow,
              complainceUpdatedDate: item.complainceUpdatedDate,
              //complaincApproveDueDate: approveDate.toISOString(), 
              approve_status:item.approve_status,
              applicability_status: item.applicability_status,
              actual_complied_date: item.actual_complied_date,
              amount_paid: item.amount_paid,
              penalty_paid: item.penalty_paid,
              updation_remarks: item.updation_remarks,
              update_compliance_id: item.update_compliance_id,
              location_department_mapping_id:item.location_department_mapping_id,
              files: item.updatefiledocuments.map((doc: any) => ({
                id: doc.id,
                update_compliance_id: doc.update_compliance_id,
                fileName: doc.file_name,
                fileType: doc.file_type,
                filePath: URL + doc.file_path,
                attachmentNature: doc.nature_of_attachment
              }))
            }));

          this.dataSource.data = [...this.originalData];
          this.complianceCount = this.dataSource.data.length;
        },
        (error) => {
          console.error('Error fetching compliance tasks:', error);
        }
      );
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  loadAlertReminders(): void {
    this.http.get<any[]>(`${URL}/AlertsAndreminder/GetApproveAlertReminders`)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.expectedDays = data[0].expectedDays; 
          } else {
            console.log('No alert reminders found.');
          }
        },
        (error) => {
          console.error('Error fetching alert reminders:', error);
        }
      );
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
    this.loadAlertReminders();
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

filterData1(): void {
  this.filteredData = [...this.originalData];
  if (this.selectedStage) {
    const today = new Date();

    this.filteredData = this.filteredData.filter(item => {
      const reviewDueDate = new Date(item.complaincApproveDueDate);
      if (this.selectedStage === 'approvalDue') {
        return today < reviewDueDate;
      } else if (this.selectedStage === 'approvalOverdue') {
        return today >= reviewDueDate;
      }
      return true;
    });
  }

  // Filter by Entity
  if (this.selectedEntity && this.selectedEntity.length > 0) {
      this.filteredData = this.filteredData.filter(item =>
          this.selectedEntity.includes(item.entityid)
      );
      //console.log("After Entity: ", this.filteredData);
  }

  // Filter by Unit Location
  if (this.selectedUnitLocation && this.selectedUnitLocation.length > 0) {
      this.filteredData = this.filteredData.filter(item =>
          this.selectedUnitLocation.includes(item.unitlocationid)
      );
     // console.log("After Unit Locations: ", this.filteredData);
  }

  // Filter by Department
  if (this.selectedDepartment.length > 0) {
      this.filteredData = this.filteredData.filter(item =>
          this.selectedDepartment.includes(item.departmentId)
      );
     // console.log("After Department: ", this.filteredData);
  }
  if (this.showMandatory) {
    this.filteredData = this.filteredData.filter(item => item.mandatory === true);
  } else if (this.showNonMandatory) {
    this.filteredData = this.filteredData.filter(item => item.mandatory === false);
  }
  if (!this.showMandatory && !this.showNonMandatory) {
    //alert("khbcf")
    //this.filteredData = [...this.originalData];
  }

  this.dataSource.data = this.filteredData;
  this.complianceCount = this.dataSource.data.length;
}

filterData(): void {
  let filteredData = [...this.originalData];

  if (this.selectedStage) {
    const stageFilterMap: { [key: string]: string } = {
      approvalDue: 'approvalDue',
      approvalOverdue: 'approvalOverdue',
    };
    const complianceStageFilter = stageFilterMap[this.selectedStage];
    if (complianceStageFilter) {
      filteredData = filteredData.filter(item => item.approve_status === complianceStageFilter);
    }
  }
  //  Filter by Department
  const selectedIds = this.selectedOption3.map(id => Number(id));
  if (selectedIds.length > 0) {
    filteredData = filteredData.filter(item => selectedIds.includes(Number(item.location_department_mapping_id)));
  }

  //  Filter by Days (Show Data For)
  if (this.selectedDays !== null) {
    filteredData = filteredData.filter(item => Number(item.days_status) === Number(this.selectedDays));
  }

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

  if (!this.showMandatory && !this.showNonMandatory) {
    this.filteredData = [...this.originalData];  
  }

  this.filterData(); 
}

onDepartmentChange(event: any): void {
  //console.log("Selected Department: ", event.value);
  this.selectedDepartment = event.value; // Should now be an array
  this.filterData();
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

  toggleAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.dataSource.data.forEach(item => this.selectedItems.add(item));
    } else {
      this.selectedItems.clear();
    }
  }

  onCheckboxChange(event: MatCheckboxChange, item: any) {
    if (event.checked) {
      this.selectedItems.add(item);
    } else {
      this.selectedItems.delete(item);
    }
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