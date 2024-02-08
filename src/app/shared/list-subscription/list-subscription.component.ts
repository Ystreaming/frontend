import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, MyJWTPayload } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ListSubscriptionService } from 'src/app/services/list-subscription.service';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.scss']
})
export class ListSubscriptionComponent implements OnInit {
  subscribers: any = [];
  environment = environment;

  constructor
  (
    private localStorageService: LocalStorageService, private userService: UserService,
    private listSubscriptionService: ListSubscriptionService
  ) {}
  
  ngOnInit(): void {
    let userId = this.localStorageService.getUserDetails();
    if (userId) {
      this.loadSubscribers(userId!);
      this.listSubscriptionService.refreshListObservable.subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  loadSubscribers(userId: string) {
    this.userService.getSubByUser(userId).subscribe(response => {
      this.subscribers = response.subItems;
    });
  }
}
