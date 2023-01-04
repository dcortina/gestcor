import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanMedicamento } from '../modelos/plan-medicamento';

@Injectable({
  providedIn: 'root'
})
export class PlanMedicamentoService {

  constructor(private http:HttpClient) { }

  guardarProducto(plan:any){

    return this.http.post(environment.apiUrl+'/api/demanda/plan',plan);
 
   }

   getPlanMedicamentos():Observable<PlanMedicamento[]>{

    return this.http.get<PlanMedicamento[]>(environment.apiUrl+'/api/demanda/plan');
  
  }

}
