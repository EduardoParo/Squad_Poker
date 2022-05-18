import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginRoutingModule } from "./login.routing.module";
import { SharedModule } from "src/app/shared/components/shared.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    imports:[
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        SharedModule
    ],
    declarations:[
        LoginComponent,
        LoginFormComponent
    ],

})

export class LoginModule{

}