import { Directive, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomeService } from "src/app/shared/services/home.service";
import { UserService } from '../../services/users.service';
import { ModalService } from "../modal/modal.service";

@Directive()
export abstract class BaseResourceHome<User> implements OnInit{
    
    service:HomeService;
    modalService:ModalService;
    userService:UserService;
    router:Router;

    constructor(
        injector:Injector,
    ){
        this.service = injector.get(HomeService);
        this.userService = injector.get(UserService);
        this.modalService = injector.get(ModalService);
        this.router = injector.get(Router);
    }

    ngOnInit(): void {   
        
    }

}