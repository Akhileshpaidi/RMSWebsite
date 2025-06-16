import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { InfoDialogComponent } from 'src/app/Common/daidailoge/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {BASE_URL} from 'src/app/core/Constant/apiConstant';
import { EComplianceDataService } from '../e-compliance-data.service';

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-remediate-compliance-task',
  templateUrl: './remediate-compliance-task.component.html',
  styleUrls: ['./remediate-compliance-task.component.scss']
})
export class RemediateComplianceTaskComponent implements OnInit {
  complianceStageColors: { [key: string]: string } = {
    'Extension Applied': 'rgb(157, 191, 241)',
    'Remediation Applied': 'rgb(235, 144, 91)',
  };
  dataTypes = []; // Populate with actual data
  originalData: any[] = [];  // Store the original data here
  dataSource = new MatTableDataSource<any>([]);
  selectedPage: string = 'dashboard'; // Default to Compliance Dashboard
  displayedColumns: string[] = ['select', 'matCardColumn', 'dueDate', 'compliaanceType', 'remedialDate', 'categoryLaw', 'complianceStage']; 
  selectedDays: number | null = null; // Store selected days filter\
  selectedOption3: any[] = [];
  department:any; 
  selectedItems: Set<any> = new Set<any>();
  selectedStage: string | null = null; 
  selectedShowDataFor: any;
  searchText: string = '';
  selectedOption: string = '0';
  complianceCount: number = 0; 
  Useridvalue:any;
  selectedItem: any = null;
  ShowDatafords:any;
  EntityUnitLocationDepartmentColumns: any[] = [
    { dataField: 'entity_Master_Name', caption: 'Entity' },
    { dataField: 'unit_location_Master_name', caption: 'Unit Location' },
    { dataField: 'department_Master_name', caption: 'Department' },
];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router,private http: HttpClient, private complianceDataService: EComplianceDataService) { 

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
    


  }

  1(item: any): void {
    this.dialog.open(InfoDialogComponent, {
      width: '400px',  // Adjust the width as needed
      data: item  // Pass the entire item to the dialog
    });
  }
  openInfoDialog(item: any) {
    this.dialog.open(InfoDialogComponent, {
      data: {
        item: item,
        complianceStage: item.complianceStage
      }
    });
  }

  onSelectionChange(event: any): void {
    if (event.value === '1') { // REQUEST TO REMEDIATE
      if (this.selectedItems.size > 0) {
        const selectedCompliance = Array.from(this.selectedItems);
        this.complianceDataService.setUpdateMappingComplianceData(selectedCompliance);
        this.router.navigate(['dashboard/e-compliance-dashboard/ApproveToRemediate']);
      }
      else{
        alert("Please select Compliance to Perform Approve Remediate");
        setTimeout(() => {
          this.selectedOption = '0'; // Reset after alert
        });

      }
    }
  }

  getComplianceStageColor(stage: string): string {
    return this.complianceStageColors[stage] || 'transparent'; // Fallback to transparent if not found
  }

  getCellStyle1(stage: string): { [key: string]: string } {
    return {
      'background-color': this.complianceStageColors[stage] || 'transparent',
      'border-radius': '20px',
      'margin': '0 12px',
      'padding': '8px', // Optional: Adjust padding for better alignment
      'color': 'white', // Optional: Change text color if needed
      'text-align': 'center' // Optional: Center text in the cell
    };
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
  loadComplianceTasks(): void {
    this.http.get<any[]>(`${URL}/ComplainceListController/GetRemidationComplainceListUserWise?userid=${this.Useridvalue}`)
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
          remedialDate: item.proposed_remedial_comply_date,  
          categoryLaw: item.law_Categoryname,
          complianceStage: item.compliance_stage_progress,
          entityid: item.entityid,
          unitlocationid: item.unitlocationid,
          no_of_Attachements: item.no_of_Attachements,
          days_status: item.days_status,
          departmentId: item.departmentid,
          rpa_request_date:item.rpa_request_date,
          remediation_request_remarks :item.remediation_request_remarks,
          remediation_plan_id:item.remediation_plan_id,
          compliance_status:item.compliance_status,
          effective_EndDate:item.effective_EndDate,
          auditWorkflow:item.auditWorkflow,
          authWorkflow:item.authWorkflow,
          compliance_stage_progress:item.compliance_stage_progress,
          compliance_description:item.compliance_description,
          location_department_mapping_id:item.location_department_mapping_id
        }));

        this.dataSource.data = [...this.originalData];
        this.complianceCount = this.dataSource.data.length;
      },
      (error) => {
        console.error('Error fetching compliance tasks:', error);
      }
    );

    this.dataSource.data = [...this.originalData];
    this.complianceCount = this.dataSource.data.length;
  }
  onDaysChanged(event: any): void {
    this.selectedDays = event.value || null; // Update selected days
    this.filterData(); // Apply filters after selection
  }

  filterData(): void {
    let filteredData = [...this.originalData];
  
    // Filter by Compliance Stage
    if (this.selectedStage) {
      const stageFilterMap: { [key: string]: string } = {
        ExtensionApplied: 'Extension Applied',
        RemediationApplied: 'Remediation Applied',
      };
      const complianceStageFilter = stageFilterMap[this.selectedStage];
      if (complianceStageFilter) {
        filteredData = filteredData.filter(item => item.complianceStage === complianceStageFilter);
      }
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

  onRefresh(): void {
    this.selectedOption3 = []; // Clear department selection
    this.selectedDays = null; // Clear days selection
    this.selectedStage = null; 
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
  // filterData(stage: string): void {
  //   this.selectedStage = stage;  
  //   switch (stage) {
  //     case 'Extension Applied':
  //       this.dataSource.data = this.originalData.filter(item => item.complianceStage === 'Extension Applied');
  //       this.complianceCount = this.dataSource.data.length;
  //       break;
  //     case 'Remediation Applied':
  //       this.dataSource.data = this.originalData.filter(item => item.complianceStage === 'Remediation Applied');
  //       this.complianceCount = this.dataSource.data.length;
  //       break;
  //       case 'clear':
  //         this.dataSource.data = this.originalData;
  //         this.complianceCount = this.dataSource.data.length;
  //         break;
  //     default:
  //       this.dataSource.data = this.originalData;
  //       this.complianceCount = this.dataSource.data.length;
  //       break;
  //   }
  // }

  onRadioChange(item: any) {
    this.selectedItem = item; // Store only the selected item
    this.selectedItems.clear(); // Clear previous selections
    this.selectedItems.add(item); // Add only the new selection
  }
  
  isSelected(item: any): boolean {
    return this.selectedItem === item;
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
  }
