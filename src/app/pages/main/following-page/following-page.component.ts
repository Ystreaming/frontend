import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.scss']
})
export class FollowingPageComponent implements OnInit {
  title: string = "Videos de vos chaînes préférées";
  videos: any = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos(12);
  }

  loadVideos(limit: number) {
    this.videoService.getRecommendation(limit).subscribe(response => {
      this.videos = response;
    });
  }
}
