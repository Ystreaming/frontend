import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ListSubscriptionComponent } from './components/list-subscription/list-subscription.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeVideosComponent } from './components/home-videos/home-videos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { RecommendedVideoComponent } from './components/recommended-video/recommended-video.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LocalStorageService } from './services/local-storage.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PageProfilComponent } from './components/page-profil/page-profil.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListSubscriptionComponent,
    HomePageComponent,
    HomeVideosComponent,
    VideoPageComponent,
    VideoDetailComponent,
    RecommendedVideoComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PageProfilComponent,
    ProfilPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule
  ],
  providers: [
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
