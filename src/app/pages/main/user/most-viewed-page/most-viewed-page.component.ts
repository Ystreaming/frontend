import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-most-viewed-page',
  templateUrl: './most-viewed-page.component.html',
  styleUrls: ['./most-viewed-page.component.scss']
})
export class MostViewedPageComponent implements OnInit {
  title: string = "Vidéos les plus vues";
  videos: any = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos(12);
  }

  loadVideos(limit: number) {
    this.videoService.getMostViewed(limit).subscribe(response => {
      this.videos = response;
    });
  }
}
