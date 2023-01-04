export interface ProductoMistral {
    slice(): any;
    filter(arg0: (option: any) => boolean): ProductoMistral[];
    codigooriginal:string;
    referencia:string;
    descripcion:string;
    cantidad:number;
    pvp:number;
    codarea:string;
    pcpm:any;
    conformado:any;


}
