import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { LoginPageComponent} from "./pages/login-page/login-page.component";
import { RegisterPageComponent} from "./pages/register-page/register-page.component";
import { ProfilPageComponent} from "./pages/profil-page/profil-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Route pour la page d'accueil
  { path: 'video/:id', component: VideoPageComponent }, // Route pour les détails de la vidéo
  { path: 'login', component: LoginPageComponent}, // Route pour la connexion
  { path: 'register', component: RegisterPageComponent}, // Route pour l'inscription
  { path: 'channel/:streamerName', component: ProfilPageComponent}, // Route pour la chaine
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
