import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-grafico-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() label:string;
  @Input() total:string;
  @Input() percentage:string;
  @Input() cantidades:any[];


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions={};

  cantidad:any[]=[];
  fecha:any[]=[];

  constructor() { }


  ngOnInit(): void {

    this.getCantidad();
    this.getFecha();

console.log(this.cantidades[0].cantidad);

    this.chartOptions={

      chart: {
        type: 'area',
        backgroundColor:null,
        borderwidth:0,
        margin:[2,2,2,2],
        height:60

    },
    title: {
        text: null
    },

    subtitle:{
      text: null
    },

    xAxis: {
      labels:{
        enabled:false
      },
      title:{
        text:null
      },
      categories: this.fecha,
      startOnTick:false,
      endOnTick:false,
      tickOptions:[]
  },

    yAxis: {
        title:{
          text:null
        },
        startOnTick:false,
        endOnTick:false,
        tickOptions:[]
    },


    tooltip: {
      shared:true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
       // outside:true
      },

      legend:{enabled:false},

    plotOptions: {

      area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },

    credits:{
      enabled:false
    },

    exporting:{
      enabled:false
    },

    series: [ {
      name:this.label,
      data:this.cantidad}
        
    ]

    };

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },1000);





  }

  getCantidad(){

    for(let i =0;i<this.cantidades.length;i++){
  
      this.cantidad.push(this.cantidades[i].cantidad)
  
    }
    
  
  }

  getFecha(){

    for(let i =0;i<this.cantidades.length;i++){
  
      this.fecha.push(this.cantidades[i].fecha)
  
    }
    
  
  }







}
