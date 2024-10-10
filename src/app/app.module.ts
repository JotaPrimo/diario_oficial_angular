/** Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

/** componentes */
import { AppComponent } from './app.component';

/** intercepors */
import { AuthInterceptor } from './auth/interceptors/auth.interceptor ';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/** Services */
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './auth/services/token.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [
    CookieService,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
