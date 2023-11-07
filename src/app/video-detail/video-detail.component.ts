import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

interface Comment {
  username: string;
  imageUsernameCommentaire: string;
  comment: string;
  date: string;
}
@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  videoData: Video | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Utilisez l'opérateur '!' pour dire à TypeScript que vous êtes sûr que 'id' n'est pas null
      const videoId = +params.get('id')!; // Le '+' convertit la chaîne en nombre

      if (videoId) {
        this.loadVideoData(videoId);
      }
    });
  }

  loadVideoData(videoId: number) {
    this.http.get<Video[]>('/assets/video.json').subscribe(videos => {
      this.videoData = videos.find(video => video.id === videoId);
    }, error => {
      console.error('Error loading video data', error);
    });
  }
}
