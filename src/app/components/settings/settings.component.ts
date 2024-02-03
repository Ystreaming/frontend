import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  channel: any = null;
  environment = environment;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.loadChannel();
  }

  loadChannel(): void {
    const channelId = '65afc4c36e416a8be03943ef';
    this.channelService.getChannelById(channelId).subscribe({
      next: (data) => {
        this.channel = data;
        console.log('Réponse du chargement du canal:', data);
      },
      error: (err) => console.error(err)
    });
  }

  get imageUrl() {
    return this.channel && this.channel.image
        ? `${environment.apiUrl}/uploads/${this.channel.image.filename}`
        : null;
  }

  updateChannel(): void {
    console.log("Tentative de mise à jour du canal", this.channel);

    if (this.channel && this.channel._id) {
      this.channelService.updateChannelById(this.channel._id, this.channel).subscribe({
        next: (data) => {
          console.log('Canal mis à jour avec succès', data);
        },
        error: (error) => {
          console.error('Échec de la mise à jour du canal', error);
        }
      });
    } else {
      console.error("ID du canal manquant ou canal non défini");
    }
  }
}
