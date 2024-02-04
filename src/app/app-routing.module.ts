import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent} from "./pages/login-page/login-page.component";
import { RegisterPageComponent} from "./pages/register-page/register-page.component";
import { IsNotSignedInGuard } from './guards/is-not-signed-in.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [IsNotSignedInGuard] }, // Route pour la connexion
  { path: 'register', component: RegisterPageComponent, canActivate: [IsNotSignedInGuard] }, // Route pour l'inscription
  { 
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(module => module.MainModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
