import { Component } from '@angular/core';

@Component({
  selector: 'app-view-control-matrix',
  templateUrl: './view-control-matrix.component.html',
  styleUrls: ['./view-control-matrix.component.scss'],
})
export class ViewControlMatrixComponent {
  selectedOption: string = 'option1';
  riskAppetiteHeaders = [
    {
      title: 'Risk Appetite',
      subHeaders: ['Risk Averse', 'Risk Neutral', 'Risk Aggresive'],
    },
  ];
  controlAcceptanceHeaders = [
    {
      title: 'Control Acceptance',
      subHeaders: [
        'Effective Control',
        'Neutral Control',
        'Ineffective Control',
      ],
    },
  ];
  currentHeaders = this.riskAppetiteHeaders;

  onSelectionChange(option: string): void {
    this.selectedOption = option;
    this.currentHeaders =
      option === 'option1'
        ? this.riskAppetiteHeaders
        : this.controlAcceptanceHeaders;
  }
  getSubHeaderColor(subHeaderIndex: number): object {
    if (subHeaderIndex === 0)
      return {
        color: 'black',
        'background-color': '#00ff00',
      };
    else if (subHeaderIndex === 1)
      return {
        color: 'white',
        'background-color': '#0000ff',
      };
    else
    return {
      color: 'white',
      'background-color': '#ff0000',
    };
  }
}
