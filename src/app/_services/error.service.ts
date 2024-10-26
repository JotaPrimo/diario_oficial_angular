import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: HttpErrorResponse) {

    if (error.error.errors) {
      return Object.values(error.error.errors)
    }

    return error.error.message;
  }
  
}
