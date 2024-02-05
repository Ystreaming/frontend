import { Component } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
    userStats = {
      numberOfVideos: 0,
      totalViews: 0,
      totalSub: 0,
    };
    environment = environment;

    constructor(
        private channelService: ChannelService, private userService: UserService
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
