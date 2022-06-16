import { Component, Injector, Input } from "@angular/core";
import { BaseResourceHome } from "src/app/shared/components/base-resource-home/base-resource-home";
import { User } from "src/app/shared/models/user.model";
import { HomeService } from "../../../shared/services/home.service";

@Component({
    selector:'home-points',
    templateUrl:'./home-points.component.html'
})

export class HomeVotosComponent extends BaseResourceHome<User>{

    @Input('hasWinner') hasWinner!:boolean;
    @Input('usrOnline') usrOnline!:User;
    
    constructor(
        protected injector:Injector,
        protected homeService:HomeService,
    ){
        super(injector)
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    Voto(point:number) :void{
        if( ! this.hasWinner){
            document.getElementById(`${this.usrOnline.voto}`)?.classList.remove('btn-primary');
            document.getElementById(`${this.usrOnline.voto}`)?.classList.add('btn-outline-primary');
            
            this.usrOnline.voto=point;
            localStorage.setItem('voto',point.toString()) ;
            this.service.update(this.usrOnline);
            
            document.getElementById(`${point}`)?.classList.remove('btn-outline-primary');
            document.getElementById(`${point}`)?.classList.add("btn-primary");  
        }    
    }
}