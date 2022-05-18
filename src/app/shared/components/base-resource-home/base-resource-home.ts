import { Directive, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HomeService } from "src/app/features/home/shared/home.service";
import { User } from "../../../shared/models/user.model";
import { ModalService } from "../modal/modal.service";

@Directive()
export abstract class BaseResourceHome<User> implements OnInit{
    
    service:HomeService;
    modalService:ModalService;
    router:Router;

    constructor(
        injector:Injector,
    ){
        this.service = injector.get(HomeService);
        this.modalService = injector.get(ModalService);
        this.router = injector.get(Router);
    }

    ngOnInit(): void {   
        
    }

}