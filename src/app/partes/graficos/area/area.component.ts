import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { LineaProducto } from 'src/app/modelos/linea-producto';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { LineasProductosService } from 'src/app/servicios/lineas-productos.service';


@Component({
  selector: 'app-grafico-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  compPlan:any[]=[];
  lineas: any[]=[];
  lineaProductos:LineaProducto[]=[];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  constructor(private estadisticaService:EstadisticasService) { }

  ngOnInit(): void {

  this.getPlanAcumuladoLinea();

    HC_exporting(Highcharts);

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);



  }


  getPlanAcumuladoLinea(){
    this.estadisticaService.getAcumuladoLinea().subscribe((res:any)=>{

      this.drawDepartments(res);

    });
  }

  drawDepartments(data: any) {

    data.forEach((element: any) => {
      this.lineas.push(element.linea);
      this.compPlan.push(element.porciento);
    });

    this.chartOptions = {

        chart: {
            type: 'column'
        },

        title: {
            align: 'left',
            text: 'Cumplimiento del Plan de entrada por Líneas de Productos'
        },

        subtitle: {
            align: 'left',
            text: 'Fuente Mistral Medicamento'
        },

        accessibility: {
          announceNewData: {
              enabled: true
          }
      },



        xAxis: {
            type: 'category',

          categories: this.lineas,

          labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }

        },


        yAxis: {
          min: 0,
            title: {
                text: 'Porciento de Cumplimiento'
            }

        },

        legend: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span> <b>{point.y:.2f}%</b> del total<br/>'
        },

        series: [

          {

            colorByPoint: true,
            name: 'Plan',
            data: this.compPlan,
            drilldown: this.lineas
          },





        ],

        responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      align: 'center',
                      verticalAlign: 'bottom',
                      layout: 'horizontal'
                  },
                  yAxis: {
                      labels: {
                          align: 'left',
                          x: 0,
                          y: -5
                      },
                      title: {
                          text: null
                      }
                  },
                  subtitle: {
                      text: null
                  },
                  credits: {
                      enabled: false
                  }
              }
          }]
      }

      };


  }

}
