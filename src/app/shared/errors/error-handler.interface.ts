import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ErrorHandler {
  canHandle(error: HttpErrorResponse): boolean;
  handle(error: HttpErrorResponse): Observable<never>;
}
