import DataSource from 'devextreme/data/data_source';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CustomStore from 'devextreme/data/custom_store';

import { BASE_URL } from 'src/app/core/Constant/apiConstant';
import { ActivatedRoute, Router } from '@angular/router';
//import { InspectionservicesService,UserModel,Service } from 'src/app/inspectionservices.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DaidailogeComponent } from 'src/app/Common/daidailoge/daidailoge.component';



const URL = BASE_URL;
const headers = new HttpHeaders();
headers.append('Content-Type', 'text/plain');
@Component({
  selector: 'app-one-time-frequency-external',
  templateUrl: './one-time-frequency-external.component.html',
  styleUrls: ['./one-time-frequency-external.component.scss'],
  //providers: [Service],
})
export class OneTimeFrequencyExternalComponent  {

 
}
