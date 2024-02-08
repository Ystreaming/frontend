import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  hoveredIndex: number | null = null;
  categories: any = [];
  environment = environment;

  constructor(private videoService: VideoService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadData(6, 3);
  }

  loadData(videoLimit: number, categoryLimit: number) {
    forkJoin({
      recommandationsData: this.videoService.getRecommendation(videoLimit),
      mostViewedData: this.videoService.getMostViewed(videoLimit),
      categoriesData: this.categoryService.getAllCategories(categoryLimit)
    }).subscribe(({ recommandationsData, mostViewedData, categoriesData }) => {
      this.recommandations = recommandationsData;
      this.mostviewed = mostViewedData;
      this.categories = categoriesData.categories;
    });
  }
}
