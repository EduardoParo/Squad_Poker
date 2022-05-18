import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class ModalService {

    private componentModal: any;

    /*---------------------------------------------
    | Adicionar component em um array
    ----------------------------------------------*/
    addComponent(modal: any) {
        this.componentModal= modal;
    }

    /*---------------------------------------------
    | Adicionar component em um array
    ----------------------------------------------*/
    buildModal( opc:number, params:any=[]) :void{
        //console.log('SHOWMODAL SEVICE',modal);
        this.componentModal.defineActionModal(opc, params);
    }

    /*---------------------------------------------
    | Serviço para Fechar modal
    ----------------------------------------------*/
    closeModal() :void {
        this.componentModal.close();
    }
}