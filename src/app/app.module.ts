import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule

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
import { LocalStorageService } from './services/local-storage.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
