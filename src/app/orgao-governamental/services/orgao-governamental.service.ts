import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable } from 'rxjs';
import { OrgaoGovernamental, OrgaoGovernamentalResponse } from '../interfaces/orgao-governamental';
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
  getAll(params: string = ''): Observable<OrgaoGovernamentalResponse> {
    return this.httpClient
      .get<OrgaoGovernamentalResponse>(`${this.apiUrl + params}`)
      .pipe(catchError((erro) => this.handleHttpError(erro)));
  }

}
