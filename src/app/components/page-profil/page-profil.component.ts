import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {
  channelName: any;
  channelData: any;
  videos: any[] = [];
  environment = environment;

  constructor(private route: ActivatedRoute, private channelService: ChannelService) { }

  ngOnInit() {
    this.channelName = this.route.snapshot.paramMap.get('streamerName');
    this.loadChannel();
  }

  loadChannel() {
    this.channelService.searchChannelByUsername(this.channelName).subscribe(response => {
      this.channelData = response.channel[0];
      console.log(this.channelData);
    })
  }
}
