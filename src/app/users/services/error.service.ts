import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ApiError } from '../../shared/interfaces/api-error.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.errors));
  }
}
