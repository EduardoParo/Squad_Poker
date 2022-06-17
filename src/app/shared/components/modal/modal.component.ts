import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { HomeService } from 'src/app/shared/services/home.service';
import { ModalService } from './modal.service';


@Component({ 
    selector: 'app-modal', 
    templateUrl: 'modal.component.html', 
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    funcActionModal:any;
    tituloModal ='';
    bodyModal   =''
    acaoModal:any;

    private element: any;

    constructor(
        private modalService: ModalService,
        private homeService:HomeService,
        private el: ElementRef
        ) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // Adicione (esta instância modal) ao serviço modal para que seja acessível pelos controladores
        this.modalService.addComponent(this);

        //Mova o elemento para a parte inferior da página (logo antes de </body>) para que possa ser exibido acima de tudo
        document.body.appendChild(this.element);

        //Fechar modal ao clicar em segundo plano
        this.element.addEventListener('click', (el:any) => {
            if (el.target.className === 'modal fade show') {
                this.close();
            }
        });
    }

    //Remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.element.remove();
    }

     /*---------------------------------------------
    | Abre o Component Modal                       |
    ----------------------------------------------*/
    openModal(): void{
        this.element.style.display = 'block';
        const modal = document.querySelector('#modalComponent');
        modal?.setAttribute('style','display:block');
        modal?.classList.add('modal', 'fade', 'show');
    }

    /*---------------------------------------------
    |Fechar o Component Modal                     |
    ----------------------------------------------*/
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('modal', 'fade', 'show');
       // console.log('CLOSE COMPONENT',this.element);
    }

    /*---------------------------------------------
    | Define a ação do Component Modal            |
    ----------------------------------------------*/
    defineActionModal(opc = 0, params:any ): void {
        
        const modal = document.querySelector('#funcActionModal');
        this.funcActionModal = null;

        //console.log('defineActionModal', opc);
        modal?.setAttribute('style','display:block');

        if (opc == 1){
            this.tituloModal='Revelar Pontos';
            this.bodyModal ='Tem certeza que deseja revelar os Pontos ?'
            this.funcActionModal = () => this.homeService.revealPoints(params);
    

        }else if (opc == 2){
            this.tituloModal='Reiniciar Pontos';
            this.bodyModal ='Tem certeza que deseja reiniciar os Pontos ?'
            this.funcActionModal = () => this.homeService.resetPoints(params);
          
        }else if (opc == 3){
            const audio = new Audio();
            audio.src = '../../../../assets/Aplausos.mp3';
            audio.load();
            audio.play();
            this.tituloModal=`${params.winnerPoint} Ganhou !!! `;
            this.bodyModal =` ${params.qtdOfParticipants} Participantes Pontuaram ${params.winnerPoint}`;
            
            const modal = document.querySelector('#funcActionModal');
            modal?.setAttribute('style','display:none');

        }else if (opc == 4){
            this.tituloModal=" Empate !!! ";
            this.bodyModal =`${params[0][0].qtdOfParticipants} Participantes Pontuaram ${params[0][0].winnerPoint}; e ${params[0][1].qtdOfParticipants} Participantes Ponturam ${params[0][1].winnerPoint}; `;  
            modal?.setAttribute('style','display:none');
            
        }else if (opc == 5){
            this.tituloModal='Desconectar Participante';
            this.bodyModal =`Tem certeza que deseja desconectar o Participante ${params.nome} ?`;
            this.funcActionModal = () =>this.homeService.delete(params);  
        }

        this.openModal(); 

    }

}