import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/core/encryption.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { SessionService } from 'src/app/core/Session/session.service';
//import { roleComponentIdList } from '../../../shared/comsponent-list';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { ActivatedRoute } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
// interface ComponentWithMenu extends Component {
//   menuItemIndex: number;
//   menuItemName: string;
//   componentIndex: number;
// }
// interface MenuItem {
//   menuItemName: string;
//   components: Component[];
// }
interface MenuItem {
  menuItemName: string;
  components: ComponentWithMenu[];
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

const URL = BASE_URL;
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'text/plain');

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss'],
})
export class UpdateRoleComponent implements OnInit {
 // components = roleComponentIdList;
  //selectedcomponents: any[] = [];
  //components : any[] = [];
  checked: any;
  roleData: any;
  userdata: any = [];
  getModuleTypes:any;
  components: ComponentWithMenu[] = [];
  originalData: ComponentWithMenu[] = [];
  //rolesbymodule:any
  task_id:number=0;
  subscription: Subscription | undefined;
  sessionData: any;
  erroMessage: any;
  updateRoleForm:FormGroup; 
  user = { role_id: 1 }; // Example user object with role_id
  showMandatoryColumn = false;
  selectedcomponents: any = [];
  private popStateHandler: () => void;
  c: any = [];
  r: any = [];
  displayedColumns: string[] = ['menuItemSrNo', 'mainMenuItem', 'components', 'description', 'grantAccess', 'mandatory'];
  //displayedColumns: string[] = ['menuItemSrNo', 'mainMenuItem', 'srNo', 'components', 'description', 'grantAccess', 'mandatory'];
  dataSource = new MatTableDataSource<ComponentWithMenu>([]); // Specify the type here
  givenaccess: any;
  componentData: any = [];
  roleid: any = [];
  componentids:any=[];
  roleDetails: any;
  changecomponents: { [key: string]: boolean } = {};
  mandatorycomponents : any[] = [];
  constructor(private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private encrypt: EncryptionService,
    private role: RoleService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.showMandatoryColumn = this.user.role_id === 1;
    this.updateRoleForm = this.fb.group({
      roleName: [''],  // default value as empty string
      description: [''],
      componentname: this.fb.array([]),
      typemodule:['',],
      //rolenamebymodule:['',]
    });
    this.popStateHandler = () => {
      this.resetForm();
    };
    window.addEventListener('popstate', this.popStateHandler);
}


  ngOnInit(): void {
    this.existing_roleComponentIdList();
    let user: any = this.session.getUser();
    // console.log(user)
    this.userdata = JSON.parse(user);//userdata.profile.userid
    console.log("userid",this.userdata.profile.userid)
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }
      this.components.forEach(component => {
        component.status = component.mandatory === 'yes' ? 'Active' : 'Inactive';
      });

    this.components.forEach(component => {
      const isChecked = component.status === 'Active';
      const isDisabled = component.mandatory === 'yes';
      (this.updateRoleForm.get('componentname') as FormArray).push(this.fb.control({ value: isChecked, disabled: isDisabled }));
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
     
   // this.existing_roleComponentIdList();//moved to top ngOnInit
    // this.selectRole();
  }
  // ngOnDestroy(): void {
  //   // Remove the popstate event listener
  //   window.removeEventListener('popstate', this.popStateHandler);
  // }
  resetForm(): void {
    this.updateRoleForm.reset({
      roleName: '',
      description: '',
      componentname: this.fb.array([]),
      typemodule: '',
     // rolenamebymodule: ''
    });
  }

  existing_roleComponentIdList1() {
    const module_id = localStorage.getItem('taskid') ?? '';
    const params = new HttpParams().set('module_id', module_id);
    
    this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params }).subscribe({
      next: (res) => {
        this.components = this.flattenComponents(res);
        this.dataSource.data = this.components;
        this.selectRole();
        console.log('typemodule API Response:', res);
      },
      error: (err) => {
        console.error('Error fetching typemodule:', err);
      }
    });
  }
  existing_roleComponentIdList() {
    const module_id = localStorage.getItem('taskid') ?? '';
    const params = new HttpParams().set('module_id', module_id);

    this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params }).subscribe({
      next: (res) => {
        this.components = this.flattenComponents(res);
        this.originalData = [...this.components]; // Store a copy of the original data
        this.dataSource = new MatTableDataSource(this.components);
        this.selectRole();
        console.log('typemodule API Response:', res);
      },
      error: (err) => {
        console.error('Error fetching typemodule:', err);
      }
    });
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
  selectRole() {
    const roleId = localStorage.getItem('roleid');
    const url = `${URL}/RoleDetails/GetRoleComponentsByID?roleId=${roleId}`;
    
    this.http.get<any>(url, { headers }).subscribe({
      next: (res) => {
        this.roleData = res;
        console.log('Role API Response:', res);
        this.updateRoleForm.controls['roleName'].setValue(this.roleData.roleName || '');
        this.updateRoleForm.controls['description'].setValue(this.roleData.roleDesc || '');
        this.updateRoleForm.controls['typemodule'].setValue(this.roleData.typemodule || '');

        if (res.componentDetails && Array.isArray(res.componentDetails)) {
          res.componentDetails.forEach((detail: { componentIds: number, mandatory: string }) => {
            const matchingComponent = this.components.find(component => component.id === detail.componentIds);
            if (matchingComponent) {
              matchingComponent.status = 'Active';
              this.selectedcomponents.push(matchingComponent.id);
              matchingComponent.mandatory = detail.mandatory;

              if (detail.mandatory === 'yes') {
                this.mandatorycomponents.push(matchingComponent.id);
                this.onCheckboxChange({ checked: true }, matchingComponent);
              }

              const index = this.components.findIndex(component => component.id === detail.componentIds);
              if (index !== -1) {
                this.components[index] = matchingComponent;
              }
            }
          });
        } else {
          console.error('Component IDs are not provided in the expected format');
        }
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });
  }

  

  showInvalidFieldsAlert() {
    let invalidFields = '';    

    if (this.updateRoleForm.controls['roleName'].invalid) {
      invalidFields += '- Role Name\n';
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
  // getRoles(event: any) {
  //   alert(event.value)
  //   let module_id = event.value;
  //   this.task_id = module_id;
  //     this.subscription = this.http.get(URL + '/RoleDetails/GetRolesListBy/'+ this.task_id , { headers })
  //       .subscribe(res => {
  //         this.rolesbymodule = res;
  //       }, error => {
  //         console.error('Error fetching rules:', error);
  //       });
    
  // }
  // roleComponentIdList(role_id: any) {
  //   let params = new HttpParams()
  //     .set('module_id', this.task_id)
  //     .set('role_id', role_id.value);
  //     alert(params)
  //   this.http.get<any[]>(URL + '/RoleDetails/GetComponentsList/', { headers, params })
  //     .subscribe({
  //       next: (res) => {
  //         this.components = res; 
  //         console.log('typemodule API Response:', res);
  //       },
  //       error: (err) => {
  //         console.error('Error fetching typemodule:', err);
  //       }
  //     });
  // }
    
 onCheckboxChange(event: any, element: any) {
    if (event.checked) {
      this.changecomponents[element.id] = true;
      if (!this.mandatorycomponents.includes(element.id)) {
        this.mandatorycomponents.push(element.id);
      }
    } else {
      this.changecomponents[element.id] = false;
      const indexToRemove = this.mandatorycomponents.indexOf(element.id);
      if (indexToRemove !== -1) {
        this.mandatorycomponents.splice(indexToRemove, 1);
      }
    }

    console.log('final List after making components Mandatory', this.mandatorycomponents);
  }

    //  onCheckboxChange(value: any, element: any) {
    //   if (value.checked === true) {
    //    // alert(JSON.stringify(element));
    //     this.changecomponents[element.id] = true;
    //     let present = this.mandatorycomponents.includes(element.id);
    //     if (!present) {
    //       this.mandatorycomponents.push(element.id);
    //     }
    //     const setValue = new Set(this.mandatorycomponents);
    //     //console.log(setValue, 'checked');
    //     //console.log('mandatory component id:', element.id);
    //   } else {
    //     this.changecomponents[element.id] = false;
    //     const indexToRemove = this.mandatorycomponents.indexOf(element.id);
    //     if (indexToRemove !== -1) {
    //       this.mandatorycomponents.splice(indexToRemove, 1);
    //     }
    //     console.log(this.mandatorycomponents, 'un_Checked');
    //   }

    //   console.log('final List after making components Mandatory', this.mandatorycomponents);
    // }
    changeStatus(event: any, element: any) {
      if (event.checked) {
        if (this.getComponentStatus(element.id) === 'Active') {
          this.selectedcomponents.push(element.id);
        }
      } else {
        this.onCheckboxChange({ checked: false }, element);
        element.status = 'InActive';
        const indexToRemove = this.selectedcomponents.indexOf(element.id);
        if (indexToRemove !== -1) {
          this.selectedcomponents.splice(indexToRemove, 1);
        }
      }
  
      this.selectedcomponents.forEach((selectedComponentId: any) => {
        const matchingComponent = this.components.find(component => component.id === selectedComponentId);
        if (matchingComponent) {
          matchingComponent.status = 'Active';
          console.log(`Updated ID: ${matchingComponent.id}, Name: ${matchingComponent.name}, New Status: ${matchingComponent.status}`);
        }
      });
  
      console.log('final List after status change', this.selectedcomponents);
    }

  // changeStatus(value: any, element: any)
  //  {
  //   console.log('pre-existing roles', this.selectedcomponents);
  
  //   this.selectedcomponents = this.selectedcomponents || [];
  
  //   if (value.checked === true)
  //    {
  //     if (this.getComponentStatus(element.id) === 'Active') {
  //       //alert(element.id)
  //       this.selectedcomponents.push(element.id);
  //       //alert(this.selectedcomponents)
  //     } 
  //    // this.selectedcomponents.element.status=='Active'
  //     const setValue = new Set(this.selectedcomponents);
  //     console.log(setValue, 'add');
  //   } else if (value.checked === false) {
  //     // Remove the componentid from the list if it exists
  //    this.onCheckboxChange({ checked: false }, element);
  //     element.status='InActive';
  //     const indexToRemove = this.selectedcomponents.indexOf(element.id);
  //     if (indexToRemove !== -1) {
  //       this.selectedcomponents.splice(indexToRemove, 1);
  //     }
  //     console.log(this.selectedcomponents, 'remove');
  //   }
  //   // Now, you can update the status of the selected components in your local array (this.components)
  //   this.selectedcomponents.forEach((selectedComponentId: any) => {
  //     const matchingComponent = this.components.find(component => component.id === selectedComponentId);
  //     //this.selectedcomponents.element.status=='Active'

  //     //to see updated components in litst
  //     if (matchingComponent) {
  //       // Update the status of the matching component
  //       this.selectedcomponents.status=='Active'

  //       matchingComponent.status = 'Active'; // Replace 'NewStatus' with your desired new status
  //       console.log(`Updated ID: ${matchingComponent.id}, Name: ${matchingComponent.name}, New Status: ${matchingComponent.status}`);
  //     }
  //   });
  
  //   console.log('final List after status change', this.selectedcomponents);
  // }

  

  // Replace this with your actual logic to get the status of a component
  getComponentStatus(componentId: any): string {
    // Replace the following line with your actual logic to get the status of a component
    // Assuming 'active', 'inactive', or other statuses are possible
    // element.status should be replaced with the actual property representing the status
    return 'Active';
  }
  
  updateRole(data: any) {
    // Accessing the form values
    const roleName = this.updateRoleForm.get('roleName')?.value;
    const description = this.updateRoleForm.get('description')?.value;
    //const selectedComponents = this.createRoleForm.get('components')?.value;
    
    // Log or use the values as needed
    console.log('Role Name:', roleName);
    console.log('Description:', description);
   //alert(data);
       if (this.updateRoleForm.invalid) {
         this.showInvalidFieldsAlert();
         return;
       }
       
       // getting AuthId
       let user: any = this.session.getUser();
       this.sessionData = JSON.parse(user);
   

       let payload = {
        roleid: localStorage.getItem('roleid'), // Convert to integer using parseInt
        componentid: this.selectedcomponents,
        rolename: roleName,
        description: description,
        mandatory: this.mandatorycomponents,
        updated_by: this.userdata.profile.userid.toString(), // Convert to string using toString
      };
      
       console.log('payload', payload);
   
       // encrypted Payload
       let encryptedPayload = {
         requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
       };
      //console.log('encryptedPayload', encryptedPayload);
   
       // Calling Api
       this.http.put(URL + '/RoleDetails/UpdateRoleComponents', payload)
       .subscribe(
        (response: any) => {
          if (response === '0') {
            this.showSubmitMessage("Role Updated successfully.");
           
          } else {
            this.showErrorMessage('Unexpected response: ' + response);
            //console.error('Unexpected response:', response);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.showErrorMessage("Role Already Exist with the Same Role Name.");
          } else if (error.status === 500) {
            this.showErrorMessage("Fatal error encountered during Updation of Role Details.");
          } else {
            this.showErrorMessage("Fatal error encountered during Updation of Role Details.");
          }
        }
      );
     }


  Cancel(){
    this.router.navigate(['/dashboard/role'], { queryParams: { reload: true }});
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
        this.resetForm();
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
      if (result) {
        this.resetForm();
        this.router.navigate(['dashboard/role']);
        }
      // Perform any additional actions after dialog closed
    });
  }
}
