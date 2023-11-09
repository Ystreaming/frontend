import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Categorie {
  titre: string;
  image: string;
}

interface Comment {
  username: string;
  comment: string;
  date: string;
}

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

  videos: Video[] = [];
  videosByViews: Video[] = [];
  hoveredIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVideos();
    this.loadVideosByViews();
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

  loadVideosByViews(): void {
    this.http.get<Video[]>('/assets/video.json').subscribe(
        data => {
          this.videosByViews = data.sort((a, b) => b.views - a.views);
        },
        error => {
          console.error('Erreur lors du chargement des vidéos triées par vues', error);
        }
    );
  }
}
