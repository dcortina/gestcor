export interface Entrada{
/*
  constructor(noFactura:string, fechaLlegada:any, fechaSalida:any, observaciones:string){
    this.noFactura=noFactura;
    this.fechaLlegada=fechaLlegada;
    this.fechasalida=fechaSalida;
    this.observaciones=observaciones;
  }

  noFactura:string="";
  fechaLlegada:any;
  fechasalida: any;
  observaciones:string="";
*/

id:number;
fechaLlegada:Date;
noFactura:string;
nombre:string;
referencia:string;
descripcion:string;
cantidad:number;
cantBultos:number;
fechaVence:Date;
fechaSalida:Date;
observaciones:string;



}
