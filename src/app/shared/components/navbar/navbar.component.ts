import { Component, Input } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user.model";

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent{

    @Input('usuario-online') usrOnline!: User ;
    @Input('page') page: string = '';

    constructor(
        private router:Router,
        private angFireDb:AngularFireDatabase
    ){}
    sair(){
        localStorage.clear();
        this.router.navigate(['sair']);
        if(this.usrOnline.participante == "participante" && this.usrOnline.id != "" ){
            this.angFireDb.object(`user/${this.usrOnline.id}`).remove();
        }
    }
}