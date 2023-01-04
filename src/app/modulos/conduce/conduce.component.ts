import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConduceService } from 'src/app/servicios/conduce.service';
import { DialogConduceComponent } from './dialog-conduce/dialog-conduce.component';


@Component({
  selector: 'app-conduce',
  templateUrl: './conduce.component.html',
  styleUrls: ['./conduce.component.css']
})
export class ConduceComponent implements OnInit {




  displayedColumns: string[] = ['fechaCreado','fechaTransporte','consecutivo', 'destino','codeEntidad',
                                'direccion','motivoConduce','lugarEntrega','chofer','carnetChofer' ,'name','carnet',
                                  'cargo','recibe','recibeCarnet','recibeCargo','editar', 'pdf'];

  conduce:MatTableDataSource<any>;

  contadorConduce=0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private dialog:MatDialog, private conduceService: ConduceService) { }

  ngOnInit(): void {

    this.getConduce();

  }

  getConduce(){

    this.conduceService.getConduce().subscribe(res=>{
      console.log(res)
      this.conduce= new MatTableDataSource<any>(res);
      this.conduce.paginator=this.paginator;
      this.conduce.sort=this.sort;
      this.contadorConduce=res.length;

    })

  }

  openDialog(){
    this.dialog.open(DialogConduceComponent,{

       width:'70%',
       data:this.contadorConduce
    }).afterClosed().subscribe(val=>{

     if(val==='save'){

      this.getConduce();

     }

    })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.conduce.filter = filterValue.trim().toLowerCase();

  if (this.conduce.paginator) {
    this.conduce.paginator.firstPage();
  }
}

getProductosExcel(){

}

editarEntrada(element){



}



}
