import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userStats = {
    numberOfVideos: 0,
    totalViews: 0,
    totalSub: 0,
  };
  environment = environment;

  constructor(
      private userService: UserService,
      private channelService: ChannelService,
      private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const userId = '65afc4c36e416a8be03943ef';

    this.channelService.getChannelById(userId).subscribe(channelData => {
      if (channelData) {
        this.userStats.numberOfVideos = channelData.idVideos.length;
      }
    });

    this.userService.getSubByUser(userId).subscribe(subCount => {
      this.userStats.totalSub = subCount;
    });
  }
}
