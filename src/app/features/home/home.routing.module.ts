import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AutenticacaoGuard } from "./autenticacao-guard.service";
import { HomeComponent } from "./home.component";

const routes:Routes = [
    {
        path:'',
        component:HomeComponent, canActivate:[AutenticacaoGuard]
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class HomeRoutingModule{

}