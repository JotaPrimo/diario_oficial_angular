import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {

    console.log(error);


    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente ou de rede
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Erro do backend
      if (error.status === 422 && error.error.errors) {
        errorMessage = 'Validation error(s):\n';
        for (const [field, message] of Object.entries(error.error.errors)) {
          errorMessage += `${field}: ${message}\n`;
        }
      } else {
        errorMessage = `Server-side error: ${error.status} - ${error.statusText}\nMessage: ${error.message}`;
      }
    }
    console.error('Error logged:', errorMessage);
    return throwError(errorMessage);
  }
}
