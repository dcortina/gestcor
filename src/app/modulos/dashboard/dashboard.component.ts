import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Estadisticas } from 'src/app/modelos/estadisticas';
import { Producto } from 'src/app/modelos/producto';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ultimasEntradas:Estadisticas[]=[];

  productos:Producto[]=[];

  ultimasCantidades:any[]=[];
  ultimasFechas:any[]=[];


  total=0

  masVendidos:MatTableDataSource<any>;

  displayedColumns: string[] = ['referencia', 'descripcion', 'masVendido'];





  constructor(private estadisticaService:EstadisticasService) { }

  ngOnInit(): void {
    this.getUltimasEntradas();
    this.getMasVendidos();


  }

  getUltimasEntradas(){
    this.estadisticaService.getUltimasEntradas().subscribe(res=>{

      

      this.ultimasEntradas = res;

      for(let i =0;i<this.ultimasEntradas.length;i++){
    
        this.ultimasCantidades.push(this.ultimasEntradas[i].cantUltimas);
          
      
        
      }
    });
  }

  getMasVendidos(){

    this.estadisticaService.getProductosMasVendidos().subscribe(res=>{

 

      this.masVendidos=new MatTableDataSource<any>(Object.values(res));

    });

  }



      




      









}
