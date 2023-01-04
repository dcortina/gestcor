import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Entradas } from '../modelos/entradas';
import { Observable } from 'rxjs';
import { relativeTimeThreshold } from 'moment';
import { environment } from 'src/environments/environment';
import { Producto } from '../modelos/producto';



@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  entradas:any

  constructor(private http:HttpClient) { }

  getEntradas():Observable<Entradas[]>{

    return this.http.get<Entradas[]>(environment.apiUrl+'/api/entradas');

  }

  getPendienteArribo():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/entradas/pendientes');

  }

  getAgregarPendienteArribo(noFactura:any){

    return this.http.post(environment.apiUrl+'/api/entradas/agrega/pendientes',noFactura);

  }

  buscarProducto(producto:any){



    return this.http.post(environment.apiUrl+'/api/entradas/productos',producto);

   }


  //guardar productos
  guardarProducto(entradas:any){

    return this.http.post(environment.apiUrl+'/api/entradas',entradas);

   }


   updateEntrada(data:any, id:number){

    return this.http.put<any>(environment.apiUrl+'/api/entradas/'+id, data);

   }

   deleteEntrada(id:number){
    return this.http.delete<any>(environment.apiUrl+'/api/entradas/'+id);
   }

}
