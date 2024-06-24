import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserReponsePaginated } from '../interfaces/users-response.interface';
import { ApiPaths } from '../../constants/api-path';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api/v1/usuarios';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsers(): Observable<UserReponsePaginated> {

    return this.http.get<UserReponsePaginated>(this.apiUrl).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }
}
