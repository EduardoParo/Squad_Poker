
import { Injectable, Injector } from "@angular/core";

import { User } from "../../../shared/models/user.model";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Injectable({ providedIn :'root'})

export class HomeService extends BaseResourceService<User> {

    public participants: User[] =[];
    public usrOnline = User.getUserOnline();

    constructor(
        protected override injector:Injector,
        protected override angFireDb: AngularFireDatabase,
    ){
        super('user' , injector)
    }

    revealPoints(participants:User[],hasWinner=false): void{
        
        if(!hasWinner){
            participants.forEach((element:any) => {
                element.showVenc = true;
                this.angFireDb.list(this.API).update(element.id, element); 
            }); 
        }    
        this.winnerPoint(participants);
    }
    
    resetPoints(participants:User[]): void{
        participants.forEach((element:any) => {
            element.voto = 0;
            element.showVenc = false;
            //console.log("reset",element);
            this.angFireDb.list(this.API).update(element.id, element); 

        });  

        this.modalService.closeModal();
           
    }

    winnerPoint(participants:any){
        let points  = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
        let qtdOfParticipants = 0;
        let winnerPoint = 0;
        let contAux = 0;
        let params:any = [];

        for(let x=0; x<points.length; x++){
            let qtdOfPartAux = participants.filter((e:any)=>e.voto ==points[x]).length;

            if( qtdOfPartAux > qtdOfParticipants ){
                qtdOfParticipants =   qtdOfPartAux;  
                winnerPoint = points[x];
                
            }else{
                contAux++;
            }
        }

        if( Math.trunc(participants.length/2) == qtdOfParticipants && qtdOfParticipants!= contAux){
            //alert('empate');
            params = [qtdOfParticipants, winnerPoint];
            this.modalService.buildModal(4 , params);
        }else{
            //alert('Ganhador é '+winnerPoint+' '+ qtdOfParticipants+' participantes votaram');
            params = [qtdOfParticipants, winnerPoint];
            this.modalService.buildModal(3 , params);  
        }
    }


}