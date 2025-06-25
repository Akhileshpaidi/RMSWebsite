import { Component, OnInit, ViewChild,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { SessionService } from 'src/app/core/Session/session.service';
import {
  ComponentIdList,
  getAccess as GA,
  getSubAccess as GSA,
  getSubMenuAccess as GSMA,
} from '../../shared/comsponent-list';
import { routes } from './dashboard-routing.module';
import { RoleService } from 'src/app/core/services/role/role.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { MatSidenav } from '@angular/material/sidenav';
import { DxPopupModule  } from 'devextreme-angular';
import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  selectedModule: string = '';
  expandedPanel: string | null = null; 
  expandedPanel1: string | null = null; //menuItem
  activeComponentLink: string | null = null;
  routes = routes;
  data: any = [];
  sessionData: any;
  erroMessage: any;
  dashboardData: any;
  filderData: any;
  isMenuOpen = false;
  constructor(private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private authService: AuthService,
    private role: RoleService,
    private encrypt: EncryptionService
  ) {
  
// for generating batch compliance
 this.http.get(URL + '/BatchComplianceGeneration/CreateBatchCompanyCompliance', {})
     .subscribe((response: any) => {
       console.log('Data Updated Succefully ', response);
       // Handle the response from the server if needed
      // window.alert('Data Updated Successfully');
     
    
     },
     (error: any) => {
      
      console.log('Error Saving Data');
     });

  }

  getAccess = GA;

  getSubAccess = GSA;
  getSubMenuAccess = GSMA;

  ngOnInit(): void {
    let user: any = this.session.getUser();
    this.data = JSON.parse(user);
   // alert(JSON.stringify(this.data.profile.isFirstLogin));
    if (!this.session.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    if (this.data?.profile?.isFirstLogin === 0) {
      this.router.navigate(['/forcechangepassord']);
      return;
    }
    //this.setDefaultModule();
    const savedModule = sessionStorage.getItem('selectedModule');
  
    if (savedModule) {
      this.selectedModule = savedModule;
 
    } else {
      this.setDefaultModule();
    }

// for links to keep open on reload also
    const saved = sessionStorage.getItem('expandedPanel');
    this.activeComponentLink = sessionStorage.getItem('activeComponentLink');
    this.expandedPanel = saved;


    if (this.activeComponentLink) {
      this.router.navigateByUrl(this.activeComponentLink);
    }
    this.expandedPanel1 = sessionStorage.getItem('expandedPanel1');

    // for navigation of particular route After login based on the taskid or selectedModule
    // Navigate only if current route is dashboard root

  // ✅ 2. Navigate only if you're at the root of dashboard (after login)
  if (this.router.url === '/dashboard' || this.router.url === '/dashboard/') {
    let routeToNavigate = '';

    switch (this.selectedModule) {
      case 'GOVERNace': routeToNavigate = 'home'; break;
      case 'e-COMPLIANCE': routeToNavigate = 'commonadminhome'; break;
      case 'grcHAWK': routeToNavigate = 'userlist'; break;
      case 'Risk': routeToNavigate = 'commonadminhome'; break;
      default: routeToNavigate = ''; break;
    }

    if (routeToNavigate) {
      //alert(JSON.stringify(routeToNavigate))
      this.router.navigate([`/dashboard/${routeToNavigate}`]);
    }
  }
  }

  setExpandedPanel(label: string,): void {
    this.expandedPanel = label;
    sessionStorage.setItem('expandedPanel', label);
  }
  
  clearExpandedPanel(label: string): void {
    const current = sessionStorage.getItem('expandedPanel');
    if (current === label) {
      this.expandedPanel = null;
      sessionStorage.removeItem('expandedPanel');
    }
  }
  setExpandedPanel1(menuItem: string,): void {
    this.expandedPanel1 = menuItem;
    sessionStorage.setItem('expandedPanel', menuItem);
  }
  
  clearExpandedPanel1(menuItem: string): void {
    const current = sessionStorage.getItem('expandedPanel');
    if (current === menuItem) {
      this.expandedPanel1 = null;
      sessionStorage.removeItem('expandedPanel');
    }
  }
  setActiveComponent(link: string): void {
    this.activeComponentLink = link;
    sessionStorage.setItem('activeComponentLink', link);
  }
  logout() {
    sessionStorage.removeItem('selectedModule');
    sessionStorage.removeItem('activeComponentLink');
    sessionStorage.removeItem('expandedPanel');
    sessionStorage.removeItem('expandedPanel1');
    this.session.cleanSesssion();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getModuleLogo(module: string): string | null {
    switch (module) {
      case 'GOVERNace':
        return '../../../../assets/images/g-sidelogo24.png';
      case 'e-COMPLIANCE':
        return '../../../../assets/images/Asset15.png';
      case 'grcHAWK':
        return '../../../../assets/images/a-sidelogo2.png';
      case 'Risk':
        return '../../../../assets/images/rms_logo.png';
      default:
        return null;
    }
  }
  
  
  // toggleSidenav() {
  //   let user: any = this.session.getUser();
  //   this.data = JSON.parse(user);
  //   //alert(this.data)
  //   if (!this.session.isLoggedIn()) {
  //     this.router.navigate(['login']);
  //   }
  //   this.sidenav.toggle();
  // }
  hasAccessibleMenuItems(tab: any): boolean {
    return tab.menuItems?.some((menuItem:any) => this.getSubAccess(menuItem));
  }
  
  closeSidenav() {
    this.sidenav.close();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

 
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }


  onModuleSelect(module: string) {
    this.selectedModule = module;
    sessionStorage.setItem('selectedModule', module);
    console.log(`${module} selected`);
      // Clear stored navigation state when module changes
  sessionStorage.removeItem('activeComponentLink');
  sessionStorage.removeItem('expandedPanel');
  sessionStorage.removeItem('expandedPanel1');

  this.activeComponentLink = null;
  this.expandedPanel = null;
  this.expandedPanel1 = null;
    // You can also implement logic to show or hide content based on the selected module
    let routeToNavigate = '';

    switch (module) {
      case 'GOVERNace': routeToNavigate = 'home'; break;
      case 'e-COMPLIANCE': routeToNavigate = 'commonadminhome'; break;
      case 'grcHAWK': routeToNavigate = 'userlist'; break;
      case 'Risk': routeToNavigate = 'commonadminhome'; break;
      default: routeToNavigate = ''; break;
    }
  
    if (routeToNavigate) {
      this.router.navigate([`/dashboard/${routeToNavigate}`]);
    }
  }
  isModuleVisible(moduleLabel: string): boolean {
    return this.selectedModule === moduleLabel;
  }
  setDefaultModule(): void {
  
   if (this.data.profile.taskid.includes('1')) {
    this.selectedModule = 'GOVERNace';
  } else if (this.data.profile.taskid.includes('3')) {
    this.selectedModule = 'e-COMPLIANCE';
  } else if (this.data.profile.taskid.includes('2')) {
    this.selectedModule = 'Risk';
  }
 else if (this.data.profile.taskid.includes('4')) {
  this.selectedModule = 'grcHAWK';
}
if (this.selectedModule) {
  sessionStorage.setItem('selectedModule', this.selectedModule);
}
  }
}
