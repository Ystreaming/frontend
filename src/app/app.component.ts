import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private notifierService: NotifierService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getRealtimeNotifications().subscribe(notification => {
      this.notifierService.notify('success', notification.title);
    });
  }
}
