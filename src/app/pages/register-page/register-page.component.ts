import { Component, Renderer2 } from '@angular/core';
import { IUser } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  user: IUser = {
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

  constructor(private renderer: Renderer2, private userService: UserService, private router: Router) {}

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
    this.userService.createUser(this.user).subscribe(res => {
      this.router.navigate(['/login']);
    })
  }
}
