import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  constructor(
      private channelService: ChannelService,
      private localStorageService: LocalStorageService,
      private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadChannel();
  }

  loadChannel() {
    const userId = '65afc4c36e416a8be03943ef'; // Exemple d'ID utilisateur

    if (userId) {
      this.channelService.getChannelById(userId).subscribe(response => {
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
      const url = `http://35.180.39.107:3000/videos/${this.videoToDelete}`;
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
}
