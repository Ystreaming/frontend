import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
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

  constructor(private channelService: ChannelService, private notifierService: NotifierService) {}

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
          this.notifierService.notify('success', 'Les paramètres de la chaîne ont été modifiés avec succès !');
        },
        error: (error) => {
          this.notifierService.notify('error', 'Échec de la mise à jour de la chaîne');
        }
      });
    } else {
      this.notifierService.notify('error', 'ID de la chaîne manquant ou chaîne non défini');
    }
  }

}
