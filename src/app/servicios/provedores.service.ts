import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProvedorMistral } from '../modelos/provedor-mistral';
import { Provedores } from '../modelos/provedores.model';

@Injectable({
  providedIn: 'root'
})
export class ProvedoresService {



  provedores:Provedores[]=[

  ];

  provedoresMistral:ProvedorMistral[]=[];


  constructor(private http:HttpClient) { }


  getProvedores():Observable<Provedores[]>{

    return this.http.get<Provedores[]>(environment.apiUrl+'/api/provedores');

  }

  getProvedoresMistral():Observable<ProvedorMistral[]>{

    return this.http.get<ProvedorMistral[]>(environment.apiUrl+'/api/provedores/mistral');

  }

  agregarProvedor(provedores:Provedores){

  this.provedores.push(provedores);

  }

  guardarProvedores(provedores:any){

    return this.http.post(environment.apiUrl+'/api/provedores',provedores);

  }

  updateProvedor(data:any, id:number){

    return this.http.put<any>(environment.apiUrl+'/api/provedores/'+id, data);

   }



}
