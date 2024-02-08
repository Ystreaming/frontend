import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'profile',
                loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
            },
            {
                path: '',
                loadChildren: () => import('./user/user.module').then(module => module.UserModule),
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}