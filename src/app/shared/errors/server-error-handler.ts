import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandler } from './error-handler.interface';

export class ServerErrorHandler implements ErrorHandler {
  canHandle(error: HttpErrorResponse): boolean {
    return error.status >= 500;
  }

  handle(error: HttpErrorResponse): Observable<never> {
    const serverErrorMessage = error.error?.message || 'Erro no servidor';
    return throwError(() => ({ type: 'server', message: serverErrorMessage }));
  }
}
