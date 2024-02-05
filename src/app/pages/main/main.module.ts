import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeVideosComponent } from 'src/app/components/home-videos/home-videos.component';
import { RecommendedVideoComponent } from 'src/app/components/recommended-video/recommended-video.component';
import { VideoDetailComponent } from 'src/app/components/video-detail/video-detail.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { VideoPageComponent } from './user/video-page/video-page.component';
import { ListVideosComponent } from 'src/app/components/list-videos/list-videos.component';
import { PageProfilComponent } from 'src/app/components/page-profil/page-profil.component';
import { FollowingPageComponent } from './user/following-page/following-page.component';
import { MostViewedPageComponent } from './user/most-viewed-page/most-viewed-page.component';
import { ProfilPageComponent } from './user/profil-page/profil-page.component';
import { SearchComponent } from './user/search/search.component';
import { VideosByCategoryPageComponent } from './user/videos-by-category-page/videos-by-category-page.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeVideosComponent,
    VideoPageComponent,
    VideoDetailComponent,
    RecommendedVideoComponent,
    PageProfilComponent,
    ProfilPageComponent,
    ListVideosComponent,
    FollowingPageComponent,
    MostViewedPageComponent,
    VideosByCategoryPageComponent,
    SearchComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
