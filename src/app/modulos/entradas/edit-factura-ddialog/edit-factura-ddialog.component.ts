import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provedores } from 'src/app/modelos/provedores.model';
import { EntradasService } from 'src/app/servicios/entradas.service';
import { ProvedoresService } from 'src/app/servicios/provedores.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-factura-ddialog',
  templateUrl: './edit-factura-ddialog.component.html',
  styleUrls: ['./edit-factura-ddialog.component.css']
})
export class EditFacturaDdialogComponent implements OnInit {

  provedores:Provedores[]=[];
  respuesta:any;
  entradaForm = this.formbuilder.group({
    noFactura: new FormControl('', [Validators.required]),
    fechaLlegada: new FormControl('', [Validators.required]),
    provedores_id: new FormControl('', [Validators.required]),

    observaciones: new FormControl(''),


  });

  constructor(private formbuilder:FormBuilder, private provedorService:ProvedoresService, private entradaService:EntradasService,
    private _snackBar: MatSnackBar,private dialogRef:MatDialogRef<EditFacturaDdialogComponent>, @Inject(MAT_DIALOG_DATA)public editarEntrada:any) { }

  ngOnInit(): void {

    this.getProvedores();
    console.log(this.editarEntrada.fechaLlegada);

  if(this.editarEntrada){
    this.entradaForm.controls['noFactura'].setValue(this.editarEntrada.noFactura);
    this.entradaForm.controls['fechaLlegada'].setValue(this.editarEntrada.fechaLlegada);
    this.entradaForm.controls['provedores_id'].setValue(this.editarEntrada.provedores_id.toString());
    this.entradaForm.controls['observaciones'].setValue(this.editarEntrada.observaciones);
  }

  }

  get f(){
    return this.entradaForm.controls;
  }


  getProvedores(){
    this.provedorService.getProvedores().subscribe(res=>{

      this.provedores=res;

    });
  }

  updateEntrada(){

    this.entradaService.updateEntrada(this.entradaForm.value, this.editarEntrada.entrada_id).subscribe({
        next:(res)=>{alert("Entrada Actualizada");
        this.entradaForm.reset();
      this.dialogRef.close('update');
    }
    });


  }


}
