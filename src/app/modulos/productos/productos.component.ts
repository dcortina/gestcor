import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../modelos/producto';
import { ProductoMistral } from '../../modelos/producto-mistral';
import { Provedores } from '../../modelos/provedores.model';
import { ProductosService } from '../../servicios/productos.service';
import { ProvedoresService } from '../../servicios/provedores.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs';
import { ExporterService } from 'src/app/servicios/exporter.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],

})



export class ProductosComponent implements OnInit {

  productos:MatTableDataSource<Producto>;
  respuesta:any;
  visionEnviar=false;
  visionAct=true;
  idProducto:number;
  provedores:Provedores[]=[];
  productosMistral:ProductoMistral[]=[];
  displayedColumns: string[] = ['fechaEntrada','referencia', 'descripcion', 'cantidad', 'editar'];
  productoForm = new FormGroup({
  provedores_id: new FormControl('', [Validators.required]),
  referencia: new FormControl('',[Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
  descripcion: new FormControl('',[Validators.required]),

   });

   filteredOption:Observable<ProductoMistral[]>;
   filteredOptiondescripcion:Observable<ProductoMistral[]>;

 //  @ViewChild(MatTable)table: MatTable<Producto>;
   @ViewChild('productoPaginator') paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  constructor( private productosServicios:ProductosService, private _snackBar: MatSnackBar, private provedoresService:ProvedoresService, private exportService:ExporterService) {

   }

  ngOnInit(): void {

   this.getProductos();
   this.getProvedores();
   this.getProductosMistral();

   /*
   this.filteredOption=this.productoForm.controls['referencia'].valueChanges.pipe(
    startWith(''),
    map(value=>this._filter(value)),
   )
   */
    this.filteredOption=this.productoForm.controls['referencia'].valueChanges.pipe(
      map((term)=>{
        return this.productosMistral.filter((option)=>option.referencia.includes(term));
      })
    )

    this.filteredOptiondescripcion=this.productoForm.controls['descripcion'].valueChanges.pipe(
      map((term)=>{
        return this.productosMistral.filter((option)=>option.descripcion.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
      })
    )


  }

  getProductos() {
//mostrando los medicamentos
  this.productosServicios.getProductos().subscribe(
    res =>{

            console.log(res);
            this.productos = new MatTableDataSource<Producto>(res);
            this.productos.paginator = this.paginator;
            this.productos.sort=this.sort;
          });
        }

        getProductosExcel():void{

            this.exportService.exportExcel(this.productos.data,'Productos en el Sistema');


        }

        applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.productos.filter = filterValue.trim().toLowerCase();

          if (this.productos.paginator) {
            this.productos.paginator.firstPage();
          }
        }

  getProvedores(){
    this.provedoresService.getProvedores().subscribe(res=>{
      this.provedores=res;
    })
  }

 get f(){

  return this.productoForm.controls;

}

getProductosMistral(){
  this.productosServicios.getProductosMistral().subscribe(res=>{

    this.productosMistral=res;
    console.log(this.productosMistral);

  })
}

 addProducto(){
  //añadiendo un nuevo producto
//let miProducto =(this.productoForm.value.referencia,this.productoForm.value.descripcion);

if(this.productoForm.invalid){
  return;
}

this.productosServicios.guardarProducto(this.productoForm.value).subscribe( res =>{

  this.respuesta=res;

  if(this.respuesta.status===1){

    this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
      duration:2000,
      //esto se usa para que salgan los datos enviados automaticamente en el mat-table


    });
    this.getProductos();
    this.productoForm.reset();

  }else {

    this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
      duration:2000,

    });

  }
});

 }
 editarProducto(valor:any){
  this.visionEnviar=true;
  this.visionAct=false;
  console.log(valor);

  if(valor){
    this.idProducto=valor.id;
    this.productoForm.controls['provedores_id'].setValue(valor.provedores_id.toString());
    this.productoForm.controls['referencia'].setValue(valor.referencia);
    this.productoForm.controls['descripcion'].setValue(valor.descripcion);
  }



 }

  updateProducto(){
    this.productosServicios.updateProducto(this.productoForm.value,this.idProducto).subscribe({
      next:(res)=>{alert("Entrada Actualizada");
      this.productoForm.reset();
      this.visionEnviar=false;
      this.visionAct=true;
      this.getProductos();
  }
    })
  }






}


