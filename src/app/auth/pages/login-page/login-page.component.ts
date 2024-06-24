import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../interfaces/login-response.interface';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  username: string = 'caleb_romeo';
  password: string = '12345678';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  login() {
    const credentials = { username: this.username, password: this.password };
    this.authService.authenticate(credentials)
      .subscribe({
        next: (response: Token) => {
          console.log(response.token);
          this.cookieService.set('token', response.token, 60);
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
  }

}
