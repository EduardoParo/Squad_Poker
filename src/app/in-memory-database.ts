import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './shared/models/user.model';

export class InMemoryDb implements InMemoryDbService{
    createDb(){
        const users : User[] =[
            {id : '1', nome : 'Admin', squad:'ADMIN', participante:'Participanete', voto: 0, mostrar:false, showVenc:false }
        ]
        
        return { users }
    }
  }