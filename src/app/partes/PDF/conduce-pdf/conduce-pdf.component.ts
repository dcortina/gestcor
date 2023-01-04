import { Component, Input, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ConduceService } from 'src/app/servicios/conduce.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-conduce-pdf',
  templateUrl: './conduce-pdf.component.html',
  styleUrls: ['./conduce-pdf.component.css']
})
export class ConducePdfComponent implements OnInit {

  @Input() fecha:string;
  @Input() consecutivo:string;
  @Input() facturado:string;
  @Input() direccion:string;
  @Input() lugarEntrega:string;
  @Input() elaborado:string;
  @Input() elaboradoCarnet:string;
  @Input() elaboradoCargo:string;
  @Input() chofer:string;
  @Input() choferCarnet:string;
  @Input() codeEntidad:string;
  @Input() recibe:string;
  @Input() recibeCarnet:string;
  @Input() recibeCargo:string;

  referencia:any[]=[];
  descripcion:any[]=[];
  um:any[]=[];
  cantidad:any[]=[];
  precio:any[]=[];
  importe:any[]=[];
  total=0;
  constructor(private conduceService:ConduceService) { }

  ngOnInit() {
    this.getProductosConduce();
  }

  getProductosConduce(){
    this.conduceService.getProductosConduce().subscribe(res=>{

      this.saveReferencia(res);


    });
  }

    saveReferencia(valor:any){

      valor.forEach((data:any)=>{

        if(this.consecutivo==data.consecutivo){
          this.referencia.push(data.referencia);
          this.descripcion.push(data.descripcion);
          this.um.push(data.um);
          this.cantidad.push(data.cantidad);
          this.precio.push(data.precio);
          this.importe.push(data.importe);
          this.total= this.total+data.importe
        }

      })

    }


  createPdf(){
    const pdfDefinition:any={
      pageSize: 'letter',
      pageOrientation: 'landscape',



      content:[
        {text: 'Conduce  \n', style: 'header'},

          {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Fecha: \n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.fecha +'\n',

            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Consecutivo: \n',
              bold:true,
              margin: [350, 0, 0, 0]
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.consecutivo+'\n'
            },

          ],
          columnGap: 10
        },

        {text: 'Entidad Suministradora: Empresa Comercializadora y Distribuidora de Medicamentos de EMCOMED Las Tunas. \n\n', style: 'subheader'},

        {text: 'Dirección: Camino del Oriente Km 2 1/2 Zona Industrial S/N. \n\n'},

        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'No NIT: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: '01001015143 \n\n'
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Código REEUP: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: '305-0-13-302 \n\n'
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Cuenta Bancaria en MN No: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: '406462512178007 \n\n'
            },

          ],
          columnGap: 10
        },

        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Facturado a:',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.facturado
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Código:',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.codeEntidad
            },

          ],
          columnGap: 10
        },

        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Dirección:',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.direccion
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Lugar de entrega:',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.lugarEntrega
            },

          ],
          columnGap: 10
        },

        {
          style: 'tableExample',
			    color: '#444',
          table: {
            widths: [95, 400,40,50,50,50],
            headerRows: 2,

            body: [
              [{text: 'Productos', style: 'tableHeader', colSpan: 6, alignment: 'center'}, {},{},{},{},{}],
              [{text: 'Código', style: 'tableHeader'}, {text: 'Descripción', style: 'tableHeader'},{text: 'U/M', style: 'tableHeader'}, {text: 'Cantidad', style: 'tableHeader'},{text: 'Precio', style: 'tableHeader'},{text: 'Importe', style: 'tableHeader'}],
              [

                this.referencia,
                this.descripcion,
                this.um,
                this.cantidad,
                this.precio,
                this.importe,

              ],
              [{colSpan: 6,text: 'importe Total: '+this.total}, '', '', '', '', ''],




            ]
          }
        },

            //autoriza
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Nombre y Apellidos de quien autoriza: \n',
              bold:true

            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.elaborado+'\n'
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Fecha: \n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.fecha+'\n'
            },

          ],
          columnGap: 10
        },

        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Carnet: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.elaboradoCarnet+'\n\n'
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Cargo: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: this.elaboradoCargo+'\n\n'
            },

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'Firma: \n\n',
              bold:true
            },
            {
              // star-sized columns fill the remaining space
              // if there's more than one star-column, available width is divided equally
              width: '*',
              text: '______________________ \n\n'
            },

          ],
          columnGap: 10
        },


       //chofer

       {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Nombre y Apellidos del Transportista: \n',
            bold:true

          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: this.chofer+'\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Fecha: \n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: '\n'
          },

        ],
        columnGap: 10
      },

      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Carnet:\n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: this.choferCarnet+'\n\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Cargo: \n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: 'Distribuidor Mayorista de Medicamentos \n\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Firma: \n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: '______________________ \n\n'
          },

        ],
        columnGap: 10
      },


      //cliente

      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Nombre y Apellidos del cliente: \n',
            bold:true

          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: this.recibe+'\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Fecha: \n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: '\n'
          },

        ],
        columnGap: 10
      },

      {
        columns: [
          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Carnet: \n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: this.recibeCarnet+'\n\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Cargo: \n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: this.recibeCargo+'\n\n'
          },

          {
            // auto-sized columns have their widths based on their content
            width: 'auto',
            text: 'Firma: \n\n',
            bold:true
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            width: '*',
            text: '______________________ \n\n'
          },

        ],
        columnGap: 10
      },


      ],
      styles: {
        header: {
          fontSize: 30,
          bold: true,
          alignment: 'center'
        },

        subheader:{
          fontSize: 14,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
          margin: [-12, 5, 0, 15]
        }

      }
    };

   const pdf = pdfMake.createPdf(pdfDefinition).download('conduce '+this.consecutivo+'.pdf');
  //  pdf.open();



  }

}
