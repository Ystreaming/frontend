import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

interface Categorie {
  titre: string;
  image: string;
}

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.scss']
})
export class HomeVideosComponent implements OnInit {
  miniatureCategorie: Categorie[] = [
    { titre: 'Gaming', image: 'assets/gaming.jpg' },
    { titre: 'IRL', image: 'assets/irl.jpg' },
    { titre: 'Podcast', image: 'assets/podcastv2.jpg' }
  ];

  videos: any = [];
  videosByViews: any = [];
  hoveredIndex: number | null = null;
  environment = environment;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos(6);
  }

  loadVideos(limit: number) {
    this.videoService.getAllVideos(limit).subscribe(response => {
      console.log(response);
      this.videos = response.videos;
    });
  }
}
