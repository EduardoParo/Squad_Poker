import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { User } from "src/app/shared/models/user.model";
import { HomeService } from "./shared/home.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{

    constructor(
        private homeService:HomeService,
        private router:Router
    ){}
    
    canActivate() :boolean{
        let participants = [];
        let userOn = User.getUserOnline();

        //console.log('guard-service',this.router.parent)
        if(userOn.id !==null && userOn.squad !==null){
            //this.router.navigate(['home']);
            return true;
        }else{
            this.router.navigate([''])
            return false;
        }

        return true;
       
    }

}