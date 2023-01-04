import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cliente } from '../modelos/cliente';
import { Chofer } from '../modelos/chofer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConduceService {

  constructor( private http:HttpClient) { }

  getClientesMistral():Observable<Cliente[]>{

    return this.http.get<Cliente[]>(environment.apiUrl+'/api/clientes');

  }

  getChoferMistral():Observable<Chofer[]>{

    return this.http.get<Chofer[]>(environment.apiUrl+'/api/chofer');

  }

    //guardar productos
    guardarConduce(conduce:any){

      return this.http.post(environment.apiUrl+'/api/conduce',conduce);

     }

     getConduce():Observable<any[]>{

      return this.http.get<any[]>(environment.apiUrl+'/api/conduce');

    }

    getProductosConduce():Observable<any[]>{

      return this.http.get<any[]>(environment.apiUrl+'/api/conduce/productos/show');

    }


}
