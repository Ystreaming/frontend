import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  environment = environment;
  user: any;

  constructor(private localStorageService: LocalStorageService, private userService: UserService) {}

  ngOnInit(): void {
    let userId = this.localStorageService.getUserDetails();

    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(response => {
        this.user = response;
      });
    }
  }
}
