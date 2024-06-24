import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { CookieService } from '../../shared/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api/v1/usuarios';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsers(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.getBearerToken()
    });

    return this.http.get<User>(this.apiUrl).pipe(
      tap(res => {
        console.log(res);
      })
    );
  }
}
