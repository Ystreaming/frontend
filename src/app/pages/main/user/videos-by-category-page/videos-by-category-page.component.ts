import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos-by-category-page',
  templateUrl: './videos-by-category-page.component.html',
  styleUrls: ['./videos-by-category-page.component.scss']
})
export class VideosByCategoryPageComponent implements OnInit {
  title: string = "";
  videos: any = [];
  categoryId: string = "";

  constructor(private videoService: VideoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id')!;
      this.loadVideos(12);
    });
  }

  loadVideos(limit: number) {
    this.videoService.getVideosByCategory(this.categoryId, limit).subscribe(response => {
      this.videos = response.videos;
    });
  }
}
