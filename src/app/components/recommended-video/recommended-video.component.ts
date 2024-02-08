import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-recommended-video',
  templateUrl: './recommended-video.component.html',
  styleUrls: ['./recommended-video.component.scss']
})
export class RecommendedVideoComponent implements OnInit {
  videos: any = [];
  environment = environment;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getRecommendation(6).subscribe(response => {
      this.videos = response;
    });
  }
}
