import { IComment } from './../../models/comment.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit, OnDestroy {
  videoId: string = "";
  videoData: any;
  streamData: any;
  commentData: any;
  commentText: string = '';
  subscriberCount: number | undefined;
  environment = environment;
  isSub: boolean = false;

  videoUrl: SafeUrl | null = null;
  private videoSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute, private videoService: VideoService,
    private commentService: CommentService, private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer, private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id')!;
      this.loadData(this.videoId);
      this.loadSubs();
      this.loadVideoStream(this.videoId);
    });
  }

  ngOnDestroy(): void {
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl as string);
    }
  }

  loadData(videoId: string) {
    forkJoin({
      videoData: this.videoService.getVideoById(videoId),
      commentData: this.videoService.getCommentsByVideoId(videoId),
    }).subscribe(({ videoData, commentData }) => {
      this.videoData = videoData;
      this.commentData = commentData;
    })
  }

  loadVideoStream(videoId: string) {
    this.videoSubscription = this.videoService.getStreamVideo(videoId).subscribe(blob => {
      const unsafeUrl = URL.createObjectURL(blob);
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
    });
  }

  loadSubs() {
    let userId = this.localStorageService.getUserDetails();

    if (userId === null) {
      return;
    }

    this.userService.getSubByUser(userId).subscribe(response => {
      response.subItems.forEach((sub: any) => {
        if (sub._id === this.videoData.idChannel._id) {
          this.isSub = true;
        }
      });
    });
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
