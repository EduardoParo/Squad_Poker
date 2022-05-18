import { BaseResourceModel } from "./base-rosource.model";

export class User extends BaseResourceModel{

    constructor(
        public override id:string = '',
        public nome:string = '',
        public squad:string = '',
        public participante:string = '',
        public voto:number=0,
        public showVenc:boolean = false,

    ){
        super();
    }

    static getUserOnline():User{
        return Object.assign(new User,{
          id              : localStorage.getItem('id')            ,
          nome            : localStorage.getItem('nome')          ,
          squad           : localStorage.getItem('squad')         ,
          participante    : localStorage.getItem('participante')  ,
          voto            : Number(localStorage.getItem('voto'))
        });
      }
}
