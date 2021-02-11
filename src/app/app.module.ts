import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth/auth.service';
import { ApiPrefixInterceptor } from './core/http/api-prefix.interceptor';
import { AuthInterceptor } from './core/http/auth.interceptor';
import { LoginComponent } from './core/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsComponent } from './core/news/news.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { HomeComponent } from './core/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsItemComponent } from './core/news/news-item/news-item.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NewsComponent, HomeComponent, NewsItemComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
