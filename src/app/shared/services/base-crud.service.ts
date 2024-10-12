import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**  */
import { ErrorHandler } from '../errors/error-handler.interface';
import { ValidationErrorHandler } from '../errors/validation-error-handler';
import { ServerErrorHandler } from '../errors/server-error-handler';
import { GenericErrorHandler } from '../errors/generic-error-handler';

export abstract class BaseCrudService {
  private errorHandlers: ErrorHandler[] = [
    new ValidationErrorHandler(),
    new ServerErrorHandler(),
    new GenericErrorHandler()
  ];

  protected handleHttpError(error: HttpErrorResponse): Observable<never> {
    const handler = this.errorHandlers.find(h => h.canHandle(error));
    return handler ? handler.handle(error) : throwError(() => ({ type: 'unknown', message: 'Erro desconhecido' }));
  }
}
