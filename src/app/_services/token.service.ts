// token.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authToken: string = 'authToken';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    // Define o cookie com validade de 1 dia
    this.cookieService.set(this.authToken, token, 1);
  }

  getToken(): string | null {
    return this.cookieService.get(this.authToken);
  }

  removeToken(): void {
    this.cookieService.delete(this.authToken);
  }
}
