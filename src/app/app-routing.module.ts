import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { LoginPageComponent} from "./pages/login-page/login-page.component";
import { RegisterPageComponent} from "./pages/register-page/register-page.component";
import { ProfilPageComponent} from "./pages/profil-page/profil-page.component";
import { IsNotSignedInGuard } from './guards/is-not-signed-in.guard';
import { FollowingPageComponent } from './pages/following-page/following-page.component';
import { MostViewedPageComponent } from './pages/most-viewed-page/most-viewed-page.component';
import { VideosByCategoryPageComponent } from './pages/videos-by-category-page/videos-by-category-page.component';
import { SearchComponent } from './pages/search/search.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Route pour la page d'accueil
  { path: 'video/:id', component: VideoPageComponent }, // Route pour les détails de la vidéo
  { path: 'login', component: LoginPageComponent, canActivate: [IsNotSignedInGuard] }, // Route pour la connexion
  { path: 'register', component: RegisterPageComponent, canActivate: [IsNotSignedInGuard] }, // Route pour l'inscription
  { path: 'channel/:streamerName', component: ProfilPageComponent }, // Route pour la chaine
  { path: 'following', component: FollowingPageComponent }, // Route pour la liste des vidéos de vos chaînes préférées
  { path: 'most-viewed', component: MostViewedPageComponent }, // Route pour la liste des vidéos les plus vues
  { path: 'category/:id', component: VideosByCategoryPageComponent },
  { path: 'search/:searchQuery', component: SearchComponent }, // Route pour la recherche
  { path: 'profile', component: MyprofileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
