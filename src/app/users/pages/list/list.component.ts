import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MessageService } from '../../../shared/services/message.service';
import { catchError, map, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(
      {
        next: (data) => {
          this.users = data.content;
          this.loading = false;
        },
        error: (error) => {
          this.users = [];
          this.loading = false;
        }
      }
    )
  }

  isAtivo(user: User): boolean {
    return this.userService.isAtivo(user);
  }

  async inativarUsuario(user: User) {
    console.log("inativarUsuario");

    let messageInativar = `Inativar usuário ${user.username}?`;
    let isConfirmed = await this.messageService.confirm("Atenção", messageInativar);

    if (isConfirmed) {
      this.userService.inativarUsuario(user)
        .pipe(
          tap(() => this.getUsers()),
          catchError((err: HttpErrorResponse) => {
            console.log(`Error inativarUsuario : ${err}`);
            this.messageService.warning("Ocorreu um erro");
            return of();
          })
        ).subscribe(() => {
          this.messageService.success(`Usuário ${user.username} inativado com sucesso`)
          return;
        });
    } else {
      this.messageService.info("Operação cancelada")
    }
  }

  async ativarUsuario(user: User) {
    let message = `Ativar usuário ${user.username}?`;
    let isConfirmed = await this.messageService.confirm("Atenção", message);

    if (isConfirmed) {
      this.userService.ativarUsuario(user)
        .pipe(
          tap(() => this.getUsers()),
          catchError((err: HttpErrorResponse) => {
            console.log(`Error inatrivar : ${err}`);
            this.messageService.warning("Ocorreu um erro");
            return of();
          })
        ).subscribe(() => {
          this.messageService.success(`Usuário ${user.username} ativado com sucesso`)
          return;
        });
    } else {
      this.messageService.info("Operação cancelada")
    }
  }

}
