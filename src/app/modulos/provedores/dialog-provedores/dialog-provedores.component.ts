import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProvedorMistral } from 'src/app/modelos/provedor-mistral';
import { ProvedoresService } from 'src/app/servicios/provedores.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-provedores',
  templateUrl: './dialog-provedores.component.html',
  styleUrls: ['./dialog-provedores.component.css']
})
export class DialogProvedoresComponent implements OnInit {

  respuesta:any;
  provedoresMistral:ProvedorMistral[]=[];
  selected='Provedor';
  actionBoton:string="Enviar";
  oculto=false;
  provedorForm = new FormGroup ({
    provedor: new FormControl('',[Validators.required]),
    codeAux: new FormControl(''),
    nombre: new FormControl(''),
    direccion: new FormControl(''),
    provincia: new FormControl(''),
    municipio: new FormControl(''),
    email : new FormControl(''),
    telefono: new FormControl(''),
    observaciones: new FormControl('')
});

  constructor(private provedorServicio:ProvedoresService, private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<DialogProvedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {

    this.getProvedoresMistral();

    if(this.editData){

      this.actionBoton="Actualizar";
      this.oculto=true;
    //  this.provedorForm.controls['provedor'].setValue(this.editData.nombre);
      this.provedorForm.controls['codeAux'].setValue(this.editData.codeAux);
      this.provedorForm.controls['nombre'].setValue(this.editData.nombre);
      this.provedorForm.controls['direccion'].setValue(this.editData.direccion);
      this.provedorForm.controls['provincia'].setValue(this.editData.provincia);
      this.provedorForm.controls['municipio'].setValue(this.editData.municipio);
      this.provedorForm.controls['email'].setValue(this.editData.email);
      this.provedorForm.controls['telefono'].setValue(this.editData.telefono);
      this.provedorForm.controls['observaciones'].setValue(this.editData.observaciones);

    }

  }

  get f (){
    return this.provedorForm.controls;
  }

  getProvedoresMistral(){
    //mostrando todos los provedores
    this.provedorServicio.getProvedoresMistral().subscribe(
      res=> {
       this.provedoresMistral=Object.values(res);



      });
  }


  addProvedor () {
    //añadiendo un nuevo provedor

   if(!this.editData){
    if(this.provedorForm.invalid){
      return;
    }

     this.provedorServicio.guardarProvedores(this.provedorForm.value).subscribe( res =>{

      this.respuesta=res;

      if(this.respuesta.status===1){

        this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
          duration:2000,

        });

         //resetea el formulario
         this.provedorForm.reset();
         //cierra el dialog(modal)
         this.dialogRef.close('save');


      }else {

        this._snackBar.open(JSON.stringify(this.respuesta.message), JSON.stringify(this.respuesta.code),{
          duration:2000,

        });

      }

    });
   }else{
    this.actProvedor();
   }

  }

  actProvedor(){
    this.provedorServicio.updateProvedor(this.provedorForm.value, this.editData.id).subscribe({
      next:(res)=>{

        this._snackBar.open(JSON.stringify(res.message), JSON.stringify(res.code),{
          duration:2000,

        });
        this.provedorForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
          alert("Ups ha ocurrido algun error");
      }
    });
  }

  getprovedorMistral(){

    for (let i=0;i<this.provedoresMistral.length;i++){
      if(this.selected==this.provedoresMistral[i].DESCRIPCION){
        this.provedorForm.controls['codeAux'].setValue(this.provedoresMistral[i].CODENTIDAD);
        this.provedorForm.controls['nombre'].setValue(this.provedoresMistral[i].DESCRIPCION);
        this.provedorForm.controls['direccion'].setValue(this.provedoresMistral[i].DIRECCION);
        this.provedorForm.controls['provincia'].setValue(this.provedoresMistral[i].PROVINCIA);
        this.provedorForm.controls['municipio'].setValue(this.provedoresMistral[i].MUNICIPIO);
        this.provedorForm.controls['email'].setValue(this.provedoresMistral[i].EMAIL);
        this.provedorForm.controls['telefono'].setValue(this.provedoresMistral[i].TELEFONO);
      }
    }

  }

}
