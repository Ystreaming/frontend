import {Component, Input} from '@angular/core';
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

  constructor(private channelService: ChannelService) {}

  onFileSelected(event: any): void {
    this.image = event.target.files[0];
  }

  createChannel(): void {
    if (!this.name || !this.description || !this.image) {
      alert('Le nom, la description et l\'image sont requis.');
      return;
    }

    const channelData = {
      idUser: this.idUser,
      idVideo: "65b7a4f15a039c8d19e6d868",
      name: this.name,
      description: this.description,
    };

    this.channelService.createChannel(channelData, this.image).subscribe({
      next: (response) => {
        console.log(response);
        window.location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
