import { DataSource } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { PlanMedicamentoService } from 'src/app/servicios/plan-medicamento.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponentMedicamentos implements AfterViewInit {
  
  
  mensaje= "datos cargados correctamente";
  convertirJson:any=[];
  displayedColumns: string[] = ['referencia', 'cantidad'];
  dataSource = new MatTableDataSource<any>(this.convertirJson);
  data: any;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  oculto=true;


  @ViewChild('sort') sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private planMedicamentoService:PlanMedicamentoService) { }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  fileUpload(event:any){
   
    const archivoSeleccionado = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(archivoSeleccionado);
    fileReader.onload = (event) =>{
   
      let binaryData = event.target.result;
      let worBook = XLSX.read(binaryData, {type: 'binary'});
      worBook.SheetNames.forEach(sheet=>{
        const data = XLSX.utils.sheet_to_json(worBook.Sheets[sheet]);
        console.log(data);
        this.convertirJson = data;

      
      
        toString
        
        if(Object.values(data)){
         this.value=100;
          this._snackBar.open('Datos Cargados Correctamente','ok',{
            duration:2000,
            horizontalPosition: 'center',
          
                     
          });

        }

      })
      

    }
  
  }


  clearTable() {
    this.dataSource.data = [];
  }

  addData() {
    this.dataSource.data = this.convertirJson;
  }

  enviarData(){

    this.planMedicamentoService.guardarProducto(Object.values(this.convertirJson)).subscribe(res=>{

    //  next:(res)=>alert("Datos Guardados correctamente")

    this.data=res;

    if(this.data.status===1){
        this._snackBar.open(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
        duration:5000,
        verticalPosition: 'top'
      });
      
    }else if(this.data.status===0){

      this._snackBar.open(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
        duration:5000,
        verticalPosition: 'top'
      });

    }

    })

 
  }

accionBotones(){
  if(this.convertirJson.length>0){
    this.oculto=false;
  }
}


}

@Component({
  selector: 'wrapper-table',
  templateUrl: 'wrapper-table.html',
  styles: [
    `
    table {
      width: 100%;
    }
  `,
  ],
})
export class WrapperTable<T> implements AfterContentInit {
  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  @ViewChild(MatTable, {static: true}) table: MatTable<T>;

  @Input() columns: string[];

  @Input() dataSource: DataSource<T>;

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);
  }

  
}
