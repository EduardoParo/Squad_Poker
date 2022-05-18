import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map, Observable, Subscriber, Subscription, throwError } from "rxjs";
import { Injectable, Injector } from "@angular/core";

import { BaseResourceModel } from "../models/base-rosource.model"
import { ModalService } from "../components/modal/modal.service";

//tipo da classe é do tipo Model
export abstract class BaseResourceService<T extends BaseResourceModel>{

  protected angFireDb:AngularFireDatabase;
  protected modalService:ModalService

  constructor(
      protected API:string,
      protected injector:Injector,
      
  ){
      this.angFireDb = injector.get(AngularFireDatabase);
      this.modalService = injector.get(ModalService);
  }

  /*---------------------------------------------
  | Retornar um Observable do tipo T            |
  ----------------------------------------------*/
  getAll():Observable<any>{
      return this.angFireDb.list(this.API)
        .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map( c=> ({ ...(c.payload.val()) as T}))
            })
          )
    }

  /*---------------------------------------------
  | Atualizar Resource
  ----------------------------------------------*/
  update(resource:T):Promise<void>{
      return this.angFireDb.list(this.API).update(resource.id, resource);
  }
  
  /*---------------------------------------------
  | Capturar ID
  ----------------------------------------------*/
  delete(resource:T):Promise<void>{
    this.modalService.closeModal();
    return this.angFireDb.list(this.API).remove(resource.id);

}

  /*---------------------------------------------
  | Retornar O ERRO
  ----------------------------------------------*/
  handleErr(error:any):Observable<any>{
      console.log('ERRO NA REQUISIÇÃO ->', error)
     return throwError(error);
  }

}