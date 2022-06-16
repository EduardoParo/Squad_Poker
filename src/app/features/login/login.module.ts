import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/components/shared.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login.routing.module";


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