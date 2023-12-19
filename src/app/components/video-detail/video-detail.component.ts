import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  videoData: any;
  commentData: any;
  commentText: string = '';
  subscriberCount: number | undefined;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const videoId = params.get('id')!;
      this.loadVideo(videoId);
      this.loadComments(videoId);
    });
  }

  loadVideo(videoId: string) {
    this.videoService.getVideoById(videoId).subscribe(response => {
      this.videoData = response;
    });
  }

  loadComments(videoId: string) {
    this.videoService.getCommentsByVideoId(videoId).subscribe(response => {
      this.commentData = response;
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
