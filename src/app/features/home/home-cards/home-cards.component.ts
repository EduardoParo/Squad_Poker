import { Component, Injector, Input, OnInit } from "@angular/core";
import { BaseResourceHome } from "src/app/shared/components/base-resource-home/base-resource-home";

import { User } from "src/app/shared/models/user.model";
import { HomeService } from "../shared/home.service";


@Component({
    selector:'home-cards',
    templateUrl:'./home-cards.component.html',
    styleUrls: ['./home-cards.component.css']

})

export class HomeCardsComponent  extends BaseResourceHome<User> {
    @Input('participants') participants!:User[];
    @Input('usrOnline') usrOnline!:User;
    @Input('showBtnRealPoints') showBtnRealPoints!:boolean;

    constructor(
        protected injector:Injector,
        protected homeService:HomeService,
    ){
        super(injector)
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }
}