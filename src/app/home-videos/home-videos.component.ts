import { Component } from '@angular/core';

interface Categorie {
  titre: string;
  image: string;
}

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.scss']
})

export class HomeVideosComponent {
  // Image
  miniatureVideo = 'assets/miniatureVideo.jpeg';
  imageProfil = 'assets/moi.jpeg'

  miniatureCategorie: Categorie[] = [
    { titre: 'Gaming', image: 'assets/gaming.jpg' },
    { titre: 'IRL', image: 'assets/irl.jpg' },
    { titre: 'Podcast', image: 'assets/podcastv2.jpg' }
  ];

  // Description
  miniatureDescription = 'miniature description';
  imageProfilDescription = 'image profil'

  videos = Array(3).fill(0);

  hoveredIndex: number | null = null;  // Variable pour suivre l'index de l'élément survolé
}
