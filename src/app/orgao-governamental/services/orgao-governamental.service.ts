/** Modules */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable } from 'rxjs';

// services
import { BaseCrudService } from '../../shared/services/base-crud.service';

// Interfaces
import { OrgaoGovernamental } from '../interfaces/orgao-governamental.interface';
import { OrgaoGovernamentalCreateDTO } from '../interfaces/orgao-governamental-create-dt.interface';
import { OrgaoGovernamentalResponse } from './../interfaces/orgao-governamental-response.interface';

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

  create(orgaoGovernamental: OrgaoGovernamentalCreateDTO): Observable<OrgaoGovernamental> {
    return this.httpClient.post<OrgaoGovernamental>(this.apiUrl, orgaoGovernamental)
    .pipe(
      catchError(error => this.handleHttpError(error))
    );
  }

}
