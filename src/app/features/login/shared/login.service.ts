import { Injectable, Injector } from "@angular/core";
import { catchError } from "rxjs";
import { BaseResourceService } from "src/app/shared/services/base-resource.service";
import { User } from "../../../shared/models/user.model";

@Injectable({ providedIn :'root'})

export class LoginService extends BaseResourceService<User>{
    public override API = 'user';

    constructor(
        protected override injector:Injector
    ){
        super('user',injector)
    }

    /*---------------------------------------------
    | Criar um usuário                            |
    ----------------------------------------------*/
    public createUser(usr:User){
        return this.angFireDb.list(this.API).push(usr)
            .then(
                (resp:any)=>this.insertKeyId(usr, resp.key),
                catchError(this.handleErr)
            )
    }

   /*---------------------------------------------
    |Iserir Id                                    |
    ----------------------------------------------*/    
    public insertKeyId(usr:User, keyId:string){
        usr.id = keyId;
        this.angFireDb.list(this.API).update(keyId, usr)
            .then(
                ()=>this.setLocalStorage(usr),
                catchError(this.handleErr)
            )
    }

    /*---------------------------------------------
    |Salvar no Storage                            |
    ----------------------------------------------*/ 
    public setLocalStorage(usr: any):void{
        localStorage.setItem('id', usr.id );
        localStorage.setItem('nome', usr.nome);
        localStorage.setItem('squad', usr.squad);
        localStorage.setItem('participante', usr.participante);
    }
}