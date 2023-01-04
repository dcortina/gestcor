/*
export class Producto {


  id=0;
  referencia= "" ;
  descripcion= "";
  fechaVence= "";
  cantidad= 0;

  constructor(id:any,referencia:any, descripcion:any, fechaVence:any, cantidad:any ){

    this.id=id
    this.referencia=referencia;
    this.descripcion=descripcion;
    this.fechaVence=fechaVence;
    this.cantidad=cantidad;

  }



}
*/

export interface Producto {

  codigooriginal:string;
  referencia:string;
  descripcion:string;
  cantidad:string;
  pvp:string;
  codarea:Date;

}
