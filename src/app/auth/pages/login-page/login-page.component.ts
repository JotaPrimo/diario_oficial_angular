import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CookieService } from '../../../shared/services/cookie.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  username: string = 'jota_santos';
  password: string = '12345678';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.username, this.password)
      .subscribe({
        next: (response) => {
          console.log('Response received:', response);
          this.cookieService.setCookie('token', response, 0)
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
  }

}
