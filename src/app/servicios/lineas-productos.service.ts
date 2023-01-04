import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LineaProducto } from '../modelos/linea-producto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineasProductosService {

  constructor(private http:HttpClient) { }

  //obtener productos

getProductos():Observable<LineaProducto[]>{

  return this.http.get<LineaProducto[]>(environment.apiUrl+'/api/lineas');

}

getProductosPorLinea(productosLinea:any){

  return this.http.post(environment.apiUrl+'/api/lineas/productos',productosLinea);

 }

 actualicarPlan(productos:any){

  return this.http.post(environment.apiUrl+'/api/lineas/actualizarPlan',productos);

 }


}
