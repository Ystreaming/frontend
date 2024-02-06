import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IVideo } from 'src/app/models/video.model';

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
      private channelService: ChannelService,
      private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadChannel();
  }

  loadChannel() {
    if (this.channelIdFromParent) {
      this.channelService.getChannelById(this.channelIdFromParent).subscribe(response => {
        this.channelData = response;
        this.videos = this.channelData.idVideos;
        console.log('Données de la chaîne :', this.channelData);
        console.log('Vidéos récupérées :', this.videos);
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
          console.log('Vidéo supprimée avec succès', response);
          this.videos = this.videos.filter(video => video._id !== this.videoToDelete);
          this.videoToDelete = null;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la vidéo', error);
        }
      });
    }
  }

  openUpdateVideo(video: IVideo) {
    console.log('ID de la vidéo sélectionnée pour mise à jour : ', video._id);
    this.videoToUpdate = { ...video };
  }

  updateVideo() {
    if (this.videoToUpdate && this.videoToUpdate._id) {
      const url = `${environment.apiUrl}/videos/${this.videoToUpdate._id}`;

      this.http.put(url, this.videoToUpdate).subscribe({
        next: (response) => {
          console.log('Réponse de la mise à jour de la vidéo : ', response);

          this.videos = this.videos.map(video =>
              video._id === this.videoToUpdate?._id ? this.videoToUpdate : video
          );

          this.videoToUpdate = null;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la vidéo : ', error);
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