import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable } from 'rxjs';
import { OrgaoGovernamental } from '../interfaces/orgao-governamental';
import { BaseCrudService } from '../../shared/services/base-crud.service';

@Injectable({
  providedIn: 'root',
})
export class OrgaoGovernamentalService extends BaseCrudService {
  private apiUrl = environments.baseUrl + '/orgao-governamentals';

  constructor(private httpClient: HttpClient) {
    super();
  }

  // get all
  getAll(params: string = ''): Observable<OrgaoGovernamental> {
    return this.httpClient
      .get<OrgaoGovernamental>(`${this.apiUrl + params}`)
      .pipe(catchError((erro) => this.handleHttpError(erro)));
  }

}
