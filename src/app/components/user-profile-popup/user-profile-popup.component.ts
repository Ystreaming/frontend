import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-popup',
  templateUrl: './user-profile-popup.component.html',
  styleUrls: ['./user-profile-popup.component.scss']
})
export class UserProfilePopupComponent {
  userId: string = '123';
  imagePath = 'assets/moi.jpeg';
  imageAltText = 'image profil';

  isOpen = false;

  openPopup(): void {
    this.isOpen = true;
  }

  closePopup(): void {
    this.isOpen = false;
  }

  constructor(private router: Router) {}

  goToProfile(): void {
    this.router.navigate(['/profil', this.userId]);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
