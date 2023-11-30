import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.scss']
})
export class ListSubscriptionComponent {
  imagePath = 'assets/moi.jpeg';
  imageAltText = 'image profil';

  totalItems = Array(20).fill(0);
  displayedItemsCount = 8;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustDisplayedItems();
  }

  showMore(): void {
    this.displayedItemsCount = Math.min(this.displayedItemsCount + 8, this.totalItems.length);
  }

  showLess(): void {
    this.displayedItemsCount = Math.max(this.displayedItemsCount - 8, 8);
  }

  private adjustDisplayedItems(): void {
    // Obtenez la largeur actuelle de la fenêtre
    const windowWidth = window.innerWidth;

    // Si la largeur de la fenêtre est inférieure à 1400px, affichez tous les éléments
    if (windowWidth < 1400) {
      this.displayedItemsCount = this.totalItems.length;
    } else {
      // Sinon, réinitialisez le nombre d'éléments affichés à 8
      this.displayedItemsCount = 8;
    }
  }
}
