import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { ToasterComponent } from 'src/app/Common/toaster/toaster.component';
import { SessionService } from 'src/app/core/Session/session.service';
import { EncryptionService } from 'src/app/core/encryption.service';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  public module = 'Inventory Management';
  public access = 'Write';
  checked: any;
  sessionData: any;
  displayedColumns = ['srno', 'name', 'manufacturername', 'unitprice', 'edit', 'status', 'remove'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  erroMessage: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private product: ProductService,
    private encrypt: EncryptionService,
    public dialog: MatDialog
  ) {
    this.getProductList();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProject(element: any) {
    this.router.navigate(['dashboard/manufacturer/create-update-product'], {
      state: { data: element },
    });
  }

  createProduct() {
    this.router.navigate(['dashboard/manufacturer/create-update-product'], {
      state: { data: undefined },
    });
  }

  getProductList() {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    // Payload
    let payload = {
      authid: this.sessionData.profile.authid,
    };

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api

    this.product.productSummary(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');

      if (response.ResponseCode === '0') {
        let projectList = this.encrypt.decryptionAES(response.ResponseData);

        let data = JSON.parse(projectList);
        console.log(data, 'data');
        this.dataSource = new MatTableDataSource(data.material);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource, 'projectList');
      } else {
        this.erroMessage = response.ResponseDesc;
      }
    });
  }

  changeStatus(value: any, element: any) {
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'C',
      id: element.id,
      status: value.checked ? '0' : '1',
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.product.CRUDProduct(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        this.reloadComponent();
      }
    });
  }

  removeProduct(element: any) {
    console.log(element, 'removr inspection ');
    // getting AuthId
    let user: any = this.session.getUser();
    this.sessionData = JSON.parse(user);

    let payload = {
      authid: this.sessionData.profile.authid,
      mode: 'D',
      id: element.id,
    };

    console.log('payload', payload);

    // encrypted Payload
    let encryptedPayload = {
      requestdata: this.encrypt.encryptionAES(JSON.stringify(payload)),
    };

    // Calling Api
    this.product.CRUDProduct(encryptedPayload).subscribe((response: any) => {
      console.log(response, 'response');
      if (response.ResponseCode === '0') {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
        window.location.reload();
      } else {
        this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: { message: response.ResponseDesc },
        });
      }
    });
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(ToasterComponent, {
      width: '550px',
      data: {
        title: 'Delete Item?',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, 'The dialog was closed');

      if (result == true) {
        this.removeProduct(element);
        this.reloadComponent();
      } else {
        console.log('Somthing went wrong');
      }
    });
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  
  searchTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
