import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    userStats = {
        numberOfVideos: 0,
        totalViews: 0,
        totalSub: 0,
    };
    environment = environment;
    @Input() channelIdFromParent: string = '';

    constructor(
        private channelService: ChannelService,
    ) {}

    ngOnInit() {
        if (this.channelIdFromParent) {
            this.channelService.getChannelById(this.channelIdFromParent).subscribe(channelData => {
                if (channelData) {
                    this.userStats.numberOfVideos = channelData.idVideos.length;
                    this.userStats.totalSub = channelData.subNumber;
                }
            });
        }
    }
}
