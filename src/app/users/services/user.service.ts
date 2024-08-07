import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { UserReponsePaginated } from '../interfaces/users-response.interface';
import { environments } from '../../../environments/environments';
import { ErrorHandlerService } from './error.service';
import { FormGroup } from '@angular/forms';
import { EnumStatusUsuario } from '../enums/status-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environments.baseUrl + '/usuarios';

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlerService
  ) { }

  getUsers(params: string = ''): Observable<UserReponsePaginated> {

    return this.http.get<UserReponsePaginated>(`${this.apiUrl + params}`).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }

  findById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  salvar(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  update(user: FormGroup, id: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  public isAtivo(user: User): boolean {
    return EnumStatusUsuario.ATIVO === user.statusUsuario;
  }

  public isInativo(user: User): boolean {
    return EnumStatusUsuario.INATIVO === user.statusUsuario;
  }

  public inativarUsuario(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.patch(`${this.apiUrl}/${user.id}/inativar`, options);
  }

  public ativarUsuario(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.patch(`${this.apiUrl}/${user.id}/ativar`, options);
  }

}
