import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.scss']
})
export class HomeVideosComponent implements OnInit {
  recommandations: any = [];
  mostviewed: any = [];
  videosByViews: any = [];
  hoveredIndex: number | null = null;
  categories: any = [];
  environment = environment;

  constructor(private videoService: VideoService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadVideos(6);
    this.loadCategories(3);
  }

  loadVideos(limit: number) {
    this.videoService.getRecommendation(limit).subscribe(response => {
      this.recommandations = response;
    });

    this.videoService.getMostViewed(limit).subscribe(response => {
      this.mostviewed = response;
    });
  }

  loadCategories(limit: number) {
    this.categoryService.getAllCategories(limit).subscribe(response => {
      console.log(response);
      this.categories = response.categories;
    })
  }
}
