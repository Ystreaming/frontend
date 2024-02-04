import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  environment = environment;
  user: any;
  searchTerm: string = '';

  constructor(private localStorageService: LocalStorageService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    let userId = this.localStorageService.getUserDetails();

    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(response => {
        this.user = response;
      });
    }
  }

  onSearchEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  search(): void {
    if (this.router.url.startsWith('/search')) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/search', this.searchTerm]);
      });
    } else {
      this.router.navigate(['/search', this.searchTerm]);
    }
  }
}
