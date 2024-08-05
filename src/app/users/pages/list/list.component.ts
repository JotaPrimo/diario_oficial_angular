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
    const message = `Inativar usuário ${user.username}?`;

    const resConfirm = await this.messageService.confirm("Atenção", message)

    // this.messageService.success("Usuário inativado com sucesso")

    if (resConfirm) {
      try {
        await this.userService.inativarUsuario(user)

      } catch (error) {
        this.messageService.error("Erro ao inativar usuário");
        console.error(error);
        return;
      }
    }
  }

  async ativarUsuario(user: User) {
    let message = `Inativar usuário ${user.username}?`;
    let isConfirmed = await this.messageService.confirm("Atenção", message);

    if (isConfirmed) {
      this.userService.inativarUsuario(user)
        .subscribe(
          {
            next: (res) => {
             this.getUsers();
              this.messageService.success(`Usuário ${user.username} inativado com sucesso`);
            },
            error: (error) => {
              this.messageService.warning("Ocorreu um erro");
            },
            complete: () => {
              this.messageService.info("Operação concluída")
              return;
            }
          }
        );
    } else {
      this.messageService.info("Operação cancelada")
    }
  }

}
