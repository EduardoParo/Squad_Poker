import { ThisReceiver } from "@angular/compiler";
import { Component, Injector, OnInit } from "@angular/core";
import { BaseResourceHome } from "src/app/shared/components/base-resource-home/base-resource-home";


import { User } from "src/app/shared/models/user.model";

@Component({
    selector:'app-home',
    templateUrl:'home.component.html'
})

export class HomeComponent extends BaseResourceHome<User> implements OnInit{

    participants:User[] = [];
    spectators:User[] = [];
    usrOnline = User.getUserOnline();
    showBtnRealPoints = false;
    hasWinner = false;
    
    
    constructor(
        protected injector:Injector,
        
    ){
        super(injector)
    }

    override ngOnInit(): void {     
       super.ngOnInit;
        this.loadUsers();    
    }

    loadUsers(): void{
        this.service.getAll()
        .subscribe(
            (resp)  =>{
                this.hasWinner = false;
                this.hasUpdateUser(resp);
                this.getAllParticipants(resp);
                this.hasResetPoint();
                this.validHasWinner();
            },
            error => console.log('Erro servicegetAll',error)
        );
    }

    hasUpdateUser(resp = []): void{
        if(this.usrOnline.participante == "participante"){
            this.usrOnline = resp.filter((e : any)=> e.id == this.usrOnline.id)[0];
            if(this.usrOnline == undefined){
                localStorage.clear();
                this.router.navigate(['sair']);
            }
        }
    }

    getAllParticipants(resp = []): void{
        this.participants = resp.filter((e:any)=>this.usrOnline.squad == e.squad &&
                    e.participante == "participante");
    }

    hasResetPoint(): void {
        if(this.usrOnline.voto == 0 ){
            let points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
            points.forEach(element => {
                 document.getElementById(`${element}`)?.classList.remove('btn-primary');
                document.getElementById(`${element}`)?.classList.add('btn-outline-primary');
            });
        }
    }

    validHasWinner(): void{
        let hasPointWinner = [];
        
        this.showBtnRealPoints = this.participants.filter((e:any)=> e.voto == 0).length == 0;

        if (this.showBtnRealPoints){
            hasPointWinner = this.participants.filter((e:any)=> e.showVenc == true &&
             e.squad == this.usrOnline.squad && e.participante == "participante");
            
            if(hasPointWinner.length >0 && this.participants[0].voto>0){
                this.hasWinner = true;
                this.service.revealPoints(this.participants, this.hasWinner);
            }
        }   
        
        
    }


}