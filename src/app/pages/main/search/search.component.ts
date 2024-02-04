import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string | null = "";
  title: string = "Résultats de recherche - ";
  videos: any = [];

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit(): void {
    this.searchQuery = this.activatedRoute.snapshot.paramMap.get('searchQuery');
    this.title += this.searchQuery;
    this.loadVideos(this.searchQuery, 12);
  }

  loadVideos(name: string | null, limit: number) {
    this.videoService.getVideosByName(name, limit).subscribe(response => {
      this.videos = response.videos;
    });
  }
}
