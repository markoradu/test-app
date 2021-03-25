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
import { NgxPaginationModule } from 'ngx-pagination';
import { NewsItemComponent } from './core/news/news-item/news-item.component';
import { NewsModalComponent } from './shared/modals/news-modal/news-modal.component';
import { TournamentsComponent } from './core/tournaments/tournaments.component';
import { TournamentsFiltersComponent } from './core/tournaments/tournaments-filters/tournaments-filters.component';
import { TournamentsItemComponent } from './core/tournaments/tournaments-item/tournaments-item.component';
import { TournamentsNavigationComponent } from './core/tournaments/tournaments-navigation/tournaments-navigation.component';
import { TournamentItemFullComponent } from './core/tournaments/tournaments-item/tournament-item-full/tournament-item-full.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsFilterComponent } from './core/news/news-filter/news-filter.component';
import { ProfileComponent } from './core/profile/profile.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { TfModalComponent } from './shared/modals/tf-modal/tf-modal.component';
import { TfPostsComponent } from './core/home/tf-posts/tf-posts.component';
import { ArrayToStringPipe } from './shared/pipes/arrayToString.pipe';
import { SuccessModalComponent } from './shared/modals/success-modal/success-modal.component';
import { TeamPostsComponent } from './core/home/team-posts/team-posts.component';
import { TeamModalComponent } from './shared/modals/team-modal/team-modal.component';
import { ContentCretorComponent } from './core/content-cretor/content-cretor.component';
import { PasswordStrengthBarComponent } from './shared/password-strength-bar/password-strength-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    NewsItemComponent,
    NewsModalComponent,
    TournamentsComponent,
    TournamentsFiltersComponent,
    TournamentsItemComponent,
    TournamentsNavigationComponent,
    TournamentItemFullComponent,
    NewsFilterComponent,
    ProfileComponent,
    HeaderComponent,
    HomeComponent,
    TfModalComponent,
    TfPostsComponent,
    ArrayToStringPipe,
    SuccessModalComponent,
    TeamPostsComponent,
    TeamModalComponent,
    ContentCretorComponent,
    PasswordStrengthBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule,
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
