/** Modules */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environments} from '../../environments/environments';
import {catchError, Observable} from 'rxjs';

// services
import {BaseCrudService} from '../shared/services/base-crud.service';

// Interfaces
import {OrgaoGovernamental} from '../_interfaces/orgao-governamental.interface';
import {OrgaoGovernamentalResponseDto} from "../orgao-governamental/dto/orgao-governamental-response.dto.interface";
import {
  OrgaoGovernamentalCreateDto,
  OrgaoGovernamentalPaginated,
  OrgaoGovernamentalUpdateDto
} from "../orgao-governamental/dto";

@Injectable({
  providedIn: 'root',
})
export class OrgaoGovernamentalService extends BaseCrudService {
  private apiUrl = environments.baseUrl + '/orgao-governamentals';

  constructor(private httpClient: HttpClient) {
    super();
  }

  // get all
  getAll(params: string = ''): Observable<OrgaoGovernamentalPaginated> {
    return this.httpClient
      .get<OrgaoGovernamentalPaginated>(`${this.apiUrl + params}`)
      .pipe(catchError((erro): Observable<never> => this.handleHttpError(erro)));
  }

  create(orgaoGovernamental: OrgaoGovernamentalCreateDto): Observable<OrgaoGovernamental> {
    return this.httpClient.post<OrgaoGovernamental>(this.apiUrl, orgaoGovernamental)
      .pipe(
        catchError(error => this.handleHttpError(error))
      );
  }

  findById(id: number | string): Observable<OrgaoGovernamental> {
    return this.httpClient.get<OrgaoGovernamental>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  update(id: string, orgaoGov: OrgaoGovernamentalUpdateDto): Observable<OrgaoGovernamentalUpdateDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.patch<OrgaoGovernamentalUpdateDto>(`${this.apiUrl}/${id}`, orgaoGov, { headers });
  }

}
