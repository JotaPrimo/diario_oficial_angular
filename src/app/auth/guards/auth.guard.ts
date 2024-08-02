import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import {  Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router: Router) {}

  checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAutenticated) => {
        if (!isAutenticated) this.router.navigate(['./auth/login']);
      })
    );
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

  canActivate(): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}
