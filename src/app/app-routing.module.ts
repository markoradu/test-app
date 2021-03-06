import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { ContentCretorComponent } from './core/content-cretor/content-cretor.component';
import { HomeComponent } from './core/home/home.component';
import { NewsComponent } from './core/news/news.component';
import { ProfileComponent } from './core/profile/profile.component';
import { TournamentsComponent } from './core/tournaments/tournaments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tournaments',
    component: TournamentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'content-creator',
    component: ContentCretorComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
