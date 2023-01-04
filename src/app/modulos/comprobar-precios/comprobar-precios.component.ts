import { DataSource } from '@angular/cdk/collections';
import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { DatosComprobados } from 'src/app/modelos/datos-comprobados';
import { ComprobarProductoService } from 'src/app/servicios/comprobar-producto.service';
import { ExporterService } from 'src/app/servicios/exporter.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-comprobar-precios',
  templateUrl: './comprobar-precios.component.html',
  styleUrls: ['./comprobar-precios.component.css']
})
export class ComprobarPreciosComponent implements OnInit {

  convertirJson:any=[];
  datosConsultados:DatosComprobados[]=[];
  value = 0;
  dataSource = new MatTableDataSource<DatosComprobados>(this.datosConsultados);
  oculto=true;
  precioPublico:any[]=[];
  respuesta:any;
  displayedColumns: string[] = ['referencia', 'descripcion', 'mistral','gespre'];


 
  @ViewChild('productoPaginator') paginator: MatPaginator;

  constructor(private _snackBar: MatSnackBar, private comprobarProductosService:ComprobarProductoService, private exportService:ExporterService) { }

  ngOnInit(): void {

  }

  fileUpload(event:any){

    const archivoSeleccionado = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(archivoSeleccionado);
    fileReader.onload = (event) =>{
      let binaryData = event.target.result;
      let worBook = XLSX.read(binaryData, {type: 'binary'});
      worBook.SheetNames.forEach(sheet=>{
        const data = XLSX.utils.sheet_to_json(worBook.Sheets[sheet]);
        this.convertirJson = data;
            toString
        if(Object.values(data)){
         this.value=100;
          this._snackBar.open('Datos Cargados Correctamente','ok',{
            duration:2000,
            horizontalPosition: 'center',
          });
        }
      })
    }
    this.oculto=false;
  }

  addData() {
        this.convertirJson.forEach((data:any)=>{
        this.precioPublico.push({'referencia':data.Código.toString(), 'precioPublico':data.PPOB, 'recargo':data.Margen,
                                'conformado':data.Conformado, 'donativo':data.Donativo});
   });

    this.comprobarProductosService.guardarDatos(this.precioPublico).subscribe(res=>{
    this.respuesta=res;
    this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
        duration:2000,
      });
  });

  this.precioPublico=[];
  this.oculto=true;
  }

  clearTable() {
    this.dataSource.data = [];
    
  }

  getPrecioPublico(){

    this.comprobarProductosService.getPrecioPublico().subscribe(res=>{

      this.dataSource.data =res; 
      this.dataSource.paginator = this.paginator;



      console.log(res);

    });

  

  }

  getRecargo(){

    this.comprobarProductosService.getRecargo().subscribe(res=>{

      this.dataSource.data =res;

 

      console.log(res);

    });

  }

  getConformado(){

    this.comprobarProductosService.getConformado().subscribe(res=>{

      this.dataSource.data =res;



      console.log(res);

    });

  }

  getDonativo(){

    this.comprobarProductosService.getDonativos().subscribe(res=>{

     let answer:any=res;
     console.log(answer);
     
     if(answer[0].status===1){

      this._snackBar.open(JSON.stringify(answer[0].message), JSON.stringify(answer[0].code),{
        duration:2000,
       
      });

     }else{

         this.dataSource.data =res;

     }





     

    });

  }

  exportarExcel():void{

    this.exportService.exportExcel(this.dataSource.data,'Consulta de Productos con Gespre');

  }


}


@Component({
  selector: 'comprobar-table',
  templateUrl: 'comprobar-table.html',
  styles: [
    `
    table {
      width: 100%;
    }
  `,
  ],
})
export class ComprobarTable<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, {static: true}) table: MatTable<T>;

  @Input() columns: string[];

  @Input() dataSource: DataSource<T>;

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }


}



