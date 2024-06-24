import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-icon',
  standalone: true,
  imports: [],
  templateUrl: './list-icon.component.html',
})
export class ListIconComponent {
  @Input() width: number = 24;  
  @Input() height: number = 24;
}
