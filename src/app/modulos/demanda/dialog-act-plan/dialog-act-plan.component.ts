import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineasProductosService } from 'src/app/servicios/lineas-productos.service';

@Component({
  selector: 'app-dialog-act-plan',
  templateUrl: './dialog-act-plan.component.html',
  styleUrls: ['./dialog-act-plan.component.css']
})
export class DialogActPlanComponent implements OnInit {

 
 
 
 
  productosSinPlanForm = this.formbuilder.group({

    items:this.formbuilder.array([]),

  });
  respuesta: any;

  constructor(private formbuilder:FormBuilder,private lineasService:LineasProductosService,private dialogRef:MatDialogRef<DialogActPlanComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    console.log(this.data);

    this.productosSinPlan();

  }

 productosSinPlan(){

    for(let i =0; i<this.data.length;i++){
      const controls = <FormArray>this.productosSinPlanForm.controls['items']
      let formGroup = this.formbuilder.group({
                                              codigoOriginal: [this.data[i].codigooriginal],
                                              referencia:[this.data[i].referencia],
                                              descripcion:[this.data[i].decripcion],
                                              plan:['',[Validators.required]],
  });

controls.push(formGroup);

      }

  }


  enviarPlan(){
    this.lineasService.actualicarPlan(this.productosSinPlanForm.value).subscribe(res=>{

      this.respuesta=res;
      
      //resetea el formulario
      this.productosSinPlanForm.reset();
      //cierra el dialog(modal)
      this.dialogRef.close('save');
    })



  }


}
