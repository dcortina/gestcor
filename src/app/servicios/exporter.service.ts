import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE= 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const EXCEL_EXTENSION='.xlsx';


@Injectable({
  providedIn: 'root'
})

export class ExporterService {

  constructor() { }

  exportExcel(json:any[],excelFileName:string):void{
    const hojaCalculo:XLSX.WorkSheet=XLSX.utils.json_to_sheet(json);
    const libroTrabajo:XLSX.WorkBook={Sheets:{'data':hojaCalculo},
                                      SheetNames:['data']
                };

    const excelBuffer:any=XLSX.write(libroTrabajo,{bookType:'xlsx',type:'array'});

    this.saveExcel(excelBuffer,excelFileName);

    }

  private saveExcel(buffer:any,fileName:string):void{
    const data:Blob=new Blob([buffer],{type:EXCEL_TYPE});
    FileSaver.saveAs(data, fileName);
  }

}
