import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report-window',
  templateUrl: './report-window.component.html',
  styleUrls: ['./report-window.component.scss']
})
export class ReportWindowComponent {


  complianceName: string | undefined;
  complianceDescription: string | undefined;
  stageOfCompliance: string | undefined;
  riskCategory: string | undefined;
  frequency: string | undefined;
  actsName: string | undefined;
  natureOfLaw: string | undefined;
  typeOfCompliance: string | undefined;
  unitType: string | undefined;
  units: string | undefined;
  department: string | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;

  reportData: any[] | undefined; // Placeholder for report data

  generateReport() {
    // Implement your logic to fetch data based on the form fields
    // For demonstration, we'll use a dummy data array
    this.reportData = [
      { id: 1, name: 'Report 1', value: 'Value 1' },
      { id: 2, name: 'Report 2', value: 'Value 2' },
      // Add more data as needed
    ];
  }

  resetForm() {
    this.complianceName = '';
    this.complianceDescription = '';
    this.stageOfCompliance = '';
    this.riskCategory = '';
    this.frequency = '';
    this.actsName = '';
    this.natureOfLaw = '';
    this.typeOfCompliance = '';
    this.unitType = '';
    this.units = '';
    this.department = '';
  
  }


  // exportToPDF() {
  //   // Add logic to export to PDF
  // }

  // exportToExcel() {
  //   // Add logic to export to Excel
  // }
}



