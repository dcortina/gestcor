import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatosComprobados } from '../modelos/datos-comprobados';
@Injectable({
  providedIn: 'root'
})
export class ComprobarProductoService {

  constructor(private http:HttpClient) { }

  guardarDatos(data:any){

    return this.http.post(environment.apiUrl+'/api/stock/comprobarProductos',data);

  }

  getPrecioPublico():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/stock/precioPublico');


  }

  getRecargo():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/stock/recargo');


  }

  getConformado():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/stock/conformado');


  }

  getDonativos():Observable<any[]>{

    return this.http.get<any[]>(environment.apiUrl+'/api/stock/donativo');


  }

}
