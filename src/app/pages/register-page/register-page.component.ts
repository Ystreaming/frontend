import { Component, Renderer2 } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  user: IUser = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth: "",
    username: "",
    password: "",
    createdAt: new Date().toISOString(),
    status: false,
    language: "",
    profileImage: ""
  };

  constructor(private renderer: Renderer2) {}

  onFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const label = target.previousElementSibling as HTMLElement;
    if (label) {
      this.renderer.setStyle(label, 'color', '#EC567C');
    }
  }

  onBlur(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const label = target.previousElementSibling as HTMLElement;
    if (label) {
      this.renderer.removeStyle(label, 'color');
    }
  }

  submitForm(): void {
    console.log('User submitted:', this.user);
  }
}
