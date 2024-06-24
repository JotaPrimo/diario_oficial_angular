import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8082/api/v1/auth';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError) 
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error('Error occurred:', errorMessage);
    return throwError(errorMessage);
  }

}
