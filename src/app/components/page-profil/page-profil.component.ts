import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin, of } from 'rxjs';
import { ListSubscriptionService } from 'src/app/services/list-subscription.service';

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
  isSub: boolean = false;

  constructor
  (
    private route: ActivatedRoute, private channelService: ChannelService,
    private localStorageService: LocalStorageService, private userService: UserService,
    private listSubscriptionService: ListSubscriptionService
  ) { }

  ngOnInit() {
    this.channelName = this.route.snapshot.paramMap.get('streamerName');
    this.loadData();
  }

  loadData() {
    let userId = this.localStorageService.getUserDetails();

    forkJoin({
      channelData: this.channelService.searchChannelByUsername(this.channelName),
      subData: userId ? this.userService.getSubByUser(userId) : of(null),
    }).subscribe(({ channelData, subData }) => {
      this.channelData = channelData.channel[0];

      if (subData) {
        this.isSub = subData.subItems.some((sub: any) => sub._id === channelData.channel[0]._id);
      }
    });
  }

  subscribe() {
    let userId = this.localStorageService.getUserDetails();

    if (userId === null) {
      return;
    }
    
    let idChannel = this.channelData._id;
    this.userService.createSub(idChannel).subscribe(() => {
      this.ngOnInit();
      this.listSubscriptionService.refreshComponent();
    })
  }
}
