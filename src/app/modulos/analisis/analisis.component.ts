import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnalisisService } from 'src/app/servicios/analisis.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements OnInit {

  importeTotal:any;
  totalProductosImpacto=0;
  porcientoImpacto=0;

  productosMasImporte:MatTableDataSource<any>;

  displayedColumns: string[] = ['referencia', 'descripcion', 'importe'];

  chartOptions:{};
  Highcharts=Highcharts;

  constructor(private analisisService:AnalisisService) { }

  @ViewChild('provedorPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getImporteTotal();
    this.getProductosMasImporte();





  }


  getImporteTotal(){

    this.analisisService.getImporteTotal().subscribe(res=>{

      this.importeTotal=res;



    })

  }

  getProductosMasImporte(){
    this.analisisService.getMasImporte().subscribe(res=>{

      Object.values(res).forEach((element:any)=>{

        this. totalProductosImpacto+=parseFloat(element.importe);


      });

     this.porcientoImpacto = (this.totalProductosImpacto*100)/parseFloat(this.importeTotal);


      console.log(this.totalProductosImpacto);
      console.log(parseFloat(this.importeTotal));
      console.log(this.porcientoImpacto);

      this.productosMasImporte= new MatTableDataSource<any>(res);
      this.productosMasImporte.paginator=this.paginator;
      this.productosMasImporte.sort=this.sort;


      this.chartOptions={

        chart: {
          backgroundColor: null,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: '',

      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  distance: -80,
                  filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
              }
          }
      },

      exporting:{
        enabled:false
      },

      credits:{
        enabled:false
      },

      series: [{
          name: 'Representa un porciento de ',
          colorByPoint: true,
          data: [{
              name: 'Productos con Mayor Impacto',
              y: this.porcientoImpacto,

          }, {
              name: 'Resto Productos',
              y: (this.porcientoImpacto),
          }]
      }]


      };


    });




  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productosMasImporte.filter = filterValue.trim().toLowerCase();

    if (this.productosMasImporte.paginator) {
      this.productosMasImporte.paginator.firstPage();
    }
  }


}
