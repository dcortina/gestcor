import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/modelos/producto';
import { Provedores } from 'src/app/modelos/provedores.model';
import { EntradasService } from 'src/app/servicios/entradas.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProvedoresService } from 'src/app/servicios/provedores.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import dayjs from 'dayjs';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

  })
export class DialogComponent implements OnInit {

    provedores:any[]=[];
    productosMistral:any[]=[];
    facturas:any[]=[];

    productosFactura=true;
    botonAgregar=false;

    factura='';

    filteredOption:Observable<any[]>;
    filteredOptions: Observable<any[]>[] = [];

    productosMedicos:any;
    respuesta:any;

    facPendiente:any[]=[];

    myForm = this.formbuilder.group({
    noFactura: new FormControl(''),
    fechaLlegada: new FormControl(),
    provedores: new FormControl(''),
    items:this.formbuilder.array([]),
    observaciones: new FormControl(''),


  });

  get productos(){

    return this.myForm.get('items') as FormArray;

  }

  constructor(private formbuilder:FormBuilder, private provedorService:ProvedoresService,
  private productoService:ProductosService, private entradaService:EntradasService,
  private _snackBar: MatSnackBar, private dialogRef:MatDialogRef<DialogComponent>) {



  }

  ManageNameControl(index: number) {
    var arrayControl = this.myForm.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('product').valueChanges
      .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.referencia),
      map(name => name ? this._filter(name) : this.productosMistral.slice())
      );

  }

  ngOnInit(): void {

    this.getProvedores();
    this.getProductos();
    this.getFacturas();

    this.filteredOption=this.myForm.controls['noFactura'].valueChanges.pipe(
      map((term)=>{
        return this.facturas.filter((option)=>option.noFactura.includes(term));
      })
    )


  }

 get f(){
    return this.myForm.controls;
  }



  getProvedores(){
    this.provedorService.getProvedores().subscribe(res=>{

      this.provedores=res;



    });
  }

  getProductos(){
    this.productoService.getProductosMistral().subscribe(res=>{
      this.productosMistral=res
    })
  }

  getFacturas(){
    this.entradaService.getPendienteArribo().subscribe(res=>{

      this.facturas=res;




    });
  }

  agregarProducto(){


const controls = <FormArray>this.myForm.controls['items'];
    let formGroup = this.formbuilder.group({
      product: [''],
      lote:[''],
      fechaFabricacion:[''],
      fechaVence:[''],
      cantidad:[0],
      cantBultos:[0],
    });

    this.productos.push(formGroup);

    this.ManageNameControl(0);

   this.ManageNameControl(controls.length - 1);

    this.productosFactura=false;

  }

  removerProducto(indice:number){

    this.productos.removeAt(indice);

  }

  enviarEntrada(){


      if (this.myForm.invalid){
        return;
      }

      console.log(this.myForm.value);

      this.entradaService.guardarProducto(this.myForm.value).subscribe(res=>{

        this.respuesta=res;

        if(this.respuesta.status===1){
          //muestra un mensaje diciendo que se agrego la entrada ya que la api envia un response que puede ser 1 o 0
          this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
            duration:2000,

          });
          //resetea el formulario
          this.myForm.reset();
          //cierra el dialog(modal)
          this.dialogRef.close('save');

        }else {

          this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
            duration:2000,

          });

        }

      });


  }


  displayFn(user?: any): any | undefined {
    return user ? user.descripcion : undefined;
  }

  private _filter(referencia: any): any[] {
    const filterValue = referencia;
    return this.productosMistral.filter(option => option.referencia.indexOf(filterValue) === 0);
  }

  cod:any[]=[];

  facturaPendiente(value:any){

    let factura={noFactura:value};



    this.entradaService.getAgregarPendienteArribo(factura).subscribe(res=>{



      this.facPendiente=Object.values(res);


      this.facPendiente.forEach((data:any)=>{

        this.cod.push({referencia:data.REFERENCIA, cantidad:data.CANTIDAD })

      });



      if(this.cod.length>0){
        for(let i =0; i<this.cod.length;i++){
        const controls = <FormArray>this.myForm.controls['items'];
        let formGroup = this.formbuilder.group({
      product: [this.cod[i].referencia, [Validators.required]],
      lote:['',Validators.required],
      fechaFabricacion:['',Validators.required],
      fechaVence:['',Validators.required],
      cantidad:[this.cod[i].cantidad,Validators.required],
      cantBultos:[0,Validators.required],
    });

  controls.push(formGroup);

        }

     }

      this.productosFactura=false;
      this.botonAgregar=true;



    })



  }




}
