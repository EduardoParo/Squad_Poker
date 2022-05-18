import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { ModalComponent } from "./modal/modal.component";
import { NavBarComponent } from "./navbar/navbar.component";

@NgModule({
    imports:[
       CommonModule
    ],
    declarations:[
        NavBarComponent,
        FooterComponent,
        ModalComponent,
        
    ],
    exports:[
        NavBarComponent,
        FooterComponent,
        ModalComponent
    ],
})

export class SharedModule{

}