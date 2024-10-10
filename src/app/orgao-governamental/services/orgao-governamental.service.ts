import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { OrgaoGovernamental } from '../interfaces/orgao-governamental';

@Injectable({
  providedIn: 'root'
})
export class OrgaoGovernamentalService {

  private apiUrl = environments.baseUrl + '/orgao-governamentals';

constructor(
  private httpClient: HttpClient
) { }

// get all
getAll(params: string = ''): Observable<OrgaoGovernamental> {
  console.log("OrgaoGovernamentalService getAll passei por aqui");
  console.log(`${this.apiUrl + params}`);

  return this.httpClient.get<OrgaoGovernamental>(`${this.apiUrl + params}`);
}

}
