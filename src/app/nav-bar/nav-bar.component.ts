import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  imagePath = 'assets/moi.jpeg';  // Chemin relatif vers votre image locale
  imageAltText = 'image profil';  // Texte alternatif pour votre image
}
