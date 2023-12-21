import { IComment } from './../../models/comment.model';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  videoId: string = "";
  videoData: any;
  commentData: any;
  commentText: string = '';
  subscriberCount: number | undefined;
  environment = environment;

  constructor(
    private route: ActivatedRoute, private videoService: VideoService,
    private commentService: CommentService, private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id')!;
      this.loadVideo(this.videoId);
      this.loadComments(this.videoId);
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

  addComment() {
    let data = {
      texte: this.commentText,
      idUser: this.localStorageService.getUserDetails(),
      idVideo: this.videoId
    };
    this.commentService.createComment(data).subscribe(response => {
      window.location.reload();
    })
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
