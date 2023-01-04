import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Entradas } from '../../modelos/entradas';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EntradasService } from '../../servicios/entradas.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EditFacturaDdialogComponent } from './edit-factura-ddialog/edit-factura-ddialog.component';
import { ExporterService } from 'src/app/servicios/exporter.service';
@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EntradasComponent implements OnInit {

  entradas:MatTableDataSource<Entradas>;
/*
  displayedColumns: string[] = ['fechaLlegada',
                                'noFactura', 'nombre', 'referencia',
                                'descripcion', 'cantidad', 'cantBultos',
                                'fechaVence',  'observaciones'];


*/
productos:any;
columnsToDisplay = ['noFactura', 'fechaLlegada', 'nombre'];

columnsToDisplayWithExpand = [...this.columnsToDisplay,'expand'];
expandedElement: Entradas | null;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog, private entradaService:EntradasService, private exportService:ExporterService) {

  }


  ngOnInit(): void {

    this.getEntradas();


  }

  openDialog(){
       this.dialog.open(DialogComponent,{
          width:'50%'
       }).afterClosed().subscribe(val=>{

        if(val==='save'){
          this.getEntradas();
        }

       })
  }

  getEntradas(){

    this.entradaService.getEntradas().subscribe(res=>{
      this.entradas=new MatTableDataSource(res);
      this.entradas.paginator=this.paginator;
      this.entradas.sort=this.sort;

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entradas.filter = filterValue.trim().toLowerCase();

    if (this.entradas.paginator) {
      this.entradas.paginator.firstPage();
    }
  }

  obtenerProductos(valor:any){
    let id_entrada={entrada_id:valor};

    this.entradaService.buscarProducto(id_entrada).subscribe(res=>{
   
      this.productos=res;


    })
  }

  editarEntrada(datos:any){
    this.dialog.open(EditFacturaDdialogComponent, {
      width:'50%',
      data:datos

    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getEntradas();
      }
    })
  }

  getProductosExcel():void{

    this.exportService.exportExcel(this.entradas.data,'Entradas en el Sistema');


}


  }








