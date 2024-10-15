/** Modules */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { catchError, Observable } from 'rxjs';

// services
import { BaseCrudService } from '../../shared/services/base-crud.service';

// Interfaces
import { OrgaoGovernamental } from '../interfaces/orgao-governamental.interface';
import { OrgaoGovernamentalUpdateDTO } from '../interfaces/dto/orgao-governamental-update-dt.interface';
import { OrgaoGovernamentalCreateDTO, OrgaoGovernamentalResponse } from '../interfaces';

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

  findById(id: number | string): Observable<OrgaoGovernamental> {
    return this.httpClient.get<OrgaoGovernamental>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  update(id: string, orgaoGov: OrgaoGovernamentalUpdateDTO): Observable<OrgaoGovernamentalUpdateDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<OrgaoGovernamentalUpdateDTO>(`${this.apiUrl}/${id}`, orgaoGov, { headers });
  }

}
