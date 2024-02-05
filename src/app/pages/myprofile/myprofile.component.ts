import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  environment = environment;
  user: any;
  selectedTab: string = 'dashboard';
  channelId: string | null = null;

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.localStorageService.getUserDetails();

    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
      this.userService.getUserChannel(userId).subscribe(channelId => {
        this.channelId = channelId;
      });
    }
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'settings') {
        this.selectedTab = 'settings';
      }
    });
  }
}
