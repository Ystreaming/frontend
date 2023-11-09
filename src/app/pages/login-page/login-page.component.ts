import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private renderer: Renderer2) {}

  // Méthode pour gérer l'événement focus
  onFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const label = target.previousElementSibling as HTMLElement;
    if (label) {
      this.renderer.setStyle(label, 'color', '#EC567C');
    }
  }

  // Méthode pour gérer l'événement blur
  onBlur(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const label = target.previousElementSibling as HTMLElement;
    if (label) {
      this.renderer.removeStyle(label, 'color');
    }
  }
}
