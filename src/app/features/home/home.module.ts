import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomeRoutingModule } from "./home.routing.module";

import { SharedModule } from "src/app/shared/components/shared.module";
import { HomeService } from "../../shared/services/home.service";
import { AutenticacaoGuard } from "./autenticacao-guard.service";
import { HomeCardsComponent } from "./home-cards/home-cards.component";
import { HomeVotosComponent } from "./home-points/home-points.component";
import { HomeComponent } from "./home.component";

@NgModule({
    imports:[
        CommonModule,
        HomeRoutingModule,
        SharedModule,
    ],
    declarations:[
        HomeComponent,
        HomeVotosComponent,
        HomeCardsComponent,
    ],
    providers:[AutenticacaoGuard, HomeService]
})

export class HomeModule{

}