import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  environment = environment;
  user: any;
  selectedTab: string = 'dashboard';
  channel: any;

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private route: ActivatedRoute,
      private channelService: ChannelService
  ) {}

  ngOnInit() {
    const userId = this.localStorageService.getUserDetails();

    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
        this.channelService.getChannelByUserId(userId).subscribe(channel => {
          this.channel = channel;
        });
      });
    }

    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'settings') {
        this.selectedTab = 'settings';
      }
    });
  }
}