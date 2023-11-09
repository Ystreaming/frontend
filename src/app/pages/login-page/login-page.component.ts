import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  onFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    this.renderer.setStyle(target, 'border-color', '#EC567C');
    const label = target.previousElementSibling;
    if (label) {
      this.renderer.setStyle(label, 'color', '#EC567C');
    }
  }

  onBlur(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    this.renderer.removeStyle(target, 'border-color');
    const label = target.previousElementSibling;
    if (label) {
      this.renderer.removeStyle(label, 'color');
    }
  }
}
