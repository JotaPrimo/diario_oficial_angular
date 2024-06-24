// token.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey: string = 'token';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    // Define o cookie com validade de 1 dia
    this.cookieService.set(this.tokenKey, token, 1);
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
}
