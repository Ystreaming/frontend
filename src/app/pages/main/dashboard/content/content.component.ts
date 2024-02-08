import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IVideo } from 'src/app/models/video.model';
import {VideoService} from "../../../../services/video.service";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  channelData: any;
  videos: any[] = [];
  environment = environment;
  videoToDelete: string | null = null;
  videoToUpdate: IVideo | null = null;
  @Input() channelIdFromParent: string = '';

  constructor(
      private channelService: ChannelService, private http: HttpClient,
      private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.loadChannel();
  }

  loadChannel() {
    if (this.channelIdFromParent) {
      this.channelService.getChannelById(this.channelIdFromParent).subscribe(response => {
        this.channelData = response;
        this.videos = this.channelData.idVideos;
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  askDeleteConfirmation(videoId: string) {
    this.videoToDelete = videoId;
  }

  cancelDelete() {
    this.videoToDelete = null;
  }

  confirmDelete() {
    if (this.videoToDelete) {
      const url = `${this.environment.apiUrl}/videos/${this.videoToDelete}`;
      this.http.delete(url).subscribe({
        next: (response) => {
          this.videos = this.videos.filter(video => video._id !== this.videoToDelete);
          this.videoToDelete = null;
        },
        error: (error) => {
          this.notifierService.notify('error', 'Erreur lors de la suppression de la vidéo');
        }
      });
    }
  }

  openUpdateVideo(video: IVideo) {
    this.videoToUpdate = { ...video };
  }

  updateVideo() {
    if (this.videoToUpdate && this.videoToUpdate._id) {
      const url = `${environment.apiUrl}/videos/${this.videoToUpdate._id}`;

      this.http.put(url, this.videoToUpdate).subscribe({
        next: (response) => {
          this.videos = this.videos.map(video =>
              video._id === this.videoToUpdate?._id ? this.videoToUpdate : video
          );

          this.videoToUpdate = null;
        },
        error: (error) => {
          this.notifierService.notify('error', 'Erreur lors de la mise à jour de la vidéo');
        }
      });
    } else {
      console.error('Erreur : ID de la vidéo est undefined lors de la mise à jour');
    }
  }

  cancelUpdate() {
    this.videoToUpdate = null;
  }
}