import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MessageService } from '../../../shared/services/message.service';
import { catchError, map, tap } from 'rxjs';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users: User[] = [];
  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.content;
        this.loading = false;
      },
      err => {
        this.users = [];
        this.loading = false;
      }
    )
  }

  isAtivo(user: User): boolean {
    return this.userService.isAtivo(user);
  }

  async inativarUsuario(user: User) {
    const message = `Inativar usuário ${user.username}?`;

    const resConfirm = await this.messageService.confirm("Atenção", message)

    // this.messageService.success("Usuário inativado com sucesso")

    if(resConfirm.isConfirmed) {
      try {
        await this.userService.inativarUsuario(user)

      } catch (error) {
        this.messageService.error("Erro ao inativar usuário");
        console.error(error);
        return;
      }
    }
  }

  ativarUsuario(user: User) {
    let message = `Inativar usuário ${user.username}?`;

    this.messageService.confirm("Atenção", message)
  }

}
