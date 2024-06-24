import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-users',
  standalone: true,
  imports: [],
  templateUrl: './users-icon.component.html',
})
export class UsersIconComponent {
  @Input() width: number = 24;  
  @Input() height: number = 24;
}
