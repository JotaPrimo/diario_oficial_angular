import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandler } from './error-handler.interface';

export class GenericErrorHandler implements ErrorHandler {
  canHandle(error: HttpErrorResponse): boolean {
    return true;
  }

  handle(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'Erro desconhecido';
    return throwError(() => ({ type: 'generic', message: errorMessage }));
  }
}
