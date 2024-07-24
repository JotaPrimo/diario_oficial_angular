import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users: User[] = [];
  public loading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.content;
        this.loading = false;
        console.log(this.users);
      },
      err => {
        this.users = [];
        this.loading = false;
        console.log(err);
      }
    )
  }

  isAtivo(user: User): boolean {
    return this.userService.isAtivo(user);
  }

}
