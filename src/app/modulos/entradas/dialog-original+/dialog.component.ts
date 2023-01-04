import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provedores } from 'src/app/modelos/provedores.model';
import { EntradasService } from 'src/app/servicios/entradas.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProvedoresService } from 'src/app/servicios/provedores.service';
import {MatDialogRef} from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  isReady:boolean = false;
  provedores:any[]=[];
  productos:any[]=[];
  facturas:any[]=[];
  prueba:any;

  productosFactura=true;
  botonAgregar=false;

  factura:'';

  filteredOption:Observable<any[]>;
  filteredOptions: Observable<any[]>[] = [];
  myForm: FormGroup;
  
  respuesta:any;


  constructor(private fb:FormBuilder, private provedorService:ProvedoresService,
  private productoService:ProductosService, private entradaService:EntradasService,
  private _snackBar: MatSnackBar, private dialogRef:MatDialogRef<DialogComponent>) {

    this.createForm();;

   }

   createForm() {
    this.myForm = this.fb.group({
      noFactura: ['', [Validators.required]],
      fechaLlegada: ['', [Validators.required]],
      provedores:['', [Validators.required]],
      items: this.initItems(),
      observaciones:['']

    });
    this.ManageNameControl(0);
    this.isReady = true;
 

  }

  initItems() {

    var formArray = new FormArray([]);
    
        formArray.push(this.fb.group({
        product: ['', [Validators.required]],
        lote:['',Validators.required],
        fechaFabricacion:['',Validators.required],
        fechaVence:['',Validators.required],
        cantidad:[0,Validators.required],
        cantBultos:[0,Validators.required],
      }));
    
    return formArray;
  }

  ManageNameControl(index: number) {
    var arrayControl = this.myForm.get('items') as FormArray;
    this.filteredOptions[index] = arrayControl.at(index).get('product').valueChanges
      .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.referencia),
      map(name => name ? this._filter(name) : this.productos.slice())
      );

  }

  addNewItem() {
    const controls = <FormArray>this.myForm.controls['items'];
    let formGroup = this.fb.group({
      product: ['', [Validators.required]],
      lote:['',Validators.required],
      fechaFabricacion:['',Validators.required],
      fechaVence:['',Validators.required],
      cantidad:[0,Validators.required],
      cantBultos:[0,Validators.required],
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1);

    this.productosFactura=false;


  }

  removeItem(i: number) {
    const controls = <FormArray>this.myForm.controls['items'];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);

  }

  ngOnInit() {
    this.getProvedores();
    this.getProductos();
    this.getFacturas();

    this.filteredOption=this.myForm.controls['noFactura'].valueChanges.pipe(
      map((term)=>{
        return this.facturas.filter((option)=>option.noFactura.includes(term));
      })
    )

  }

  getProvedores(){
    this.provedorService.getProvedores().subscribe(res=>{

      this.provedores=res;
     

    });
  }

  getProductos(){
    this.productoService.getProductosMistral().subscribe(res=>{

      this.productos=res;
     

    });
  }

  getFacturas(){
    this.entradaService.getPendienteArribo().subscribe(res=>{

      this.facturas=res;

      
     

    });
  }

  displayFn(user?: any): any | undefined {
    return user ? user.descripcion : undefined;
  }

  private _filter(referencia: any): any[] {
    const filterValue = referencia;
    return this.productos.filter(option => option.referencia.indexOf(filterValue) === 0);
  }


  enviarEntrada(){

console.log(this.myForm.value);

      if (this.myForm.invalid){
        return;
      }

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

cod:any[]=[];
  facturaPendiente(){


  
    let factura={noFactura:this.factura};

    this.entradaService.getAgregarPendienteArribo(factura).subscribe(res=>{


      this.prueba=res;
  

      this.prueba.forEach((data:any)=>{

     

        this.cod.push({"referencia":data.REFERENCIA, "cantidad":data.CANTIDAD })

      });

      
      console.log(this.cod);

      if(this.cod.length>0){
        for(let i =0; i<this.cod.length;i++){

          const controls = <FormArray>this.myForm.controls['items'];
        let formGroup = this.fb.group({
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
