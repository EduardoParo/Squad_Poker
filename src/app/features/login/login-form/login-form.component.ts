import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../../shared/models/user.model";
import { LoginService } from "../shared/login.service";

@Component({
    selector:'app-login-form',
    templateUrl:'./login-form.component.html',
    styleUrls: ['./login-form.component.css']

})

export class LoginFormComponent {
    
    constructor(
        protected fb: FormBuilder,
        protected service: LoginService,
        protected router:Router
    ){}

    //Carregar o Formulario
    formGroup = this.fb.group({
        nome:[null],
        squad:[null],
        participante:[null],
    })

    //Action Login
    actionLogin(){

        this.formGroup.value.squad = (this.formGroup.value.squad).toUpperCase();
        const usr:User = Object.assign( new User(), this.formGroup.value);
        
        if (this.validForm()){
            if(this.formGroup.value.participante != "espectador"){
                this.service.create(usr)
                .then(()=>{
                    this.service.locStorage(usr);  
                    this.formSucess();
                   },
                   (err:any)=>this.formErro(err)
                )
            }else{
                this.service.locStorage(usr);  
                this.formSucess();    
            }
        }
    }

    formSucess(){
        this.router.navigate(['/home'])
    }

    formErro(err:any){
        console.log('Erro na requisição do Serviço pagina Login', err);
    }

    validForm(): boolean{
        let formOk = true;

        if(!this.formGroup.value.squad){
            document.querySelector("#squad")?.setAttribute("style","border: 2px solid red");
            formOk=false;
        }

        if(!this.formGroup.value.participante){
            document.querySelector("#participante")?.setAttribute("style","border: 2px solid red");
            formOk=false;
        }

        return formOk;
    }
  
}