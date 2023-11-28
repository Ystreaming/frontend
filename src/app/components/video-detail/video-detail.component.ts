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
  commentText: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const videoId = +params.get('id')!;
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

  // Méthode pour obtenir la représentation textuelle de la date
  getTimeSince(date: string): string {
    const now = new Date();
    const past = new Date(date);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = now.getTime() - past.getTime();

    if (elapsed < msPerMinute) {
      return 'il y a moins d\'une minute';
    } else if (elapsed < msPerHour) {
      return `il y a ${Math.round(elapsed/msPerMinute)} minute(s)`;
    } else if (elapsed < msPerDay ) {
      return `il y a ${Math.round(elapsed/msPerHour )} heure(s)`;
    } else if (elapsed < msPerMonth) {
      return `il y a ${Math.round(elapsed/msPerDay)} jour(s)`;
    } else if (elapsed < msPerYear) {
      return `il y a ${Math.round(elapsed/msPerMonth)} mois`;
    } else {
      return `il y a ${Math.round(elapsed/msPerYear )} an(s)`;
    }
  }
}
