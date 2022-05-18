import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    { path: '', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
    { path: 'sair', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
    { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
   // { path: '**',   loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })


  export class AppRoutingModule { 
      
  }