import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Provedores } from '../../modelos/provedores.model';
import { ProvedoresService } from '../../servicios/provedores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../modelos/producto';
import { DataSource } from '@angular/cdk/collections';
import { Entradas } from '../../modelos/entradas';
import {Observable, ReplaySubject} from 'rxjs';
import { ProvedorMistral } from '../../modelos/provedor-mistral';
import { MatDialog } from '@angular/material/dialog';
import { DialogProvedoresComponent } from './dialog-provedores/dialog-provedores.component';
import { ExporterService } from 'src/app/servicios/exporter.service';


@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.component.html',
  styleUrls: ['./provedores.component.css']
})



export class ProvedoresComponent implements OnInit {

  displayedColumns: string[] = ['codeAux', 'nombre', 'direccion', 'provincia', 'municipio',
                              'email', 'telefono' ,'observaciones', 'editar'];

  provedores:MatTableDataSource<Provedores>;

  constructor(private provedorServicio:ProvedoresService, private dialog:MatDialog, private exportService:ExporterService) {



      }

   //  @ViewChild(MatTable)table!: MatTable<Provedores>;
     @ViewChild('provedorPaginator') paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {


  this.getProvedores();



  }

  openDialog(){
    this.dialog.open(DialogProvedoresComponent,{
       width:'50%'
    }).afterClosed().subscribe(val=>{

     if(val==='save'){

       this.getProvedores();

     }

    })
}

  getProvedores(){
    //mostrando todos los provedores
    this.provedorServicio.getProvedores().subscribe(
      res=> {

       this.provedores= new MatTableDataSource<Provedores>(res);
       this.provedores.paginator = this.paginator;
       this.provedores.sort=this.sort;

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.provedores.filter = filterValue.trim().toLowerCase();

    if (this.provedores.paginator) {
      this.provedores.paginator.firstPage();
    }
  }

  editarEntrada(datos:any){
    this.dialog.open(DialogProvedoresComponent, {
      width:'50%',
      data:datos

    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getProvedores();
      }
    })
  }


  getProductosExcel():void{
        
    this.exportService.exportExcel(this.provedores.data,'Provedores en el Sistema');

 
}


}

