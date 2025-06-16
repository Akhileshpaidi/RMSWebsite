import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoaderService } from './Common/Loader/loader.service';
import { EncryptionService } from './core/encryption.service';
import { IdleService } from './idle.service';
import { MatDialog } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';
import { loadMessages } from 'devextreme/localization';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GRMA';
  loading$ = this.loader.loading$;
  constructor(
    private router: Router,
    private idleService: IdleService,
    private encrypt: EncryptionService,
    public loader: LoaderService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.initialIdleSettings();

    // AES
    const encrypted = this.encrypt.encryptionAES('hello world');
    const decrypted = this.encrypt.decryptionAES(encrypted);
    console.log('encrypted', encrypted);
    console.log('decrypted', decrypted);

    loadMessages({
      "en": {
         // "dxDataGrid-editingDeleteRow": "Delete",
          "dxDataGrid-editingAddRow": "Add"
      }
    });
  }

  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = environment.idleTimeInMinutes * 600;
    this.idleService
      .startWatching(idleTimeoutInSeconds)
      .subscribe((isTimeOut: boolean) => {
        if (isTimeOut) {
          console.log('going back to login page ');
          localStorage.clear();
          this.router.navigate(['']);

           this.dialog.open(DaidailogeComponent, {
          width: '550px',
          data: {  message: 'Session timeout. Please try login again.' }
        });
        }
      });
  }
}
