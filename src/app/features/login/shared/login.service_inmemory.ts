import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { User } from "../../../shared/models/user.model";

@Injectable({ providedIn :'root'})

export class LoginService{

    private API = 'app/users';

    constructor(
        protected http:HttpClient
    ){}

    create(usr:User):Observable<User>{
        return this.http.post(this.API, usr)
        .pipe(
            map(this.jToUser.bind(this)),
            catchError(this.handleErr)
        )

    }

    //Metodos PRIVATE
    private jToUser(jdata:any):User{
        jdata = Object.assign(new User, jdata);
        
        this.locStorage(jdata);
        
        return jdata;
    }
    private handleErr(jdata:any){
        console.log('Erro no serviço');
        return throwError(jdata);
    }

    private locStorage(usr:User):void{
        localStorage.setItem('id', Number(usr.id).toString());
        localStorage.setItem('nome', usr.nome);
        localStorage.setItem('squad', usr.squad);
        localStorage.setItem('participante', usr.participante);
    }


}