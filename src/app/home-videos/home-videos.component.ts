import { Component } from '@angular/core';

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.scss']
})
export class HomeVideosComponent {
  // Image
  miniatureVideo = 'assets/miniatureVideo.jpeg';
  imageProfil = 'assets/moi.jpeg'

  // Description
  miniatureDescription = 'miniature description';
  imageProfilDescription = 'image profil'

  videos = Array(3).fill(0);
}
