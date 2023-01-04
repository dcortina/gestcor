import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  constructor(private http:HttpClient) { }

  getImporteTotal(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/importeTotal');
   }

   getMasImporte(){
    return this.http.get<any[]>(environment.apiUrl+'/api/consumos/productosMasImporte');
   }


}
