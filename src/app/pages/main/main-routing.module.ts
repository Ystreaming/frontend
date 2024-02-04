import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { VideoPageComponent } from "./video-page/video-page.component";
import { FollowingPageComponent } from "./following-page/following-page.component";
import { MostViewedPageComponent } from "./most-viewed-page/most-viewed-page.component";
import { ProfilPageComponent } from "./profil-page/profil-page.component";
import { SearchComponent } from "./search/search.component";
import { VideosByCategoryPageComponent } from "./videos-by-category-page/videos-by-category-page.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'video/:id', component: VideoPageComponent }, // Route pour les détails de la vidéo
            { path: 'channel/:streamerName', component: ProfilPageComponent }, // Route pour la chaine
            { path: 'following', component: FollowingPageComponent }, // Route pour la liste des vidéos de vos chaînes préférées
            { path: 'most-viewed', component: MostViewedPageComponent }, // Route pour la liste des vidéos les plus vues
            { path: 'category/:id', component: VideosByCategoryPageComponent },
            { path: 'search/:searchQuery', component: SearchComponent }, // Route pour la recherche
            { path: '', component: HomePageComponent }, // Route pour la page d'accueil
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}