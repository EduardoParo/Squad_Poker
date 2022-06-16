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
    user:User = {}

    constructor(
        protected fb: FormBuilder,
        protected loginService: LoginService,
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
        if (this.validForm()){
            this.setUserOnline();
            if(this.user.participante != "espectador"){
                this.loginService.createUser(this.user)
                .then(()=>{
                    this.loginService.setLocalStorage(this.user);  
                    this.formSucess();
                   },
                   (err:any)=>this.formErro(err)
                )
            }else{
                this.loginService.setLocalStorage(this.user);  
                this.formSucess();    
            }
        }
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

    setUserOnline(): void{
        this.user.nome = this.formGroup.value.nome;
        this.user.squad = this.formGroup.value.squad;
        this.user.voto = 0;
        this.user.participante = this.formGroup.value.participante;
    }
    
    formSucess(){
        this.router.navigate(['/home'])
    }

    formErro(err:any){
        console.log('Erro na requisição do Serviço pagina Login', err);
    }
  
}