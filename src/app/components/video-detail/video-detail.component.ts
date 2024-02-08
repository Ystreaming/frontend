import { IComment } from './../../models/comment.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription, forkJoin, of } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { ListSubscriptionService } from 'src/app/services/list-subscription.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
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
  streamData: any;
  commentData: any;
  commentText: string = '';
  subscriberCount: number | undefined;
  environment = environment;
  isSub: boolean = false;

  videoUrl: SafeUrl | null = null;

  constructor(
    private route: ActivatedRoute, private videoService: VideoService,
    private commentService: CommentService, private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer, private userService: UserService,
    private listSubscriptionService: ListSubscriptionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id')!;
      this.loadData(this.videoId);
      this.loadVideoStream(this.videoId);
    });
  }

  loadData(videoId: string) {
    let userId = this.localStorageService.getUserDetails();
  
    forkJoin({
      videoData: this.videoService.getVideoById(videoId),
      commentData: this.videoService.getCommentsByVideoId(videoId),
      subData: userId ? this.userService.getSubByUser(userId) : of(null),
    }).subscribe(({ videoData, commentData, subData }) => {
      this.videoData = videoData;
      this.commentData = commentData;
      
      if (subData) {
        this.isSub = subData.subItems.some((sub: any) => sub._id === videoData.idChannel._id);
      }
    });
  }
  

  loadVideoStream(videoId: string) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(this.videoService.getStreamVideo(videoId));
  }

  addComment() {
    let data = {
      texte: this.commentText,
      idUser: this.localStorageService.getUserDetails(),
      idVideo: this.videoId
    };
    this.commentService.createComment(data).subscribe(response => {
      this.ngOnInit();
    })
  }

  subscribe() {
    let userId = this.localStorageService.getUserDetails();

    if (userId === null) {
      return;
    }
    
    let idChannel = this.videoData.idChannel._id;
    this.userService.createSub(idChannel).subscribe(() => {
      this.ngOnInit();
      this.listSubscriptionService.refreshComponent();
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
