import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Route pour la page d'accueil
  { path: 'video/:id', component: VideoPageComponent }, // Route pour les détails de la vidéo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
