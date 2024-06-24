import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);

      }
    )
  }

}
