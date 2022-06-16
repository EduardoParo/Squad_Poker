
import { Injectable, Injector, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { UserService } from 'src/app/shared/services/users.service';
import { User } from "../models/user.model";


@Injectable({ providedIn :'root'})

export class HomeService extends BaseResourceService<User> implements OnInit {

    public participants: User[] =[];
    public userOnline: User = {};

    constructor(
        protected override injector:Injector,
        protected override angFireDb: AngularFireDatabase,
        public userService: UserService
    ){
        super('user' , injector)
    }

    ngOnInit(): void {
        this.userOnline = this.userService.getUserOnline();
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
        let contAux = 0;
        let winner = [{
            qtdOfParticipants : 0,
            winnerPoint:0
        }]
        let params:any = [];

        for(let x=0; x<points.length; x++){
            let qtdOfPartAux = participants.filter((e:any)=>e.voto ==points[x]).length;

            if( qtdOfPartAux > winner[0].qtdOfParticipants ){
                winner[0].qtdOfParticipants =   qtdOfPartAux;  
                winner[0].winnerPoint = points[x];
            
            }else if( winner[0].qtdOfParticipants>0 && qtdOfPartAux == winner[0].qtdOfParticipants ){
                winner.push({"qtdOfParticipants" :  qtdOfPartAux , "winnerPoint" : points[x]});  
            
            }else{
                contAux++;
            }
        }
        if(winner[1] && winner[0].qtdOfParticipants > winner[1].qtdOfParticipants){
            params = winner[0];
            this.modalService.buildModal(3 , params); 
            return; 
        }

        if(winner[1] && winner[1] && winner[1].qtdOfParticipants > winner[0].qtdOfParticipants){
            params = winner[1];
            this.modalService.buildModal(3 , params);  
            return;
        }

        //if( Math.trunc(participants.length/2) == winner[0].qtdOfParticipants && winner[0].qtdOfParticipants!= contAux){
        if (winner[1] &&  winner[0].qtdOfParticipants == winner[1].qtdOfParticipants) {  
        //alert('empate');
            params = [winner, participants.length];
            this.modalService.buildModal(4 , params ); //Empate
        }else{
            //alert('Ganhador é '+winnerPoint+' '+ qtdOfParticipants+' participantes votaram');
            params = winner[0];
            this.modalService.buildModal(3 , params);  
        }
    }


}