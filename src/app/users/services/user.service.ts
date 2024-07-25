import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserReponsePaginated } from '../interfaces/users-response.interface';
import { ApiPaths } from '../../constants/api-path';
import { statusUsuario } from '../status-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api/v1/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserReponsePaginated> {

    return this.http.get<UserReponsePaginated>(this.apiUrl).pipe(
      tap(res => {
        console.log(res);
      })
    );
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
