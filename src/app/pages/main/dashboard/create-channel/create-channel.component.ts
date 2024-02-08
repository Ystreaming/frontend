import {Component, Input} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {
  @Input() idUser: string = '';
  name: string = '';
  description: string = '';
  image: File | null = null;

  constructor(private channelService: ChannelService, private notifierService: NotifierService) {}

  onFileSelected(event: any): void {
    this.image = event.target.files[0];
  }

  createChannel(): void {
    if (!this.name || !this.description || !this.image) {
      this.notifierService.notify('error', 'Le nom, la description et l\'image sont requis.');
      return;
    }

    const channelData = {
      idUser: this.idUser,
      idVideo: "dgzeufhuifaifif",
      name: this.name,
      description: this.description,
    };

    this.channelService.createChannel(channelData, this.image).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
