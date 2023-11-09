import { Component } from '@angular/core';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.scss']
})
export class ListSubscriptionComponent {
  imagePath = 'assets/moi.jpeg';
  imageAltText = 'image profil';

  totalItems = Array(20).fill(0);  // Crée un tableau de 20 éléments
  displayedItemsCount = 8;  // Nombre d'éléments à afficher initialement

  // Méthode pour afficher plus d'éléments
  showMore(): void {
    this.displayedItemsCount = Math.min(this.displayedItemsCount + 8, this.totalItems.length);
  }

  // Méthode pour afficher moins d'éléments
  showLess(): void {
    this.displayedItemsCount = Math.max(this.displayedItemsCount - 8, 8);
  }
}
