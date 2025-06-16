import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { SessionService } from 'src/app/core/Session/session.service';
import { roleComponentIdList } from '../../../shared/comsponent-list';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import CustomStore from 'devextreme/data/custom_store';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, ElementRef } from '@angular/core';

interface ComponentModel {
  id: number;
  name: string;
  description: string;
  status: string;
  mandatory: boolean;
}

interface ComponentGroup {
  MenuItemName: string;
  Components: ComponentModel[];
}
interface ComponentWithMenu {
  menuItemIndex: number;
  menuItemName: string;
  //componentIndex: number;
  id: number;
  name: string;
  description: string;
  status: string;
  mandatory: string;
  rowspan?: number;
}
interface MenuItem {
  menuItemName: string;
  components: ComponentWithMenu[];
}

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
  checked = false;
  //components : any[] = [];
  componentsList: any[] = [];
  @ViewChild('input') input!: ElementRef;
  displayedColumns: string[] = ['menuItemSrNo', 'mainMenuItem', 'components', 'description', 'grantAccess', 'mandatory'];
  dataSource = new MatTableDataSource<ComponentWithMenu>([]); // Specify the type here
  moduleTypes: any[] = []; // Populate this with your module types data
  changecomponents: { [key: number]: boolean } = {}; // Placeholder for tracking disabled state of checkboxes/toggles
  //rolesbymodule:any;
  task_id:number=0;
  subscription: Subscription | undefined;
  selectedcomponents: any[] = [];
  mandatorycomponents : any[] = [];
  createRoleForm!: FormGroup;
  //components: any[];
  //moduletypes = ['Governance', 'Risk', 'Compliance'];
  typemodule: any[] = [];
  sessionData: any;
  erroMessage: any;
  userdata: any = [];
  getModuleTypes:any;
  isMandatory: boolean = false;

  components: ComponentWithMenu[] = [];
  originalData: ComponentWithMenu[] = [];
  //@ViewChild('input') input: ElementRef;
 // components:any;
  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private session: SessionService,
    private encrypt: EncryptionService,
    private role: RoleService,
    public dialog: MatDialog,   
    private formBuilder: FormBuilder,

  ) {
    // this.createRoleForm = this.formBuilder.group({
    //   roleName: ['', Validators.required],
    //   description: [''],
    //   components:this.fb.array([]),
    //   formControlName: [''],
    //   typemodule:['', Validators.required],
    //   radiobutton:['1',Validators.required],
    // });
   // this.selectcompnent();
  }


  ngOnInit(): void {
    let user: any = this.session.getUser();
    // console.log(user)
    this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.createRoleForm = this.formBuilder.group({
    roleName: ['', Validators.required],
    description: '',
    components: '',
    typemodule: ['', Validators.required],
    radiobutton: ['1', Validators.required],
    mandatory: '',
    });
    this.components.forEach(component => {
      component.status === 'Inactive';
      //formControlName.
     // past in mat checkbox( [disabled]="element.status == 'Active'" )
      
    });
    this.getModuleTypes={
      paginate: true,
      store: new CustomStore({
          key: 'task_id',
          loadMode: 'raw',
          load:()=>{return new Promise((resolve, reject) => {
            this.http.get<any[]>(URL + '/TaskMaster/GetTaskMasterDetails', { headers })
            .subscribe(res => {
              (resolve(res));
          
   
             }, (err) => {
               reject(err);
             });
        });
        },
      }),
     };
  }
  
  structureComponents(data: any[]) {
    this.componentsList = data.map(group => {
      if (group.menu_item && group.components && Array.isArray(group.components)) {
        return {
          MenuItemName: group.menu_item,
          Components: group.components.map((component: ComponentModel) => ({
            id: component.id,
            name: component.name,
            description: component.description,
            status: component.status,
            mandatory: component.mandatory
          }))
        };
      } else {
        console.error('Invalid group format:', group);
        return {
          MenuItemName: 'Unknown',
          Components: []
        };
      }
    });
  }
  

  
  
    roleComponentIdList1(role_id: any) {
      let params = new HttpParams()
        .set('module_id', role_id.value)
        //.set('role_id', role_id.value);
       //alert(params)
      this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params })
        .subscribe({
          next: (res) => {
            this.components = res; 
            console.log('typemodule API Response:', res);
          },
          error: (err) => {
            console.error('Error fetching typemodule:', err);
          }
        });
    }

    roleComponentIdList(event: any) {
      this.resetApplyFilter();
      this.selectedcomponents = [];
      this.mandatorycomponents =[];
      const module_id = event.value;
      let params = new HttpParams().set('module_id', module_id);
      this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params })
        .subscribe({
          next: (res) => {
            this.components = this.flattenComponents(res);
            //this.dataSource.data = this.components; // Type of `dataSource.data` matches `ComponentWithMenu[]`
            this.originalData = [...this.components]; // Store a copy of the original data
            this.dataSource = new MatTableDataSource(this.components);
            console.log('typemodule API Response:', res);
          },
          error: (err) => {
            console.error('Error fetching typemodule:', err);
          }
        });
    }

  showInvalidFieldsAlert() {
    let invalidFields = '';    
    
    if (this.createRoleForm.controls['typemodule'].invalid) {
      invalidFields += '- Module Type\n';
    }
    if (this.createRoleForm.controls['roleName'].invalid) {
      invalidFields += '- Role Name\n';
    }

    if (this.createRoleForm.controls['radiobutton'].invalid) {
      invalidFields += '- Select User Role\n';
    }

    if (invalidFields) {
      this.dialog.open(DaidailogeComponent, {
        width: '550px',
        data: {
          message: `Please provide valid information for the following fields:\n${invalidFields}`,
        },
      });
    }
  }

onCheckboxChange(value: any, element: any) {
  if (value.checked === true) {
    //alert(value.checked);

    // Set the changecomponent for the selected component
    this.changecomponents[element.id] = true;

    this.mandatorycomponents.push(element.id);
    const setValue = new Set(this.mandatorycomponents);
    console.log(setValue, 'checked');
    console.log('mandatory component id:', element.id);
  } else {
    // Reset the changecomponent for the unselected component
    this.changecomponents[element.id] = false;

    const indexToRemove = this.mandatorycomponents.indexOf(element.id);
    if (indexToRemove !== -1) {
      this.mandatorycomponents.splice(indexToRemove, 1);
    }
    console.log(this.mandatorycomponents, 'un_Checked');
  }
  console.log('final List after making components Mandatory', this.mandatorycomponents);
}


  changeStatus(value: any, element: any) {
    element.status = value.checked ? 'Active' : 'Inactive';
  
    // Ensure that this.selectedcomponents is initialized as an array if it's not
    this.selectedcomponents = this.selectedcomponents || [];
    
    if (value.checked === true && this.getComponentStatus(element.id) === 'active') {
      this.selectedcomponents.push(element.id);
    } else if (value.checked === false) {
      //[class.inactive-checkbox]="element.status !== 'Active'"

      this.onCheckboxChange({ checked: false }, element);
      const indexToRemove = this.selectedcomponents.indexOf(element.id);
      if (indexToRemove !== -1) {
        this.selectedcomponents.splice(indexToRemove, 1);
      }
    }
  
    console.log('Final List after Grant Access to components', this.selectedcomponents);
  }
  
  
  
  // Replace this with your actual logic to get the status of a component
  getComponentStatus(componentId: any): string {
    // Replace the following line with your actual logic to get the status of a component
    // Assuming 'active', 'inactive', or other statuses are possible
    // element.status should be replaced with the actual property representing the status
    return 'active';
  }

  createRole(data: any) {
    // Accessing the form values
    const roleName = this.createRoleForm.get('roleName')?.value;
    const description = this.createRoleForm.get('description')?.value;
    const typemodule = this.createRoleForm.controls['typemodule'].value 
    const role_type = this.createRoleForm.controls['radiobutton'].value 
    //const task_id = typemodule ? typemodule.element : undefined;
    
    // Log or use the values as needed
    console.log('Role Name:', roleName);
    console.log('Description:', description);
    console.log('typemodule:', typemodule);
    console.log('radiobutton:', role_type);
   
   
       if (this.createRoleForm.invalid) {
         this.showInvalidFieldsAlert();
         return;
       }
       
       // getting AuthId
       let user: any = this.session.getUser();
       this.sessionData = JSON.parse(user);
   
       // payload
       let payload = {
         roleid:0,
         componentid: this.selectedcomponents,
          rolename: roleName,
          description: description,
          task_id: typemodule,
          roletype:role_type,
          created_by:this.userdata.profile.userid.toString(),
          mandatory: this.mandatorycomponents,
                // component: this.selectedcomponents,
       };
   
       console.log('payload', payload);
   
       // encrypted Payload
       let encryptedPayload = {
         requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
       };
       console.log('encryptedPayload', encryptedPayload);
       // Calling Api
       this.http.post(URL + '/RoleDetails/CreateRole', payload)
       .subscribe(
         (response: any) => {
           if (response === '0') {
             this.showSubmitMessage("Role Created successfully.");
            
           } else {
             this.showErrorMessage('Unexpected response: ' + response);
             //console.error('Unexpected response:', response);
           }
         },
         (error: HttpErrorResponse) => {
           if (error.status === 409) {
             this.showErrorMessage("Role Already Exist with the Same Role Name.");
           } else if (error.status === 500) {
             this.showErrorMessage("Fatal error encountered during creation of Role.");
           } else {
             this.showErrorMessage("Fatal error encountered during creation of Role.");
           }
         }
       );
     }

  Cancel(){
    this.router.navigate(['/dashboard/role']);
  }

  showSubmitMessage(message: string) {
    const dialogRef = this.dialog.open(DaidailogeComponent, {
      width: '400px',
      data: { message: message, success: true },
      disableClose: true // Prevents closing the dialog by clicking outside of it
    });
    dialogRef.afterClosed().subscribe(result => {
      // Check if the dialog was closed (i.e., button clicked), then clear all fields
      if (result) {
      this.router.navigate(['dashboard/role']);
      }
      // Perform any additional actions after dialog closed
    });
  }

  showErrorMessage(message: string) {
    const dialogRef = this.dialog.open(DaidailogeComponent, {
      width: '400px',
      data: { message: message, success: false },
      disableClose: true // Prevents closing the dialog by clicking outside of it
    });
    dialogRef.afterClosed().subscribe(result => {
      // Perform any additional actions after dialog closed
      if (result) {
        this.resetForm();
        //this.router.navigate(['dashboard/role']);
        }
    });
  }

  resetForm(): void {
    this.createRoleForm.reset({
      roleName: '',
      description: '',
      componentname: this.fb.array([]),
      typemodule: '',
     // rolenamebymodule: ''
    });
  }

  getRowSpan(menuItemName: string): number {
    return this.components.filter(c => c.menuItemName === menuItemName).length;
  }

  resetApplyFilter() {
    // Clear the input field
    if (this.input && this.input.nativeElement) {
      this.input.nativeElement.value = '';
    }
    // Optionally, call applyFilter with an empty event to reset the filter
    this.applyFilter({ target: { value: '' } } as unknown as Event);
  }

   private flattenComponents(menuItems: MenuItem[]): ComponentWithMenu[] {
    let flattenedComponents: ComponentWithMenu[] = [];
    let currentMenuItemName = '';
    let rowspan = 0;
  
    menuItems.forEach((menuItem, menuItemIndex) => {
      menuItem.components.forEach((component, componentIndex) => {
        if (menuItem.menuItemName !== currentMenuItemName) {
          if (rowspan > 0) {
            flattenedComponents[flattenedComponents.length - rowspan].rowspan = rowspan;
          }
          currentMenuItemName = menuItem.menuItemName;
          rowspan = 1;
        } else {
          rowspan++;
        }
  
        flattenedComponents.push({
          menuItemIndex: menuItemIndex + 1,
          menuItemName: menuItem.menuItemName,
          id: component.id,
          name: component.name,
          description: component.description,
          status: '',
          mandatory: '',
          rowspan: 0 // Initialize rowspan to 0
        });
      });
    });
  
    if (rowspan > 0) {
      flattenedComponents[flattenedComponents.length - rowspan].rowspan = rowspan;
    }
  
    return flattenedComponents;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.data = this.originalData.filter(item => {
      return item.menuItemName.toLowerCase().includes(filterValue) ||
             item.name.toLowerCase().includes(filterValue) ||
             item.description.toLowerCase().includes(filterValue);
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // Update rowspans after filtering
    this.updateRowspans();
  }

  updateRowspans() {
    // First, reset the rowspans on the filtered data
    this.resetRowspans(this.dataSource.data);

    // Then, update rowspans on the filtered data
    const filteredData = this.dataSource.filteredData;
    let currentMenuItemName = '';
    let rowspan = 0;

    filteredData.forEach((item, index) => {
      if (item.menuItemName !== currentMenuItemName) {
        if (rowspan > 0) {
          filteredData[index - rowspan].rowspan = rowspan;
        }
        currentMenuItemName = item.menuItemName;
        rowspan = 1;
      } else {
        rowspan++;
      }

      // Ensure the last item in the filtered list sets the correct rowspan
      if (index === filteredData.length - 1) {
        filteredData[index - rowspan + 1].rowspan = rowspan;
      }
    });

    // Apply changes to the filtered data
    this.dataSource.data = [...filteredData];
  }

  resetRowspans(data: ComponentWithMenu[]) {
    data.forEach(item => {
      item.rowspan = 0; // Reset to the initial value
    });
  }
  
}
