import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

import { ViewReportRoutingModule } from './view-report-routing.module';
import { ViewReportComponent } from './view-report/view-report.component';

@NgModule({
  declarations: [ViewReportComponent, SafeHtmlPipe],
  imports: [CommonModule, ViewReportRoutingModule],
})
export class ViewReportModule {}
