import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';
  constructor(
    private renderer: Renderer2, private userService: UserService,
    private localStorageService: LocalStorageService, private router: Router,
    private notifier: NotifierService
    ) {}

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

  submitLogin(): void {
    this.userService.loginUser(this.username, this.password).subscribe(token => {
      this.localStorageService.set('token', token);
      this.notifier.notify('success', 'Vous vous êtes connecté avec succès !');
      return this.router.navigate(['/']);
    }, error => {
      this.notifier.notify('error', 'Une erreur est survenue lors de la connexion !');
    })
  }
}
