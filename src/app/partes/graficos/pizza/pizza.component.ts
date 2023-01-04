import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
@Component({
  selector: 'app-grafico-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  chartOptions:{};
  Highcharts=Highcharts;

  situacion:any[]=[];
  porciento:any[]=[];

  constructor(private estadisticaService:EstadisticasService) { }

  ngOnInit(): void {

    this.getSituacion();


    HC_exporting(Highcharts);

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },1000);
  }

  getSituacion(){
    this.estadisticaService.getSituacion().subscribe((res:any)=>{

     this.situacion=res;


     this.chartOptions={

      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Situación en el Abastecimiento'
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
                distance: 0,
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
        name: 'Porciento',
        colorByPoint: true,
        data: [{
            name: 'Con Cobertura',
            y: res.ConCobertura,

        }, {
            name: 'Baja Cobertura',
            y: res.BajaCobertura
        },  {
            name: 'Falta Provincial',
            y: res.FaltaProvincial
        }, {
            name: 'Sobre Abastecido',
            y: res.SobreAbastecido
        }]
    }]


    };


    })
  }



}
