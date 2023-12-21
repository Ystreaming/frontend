import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Video {
  id: number;
  miniatureVideo: string;
  imageProfilDescription: string;
  videoName: string;
  streamerName: string;
  category: string;
  description: string;
  views: number;
  uploadDate: string;
  comments: Comment[];
}

@Component({
  selector: 'app-recommended-video',
  templateUrl: './recommended-video.component.html',
  styleUrls: ['./recommended-video.component.scss']
})
export class RecommendedVideoComponent implements OnInit {
  videos: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos(): void {
    this.http.get<Video[]>('/assets/video.json').subscribe(
        data => {
          this.videos = data;
        },
        error => {
          console.error('Erreur lors du chargement des vidéos', error);
        }
    );
  }
}
