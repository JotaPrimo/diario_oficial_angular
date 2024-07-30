import { Injectable } from '@angular/core';

import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Role } from '../interfaces/role.interface';

@Injectable({providedIn: 'root'})
export class RoleService {

  private baseUrl: string = environments.baseUrl

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseUrl}/roles`)
      .pipe(
        tap(err => console.log(err))
      );
  }

}
