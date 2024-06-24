import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  username: string = 'jota_santos';
  password: string = '12345678';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.username, this.password)
      .subscribe({
      next: (response) => {
        console.log('Response received:', response);
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

}
