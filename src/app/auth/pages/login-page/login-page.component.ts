import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

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
          console.log(response);
          this.cookieService.set('token', response, 0)
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });
  }

}
