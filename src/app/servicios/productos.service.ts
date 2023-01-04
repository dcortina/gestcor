import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Producto } from '../modelos/producto';
import { ProductoMistral } from '../modelos/producto-mistral';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

productos:ProductoMistral[]=[];

  constructor(private http:HttpClient) { }


//obtener productos

getProductos():Observable<Producto[]>{

  return this.http.get<Producto[]>(environment.apiUrl+'/api/productos');

}

  getProductosMistral():Observable<any>{

    return this.http.get<any>(environment.apiUrl+'/api/productos/mistral');

  }

  getProductosExcel(){

    return this.http.get(environment.apiUrl+'/api/productos/exportar',
    {observe:'response', responseType:'blob'});
  
  }


//guardar productos
  guardarProducto(productos:any){

   return this.http.post(environment.apiUrl+'/api/productos',productos);

  }

  updateProducto(data:any, id:number){

    return this.http.put<any>(environment.apiUrl+'/api/productos/'+id, data);

   }






}
