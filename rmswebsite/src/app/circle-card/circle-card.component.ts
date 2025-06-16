import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-circle-card',
  templateUrl: './circle-card.component.html',
  styleUrls: ['./circle-card.component.scss']
})
export class CircleCardComponent {
  @Input() count: number = 0;
  @Input() label: string = '';
  @Input() backgroundColor: string = 'linear-gradient(to right, rgba(241, 79, 125, 0.603), rgb(238, 144, 230))';
}
