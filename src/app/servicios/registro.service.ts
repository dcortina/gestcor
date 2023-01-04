import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import {Registro} from '../modelos/registro.model';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {



  constructor(private http:HttpClient) { }

 usuerRegistrado(data:any){
    return this.http.post(environment.apiUrl+'/api/registro',data);
  }

  login(data:any){

    return this.http.post(environment.apiUrl+'/api/login',data);

  }

  getUsuriosRegistrados():Observable<Registro[]>{

    return this.http.get<Registro[]>(environment.apiUrl+'/api/usuarios');


  }

  updateUsuario(data:any, id:number){

    return this.http.put<any>(environment.apiUrl+'/api/usuarios/'+id, data);

   }

   deleteUsuario(id:number){

    return this.http.delete<any>(environment.apiUrl+'/api/usuarios/'+id);

   }



}
