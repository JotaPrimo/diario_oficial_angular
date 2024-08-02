import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiPaths } from '../../constants/api-path';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/v1/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  authenticate(credentials: any): Observable<any> {
    console.log(`${ApiPaths.users.list}`);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, credentials, { headers }).pipe(
      tap((response) => {
        const token = response.token;
        if (token) {
          const expirationDate = new Date();
          expirationDate.setMinutes(expirationDate.getMinutes() + 90); // 90 minutes
          this.cookieService.set('authToken', token, expirationDate, '/');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  isLoggedIn(): Observable<boolean> {
    return of(!!this.getToken());
  }

  logout(): void {
    this.cookieService.delete('authToken', '/');
  }

  checkAuthentication(): Observable<boolean> {

    if(this.getToken()) {
      return of(true)
    }

    return of(false);
  }

}
