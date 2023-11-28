import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

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
  subscriberCount: number | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

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
      const video = videos.find(v => v.id === videoId);
      if (video) {
        this.videoData = video;
        this.loadStreamerData(video.streamerName);
      }
    }, error => {
      console.error('Error loading video data', error);
    });
  }

  loadStreamerData(streamerName: string) {
    this.http.get<{ channels: any[] }>('/assets/ystreameur.json').subscribe(data => {
      const streamer = data.channels.find(channel => channel.name === streamerName);
      if (streamer) {
        this.subscriberCount = streamer.subscriberCount;
      }
    }, error => {
      console.error('Error loading streamer data', error);
    });
  }

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
