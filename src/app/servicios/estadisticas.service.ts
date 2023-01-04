import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estadisticas } from '../modelos/estadisticas';
@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private http:HttpClient) { }


  getAcumuladoLinea():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/estadisticas/planLinea');

  }

  getUltimasEntradas():Observable<Estadisticas[]>{

    return this.http.get<Estadisticas[]>(environment.apiUrl+'/api/estadisticas/ultimasEntradas')

  }

  getSituacion():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/estadisticas/situacion')

  }

  getProductosMasVendidos(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/masVendidos');
   }

}
