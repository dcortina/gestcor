import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Plan } from '../../modelos/plan';
import { Consumos } from '../../modelos/consumos';
import { PlanService } from '../../servicios/plan.service';
import { ExporterService } from 'src/app/servicios/exporter.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlanComponent implements OnInit {

  unidades:MatTableDataSource<Plan>;

  consumos:MatTableDataSource<Consumos>;

  productoMasVendido:any[]=[];
  productoMayorImporte:any[]=[];
  unidadActiva:any[]=[];
  unidadCompra:any[]=[];

  consumosPorDodigo:any;

  botonExcel=true;

  hayMas=false;
  prueba:any[]=[];
  columnsToDisplay = ['entidad', 'descentidad'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay,'expand'];

  expandedElement: Plan | null;

  displayedColumns: string[] = ['descripcion','precio', 'cantidad', 'importe', 'vendido','importeVendido'];

  total = 0;
  totalVendido = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private planService:PlanService, private exportService:ExporterService) { }

  ngOnInit(): void {

    this.getUnidades();
    this.getProductoMasVendido();
    this.getProductoMayorImporte();
    this.getUnidadMasActiva();
    this.getUnidadMasImporte();
    this.planService.getConsumosPorCodigo().subscribe(res=>{

      this.consumosPorDodigo=res;



  });

  }

  getUnidades(){
    this.planService.getUnidadesConsumo().subscribe(res=>{
     this.unidades= new MatTableDataSource(res);
     this.unidades.paginator=this.paginator;
     this.unidades.sort=this.sort;
    })
  }

  getProductoMasVendido(){
    this.planService.getProductoMasVendido().subscribe(res=>{

      this.productoMasVendido=res;

      console.log(res);

    });
  }

  getProductoMayorImporte(){
    this.planService.getProductoConMayorImporte().subscribe(res=>{

      this.productoMayorImporte=res;

      console.log(res);

    });
  }

  getUnidadMasActiva(){
    this.planService.getUnidadMasActiva().subscribe(res=>{

      this.unidadActiva=res;

      console.log(res);

    });
  }


  getUnidadMasImporte(){
    this.planService.getUnidadMasCompra().subscribe(res=>{

      this.unidadCompra=res;

      console.log(res);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.unidades.filter = filterValue.trim().toLowerCase();

    if (this.unidades.paginator) {
      this.unidades.paginator.firstPage();
    }
  }


  obtenerConsumos(valor:any){


    let entidad= {entidad:valor.entidad};


    console.log(entidad);
    this.planService.getConsumos(entidad).subscribe(res=>{

    // console.log(Object.values(res));
      this.consumos= new MatTableDataSource<Consumos>(Object.values(res));



     // this.consumos.paginator = this.paginator;
     // this.consumos.sort=this.sort;


      this.prueba= Object.values(res);

      for(let i = 0; i< this.prueba.length;i++){

        this.total = this.total+this.prueba[i].importe;

        this.totalVendido = this.totalVendido+ parseFloat(this.prueba[i].importeVendido);

      }

     for(let j=0; j<this.consumosPorDodigo.length;j++){

      for (let i=0; i<this.prueba.length;i++){

        if(this.consumosPorDodigo[j].codigooriginal === this.prueba[i].codigooriginal && this.consumosPorDodigo[j].cantidad != this.prueba[i].existencia){
        console.log(this.prueba[i].descripcion,'---',this.consumosPorDodigo[j].cantidad);
        this.hayMas=true;

      }

      }

    }

    });

    this.botonExcel=false;


  }


  applyFilterConsumos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.consumos.filter = filterValue.trim().toLowerCase();

  }




  getProductosExcel():void{

    this.exportService.exportExcel(this.consumos.data,'Consumos por Unidad');


}


}
