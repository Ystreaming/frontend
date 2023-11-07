import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListSubscriptionComponent } from './list-subscription/list-subscription.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeVideosComponent } from './home-videos/home-videos.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoPageComponent } from './video-page/video-page.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ListSubscriptionComponent,
    HomePageComponent,
    HomeVideosComponent,
    VideoPageComponent,
    VideoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
