import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from 'src/app/shared/services/users.service';
import { HomeService } from "../../shared/services/home.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{

    constructor(
        private homeService:HomeService,
        private router:Router,
        public userService: UserService
    ){}
    
    canActivate() :boolean{
        let participants = [];
        let userOn = this.userService.getUserOnline();

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