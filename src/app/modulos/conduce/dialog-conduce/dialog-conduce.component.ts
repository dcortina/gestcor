import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConduceService } from 'src/app/servicios/conduce.service';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { Cliente } from 'src/app/modelos/cliente';
import { map, Observable,startWith } from 'rxjs';
import { Chofer } from 'src/app/modelos/chofer';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProductoMistral } from 'src/app/modelos/producto-mistral';
import jwtDecode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dialog-conduce',
  templateUrl: './dialog-conduce.component.html',
  styleUrls: ['./dialog-conduce.component.css'],

})
export class DialogConduceComponent implements OnInit {

  today= new Date(Date.now());
  pipe = new DatePipe('es');


  conduceForm = this.formbuilder.group({

    consecutivo: new FormControl(this.pipe.transform(this.today,'yyyy') +'-'+this.contadorConduce,[Validators.required]),
    fecha: new FormControl(this.today),
    destino: new FormControl('',[Validators.required]),
    codeEntidad: new FormControl(''),
    direccion: new FormControl(''),
    usuario_id: new FormControl('',[Validators.required]),
    usuario: new FormControl('',[Validators.required]),
    carnet: new FormControl('',[Validators.required]),
    cargo: new FormControl('',[Validators.required]),
    motivoConduce: new FormControl('',[Validators.required]),
    items:this.formbuilder.array([]),
    chofer:new FormControl('',[Validators.required]),
    carnetChofer: new FormControl(''),
    lugarEntrega: new FormControl('',[Validators.required]),
    recibe: new FormControl('',[Validators.required]),
    recibeCarnet: new FormControl('',[Validators.required]),
    recibeCargo: new FormControl('',[Validators.required]),
    fechaRecibido: new FormControl('',[Validators.required]),



  });


  get productos(){

    return this.conduceForm.get('items') as FormArray;

  }


  motivoConduce:any[]=['Urgencia', 'Sin Entrada', 'Llega Con acta de Entrega', 'Llega con Conduce', 'No se Puede Facturar'];

  clientes:Cliente[]=[];
  clientesFiltro:Observable<Cliente[]>;

  chofer:Chofer[]=[];
  choferFiltro:Observable<Chofer[]>;

  productosMistral:ProductoMistral[]=[];

  filteredOptions: Observable<any[]>[] = [];


  token: string;
  userdata: any;

  user: any;
  id:any;
  carnet:any;
  cargo:any;

  selected='';
  selectedChofer='';
  selectedProducto='Productos';
  respuesta:any;
  actionBoton:string="Enviar";

  constructor(private formbuilder:FormBuilder,private conduceService:ConduceService,private productosServicios:ProductosService,
              private _snackBar: MatSnackBar,
              private dialogRef:MatDialogRef<DialogConduceComponent>,@Inject(MAT_DIALOG_DATA) public editData: any
              ,@Inject(MAT_DIALOG_DATA) public contadorConduce: any  ) { }


  ManageNameControl(index: number) {
    var arrayControl = this.conduceForm.get('items') as FormArray;

    this.filteredOptions[index] = arrayControl.at(index).get('referencia').valueChanges
      .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.referencia),
      map(name => name ? this._filterReferencia(name) : this.productosMistral.slice())
      );

  }

  ngOnInit(): void {

    this.token=localStorage.getItem('token');
    this.userdata=jwtDecode(this.token);
    this.user=this.userdata.name;
    this.id=this.userdata.user_id;
    this.carnet=this.userdata.carnet;
    this.cargo=this.userdata.cargo;

    console.log(this.userdata);

    this.getClientesMistral();
    this.getChoferMistral();
    this.getProductosMistral();


this.clientesFiltro=this.conduceForm.controls['destino'].valueChanges.pipe(
  startWith(''),
  map(value => this._filterDestino(value || '')),
);

this.choferFiltro=this.conduceForm.controls['chofer'].valueChanges.pipe(
  startWith(''),
  map(value => this._filterChofer(value || '')),
);




/*
    this.filteredOption=this.conduceForm.controls['referencia'].valueChanges.pipe(
      map((term)=>{
        return this.productosMistral.filter((option)=>option.referencia.includes(term));
      })
    );
*/
    this.conduceForm.controls['usuario_id'].setValue(this.id);
    this.conduceForm.controls['usuario'].setValue(this.user);
    this.conduceForm.controls['carnet'].setValue(this.carnet);
    this.conduceForm.controls['cargo'].setValue(this.cargo);

    this.asignarClientesMistral();


  }

  getClientesMistral(){

    this.conduceService.getClientesMistral().subscribe(res=>{

      this.clientes=res;

    })

  }

  getChoferMistral(){

    this.conduceService.getChoferMistral().subscribe(res=>{

      this.chofer=res;

    })

  }

  getProductosMistral(){
    this.productosServicios.getProductosMistral().subscribe(res=>{

      this.productosMistral=res;

    })
  }

  asignarClientesMistral(){

    for (let i=0;i<this.clientes.length;i++){
      if(this.selected==this.clientes[i].descripcion){
        this.conduceForm.controls['codeEntidad'].setValue(this.clientes[i].codeEntidad);
        this.conduceForm.controls['direccion'].setValue(this.clientes[i].direccion);
      }
    }

  }

  asignarChoferMistral(){

    for (let i=0;i<this.chofer.length;i++){
      if(this.selectedChofer==this.chofer[i].nombre){
        this.conduceForm.controls['carnetChofer'].setValue(this.chofer[i].carnet);

      }
    }

  }

  asignarProductoMistral(value:string, y:number){


    for (let i=0;i<this.productosMistral.length;i++){

      if(value==this.productosMistral[i].referencia){


        console.log(y);
        console.log(this.productosMistral[i].pcpm);
        console.log(this.productosMistral[i].conformado);
        const precio =parseFloat(this.productosMistral[i].pcpm)  * parseFloat(this.productosMistral[i].conformado)  + parseFloat(this.productosMistral[i].pcpm);
        (this.conduceForm.get('items') as FormArray).at(y).get('descripcion').setValue(this.productosMistral[i].descripcion);
        (this.conduceForm.get('items') as FormArray).at(y).get('precio').setValue(precio);

      }



    }

  }

  calcularImporte(value:number){



   let cantidad= (this.conduceForm.get('items') as FormArray).at(value).get('cantidad').value;

   let precio = (this.conduceForm.get('items') as FormArray).at(value).get('precio').value;

   let importe = (cantidad * precio);

       (this.conduceForm.get('items') as FormArray).at(value).get('importe').setValue(importe);



  }

  agregarProducto(){

    const controls = <FormArray>this.conduceForm.controls['items'];
    let formGroup = this.formbuilder.group({
      referencia: [''],
      descripcion:[''],
      unidadMedida:[''],
      cantidad:[0],
      precio:[''],
      importe:[0],
    });

    this.productos.push(formGroup);

    this.ManageNameControl(0);

   this.ManageNameControl(controls.length - 1);



  }

  removerProducto(indice:number){

    this.productos.removeAt(indice);

  }



private _filterChofer(value: string): Chofer[] {
    const filterValue = value.toLowerCase();

    return this.chofer.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterDestino(value: string): Cliente[] {
    const filterValue = value.toLowerCase();

    return this.clientes.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  private _filterReferencia(referencia: any): any[] {
    const filterValue = referencia;
    return this.productosMistral.filter(option => option.referencia.indexOf(filterValue) === 0);
  }

  addConduce(){


    if (this.conduceForm.invalid){
      return;
    }

    console.log(this.conduceForm.value);

    this.conduceService.guardarConduce(this.conduceForm.value).subscribe(res=>{

      this.respuesta=res;

      if(this.respuesta.status===1){
        //muestra un mensaje diciendo que se agrego la entrada ya que la api envia un response que puede ser 1 o 0
        this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
          duration:2000,

        });
        //resetea el formulario
        this.conduceForm.reset();
        //cierra el dialog(modal)
        this.dialogRef.close('save');

      }else {

        this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
          duration:2000,

        });

      }

    });


}

}
