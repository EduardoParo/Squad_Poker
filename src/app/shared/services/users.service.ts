import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn :'root'})

export class UserService{

  constructor(){
  }

  getUserOnline(): User{
    return {
      id              : localStorage.getItem('id')   || ''        ,
      nome            : localStorage.getItem('nome') || ''         ,
      squad           : localStorage.getItem('squad') || ''        ,
      participante    : localStorage.getItem('participante') || ''  ,
      voto            : Number(localStorage.getItem('voto')) || 0
    };
  }
}