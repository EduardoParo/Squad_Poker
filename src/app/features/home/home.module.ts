import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomeRoutingModule } from "./home.routing.module";

import { SharedModule } from "src/app/shared/components/shared.module";
import { HomeComponent } from "./home/home.component";
import { HomeVotosComponent } from "./home-points/home-points.component";
import { HomeCardsComponent } from "./home-cards/home-cards.component";
import { AutenticacaoGuard } from "./autenticacao-guard.service";
import { HomeService } from "./shared/home.service";

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