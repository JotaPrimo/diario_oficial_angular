import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { UserReponsePaginated } from '../interfaces/users-response.interface';
import { statusUsuario } from '../status-usuario.enum';
import { environments } from '../../../environments/environments';
import { ErrorHandlerService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environments.baseUrl + '/usuarios';

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlerService
  ) { }

  getUsers(): Observable<UserReponsePaginated> {

    return this.http.get<UserReponsePaginated>(this.apiUrl).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }

  salvar(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  public isAtivo(user: User): boolean {
    return statusUsuario.ATIVO === user.statusUsuario;
  }

  public isInativo(user: User): boolean {
    return statusUsuario.INATIVO === user.statusUsuario;
  }

  public inativarUsuario(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    console.log("passando por aqui ta testand")
    console.log(`${this.apiUrl}/${user.id}/inativar`);

    this.http.patch(`${this.apiUrl}/${user.id}/inativar`, options)
      .pipe(
        tap(res => {
          console.log(res);
        }),
      )

  }
}
