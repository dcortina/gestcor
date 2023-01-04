/*export class Provedores{

  id:number=0;
  codeAux:string="";
  nombre:string="";
  direccion:string="";
  provincia:string="";
  municipio:string="";
  email:string="";
  telefono:string="";
  observaciones:string="";

  constructor(id:any,codeAux:string,nombre:string,direccion:any,provincia:any,municipio:any,email:any,telefono:any,observaciones:string){


    this.id=id;
    this.codeAux=codeAux;
    this.nombre=nombre;
    this.provincia=provincia;
    this.municipio=municipio;
    this.email=email;
    this.telefono=telefono;
    this.observaciones=observaciones

  }



}
*/

export interface Provedores{

  id:number;
  codeAux:string;
  nombre:string;
  direccion:string;
  provincia:string;
  municipio:string;
  email:string;
  telefono:string;
  observaciones:string;

}
