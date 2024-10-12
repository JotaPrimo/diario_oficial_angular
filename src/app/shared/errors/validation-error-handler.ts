import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandler } from '../errors/error-handler.interface';

export class ValidationErrorHandler implements ErrorHandler {
  canHandle(error: HttpErrorResponse): boolean {
    return error.status === 400 && error.error?.errors;
  }

  handle(error: HttpErrorResponse): Observable<never> {
    const validationErrors = this.extractValidationErrors(error);
    return throwError(() => ({ type: 'validation', errors: validationErrors }));
  }

  private extractValidationErrors(error: HttpErrorResponse): { [key: string]: string } {
    const validationErrors: { [key: string]: string } = {};
    error.error?.errors.forEach((err: { field: string; message: string }) => {
      validationErrors[err.field] = err.message;
    });
    return validationErrors;
  }
}
