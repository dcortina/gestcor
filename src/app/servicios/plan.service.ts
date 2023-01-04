import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Plan } from '../modelos/plan';
import { environment } from 'src/environments/environment';
import { Consumos } from '../modelos/consumos';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http:HttpClient) { }

  getUnidadesConsumo():Observable<Plan[]>{

    return this.http.get<Plan[]>(environment.apiUrl+'/api/consumos');

  }



  getConsumos(consumoUnidad:any){

    return this.http.post(environment.apiUrl+'/api/consumos/unidad',consumoUnidad);

   }

   getConsumosPorCodigo():Observable<any[]>{
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/codigo');
   }

   getProductoMasVendido(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/masVendido');
   }

   getProductoConMayorImporte(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/mayorImporte');
   }

   getUnidadMasActiva(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/unidadMasActiva');
   }

   getUnidadMasCompra(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/unidadMasCompra');
   }



}
