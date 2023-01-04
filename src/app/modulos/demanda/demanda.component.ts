import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jwtDecode from 'jwt-decode';
import { elementAt } from 'rxjs';
import { LineaProducto } from '../../modelos/linea-producto';
import { LineasProductosService } from '../../servicios/lineas-productos.service';
import { DialogActPlanComponent } from './dialog-act-plan/dialog-act-plan.component';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['./demanda.component.css']
})
export class DemandaComponent implements OnInit {

  profile='';
  perfil:boolean=false;

  selected = '';
  vacio=false;
  productoPlan=0
  lineaProductos:LineaProducto[]=[];
  pSinPlan:any[]=[];

  productos:MatTableDataSource<any>;

  displayedColumns: string[] = ['referencia', 'descripcion', 'cantidad', 'diasAbastecidos', 'cobertura','ultimaEntrada', 'cantidadUltimaEntrada', 'acumuladoAunual', 'planMes', 'planAnual', 'cumPlan'];


  @ViewChild('productoPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  token: string;
  userdata: any;
  user: any;

  constructor(private lineasProductos:LineasProductosService, private dialog:MatDialog,) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userdata=jwtDecode(this.token);
    this.user=this.userdata.name;
    this.profile=this.userdata.profile;
    this.getProfile();

    this.getLineaProductos();





  }

  getProfile(){

    if(this.profile == 'Comercial' || this.profile == 'Administrador'){

      this.perfil = true;

    }
  }

  openDialog(){
    this.dialog.open(DialogActPlanComponent,{
       width:'50%'
    }).afterClosed().subscribe(val=>{

     if(val==='save'){

      this.obtenerProductosPorLinea()


     }

    })
}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productos.filter = filterValue.trim().toLowerCase();

    if (this.productos.paginator) {
      this.productos.paginator.firstPage();
    }
  }

getLineaProductos(){

  this.lineasProductos.getProductos().subscribe(res=>{



    this.lineaProductos=res;




  });

}


obtenerProductosPorLinea(){

  let linea= {linea_id:this.selected};
  console.log(linea);

  if (this.selected !== ''){

    this.lineasProductos.getProductosPorLinea(linea).subscribe(res=>{



        this.productos = new MatTableDataSource<any>(Object.values(res));
        this.productos.paginator = this.paginator;
        this.productos.sort=this.sort;

        this.productosSinPlan(res)



      });

      this.vacio=true;

  }else{
    this.vacio=false;
  }

this.productoPlan=0;

}

productosSinPlan(data:any){

data.forEach((element:any)=>{

  if(element.planAnual == 0){
    this.productoPlan++;
    this.pSinPlan.push({codigooriginal:element.codigooriginal,referencia:element.referencia,decripcion:element.descripcion});

  }

})

console.log(this.pSinPlan);

}

actProductosSinPlan(){

  this.dialog.open(DialogActPlanComponent, {
    width:'50%',
    data:this.pSinPlan

  }).afterClosed().subscribe(val=>{
    if(val === 'update'){

      this.obtenerProductosPorLinea()

    }
  })


}


}
