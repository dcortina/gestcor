import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Registro } from '../modelos/registro.model';
import {RegistroService} from '../servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  displayedColumns: string[] = ['name', 'carnet', 'cargo' ,'email', 'profile','created_at', 'editar', 'eliminar'];
  usuarios:MatTableDataSource<Registro>;
  profiles=['Analista','Comercial','Administrador'];
  data:any;
  hide = true;
  submitted=false;
  form = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.minLength(6)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)]),
    profile : new FormControl('',[Validators.required]),
    carnet : new FormControl('',[Validators.required]),
    cargo : new FormControl('',[Validators.required])
});

visionEnviar=false;
visionAct=true;
idusuario:number;


  constructor(private registroServicio:RegistroService, private _snackBar: MatSnackBar) { }

  @ViewChild('provedorPaginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {

    this.form;

    this.getusuarios();

  }

  getusuarios(){

    this.registroServicio.getUsuriosRegistrados().subscribe(res=>{

      console.log(res);

      this.usuarios= new MatTableDataSource<Registro>(res);
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort=this.sort;

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();

    if (this.usuarios.paginator) {
      this.usuarios.paginator.firstPage();
    }
  }


  get f(){

     return this.form.controls;

  }



  submit(){

    this.submitted=true;

    if(this.form.invalid){
        return;
    }


    this.registroServicio.usuerRegistrado(this.form.value).subscribe(res=>{

      this.data=res;
      console.log(res);

      if(this.data.status===1){

        this._snackBar.open(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          duration:2000,

        });

        this.getusuarios();

      }else {

        this._snackBar.open(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          duration:2000,

        });

      }
      this.submitted=false;
      this.form.get('name')?.reset();
      this.form.get('email')?.reset();
      this.form.get('password')?.reset();
      this.form.get('profile')?.reset();

    });



  }

  editarUsuario(valor:any){
    this.visionEnviar=true;
    this.visionAct=false;
    console.log(valor);

    if(valor){
      this.idusuario=valor.id;
      this.form.controls['name'].setValue(valor.name.toString());
      this.form.controls['email'].setValue(valor.email);
      this.form.controls['carnet'].setValue(valor.carnet);
      this.form.controls['cargo'].setValue(valor.cargo);
      this.form.controls['profile'].setValue(valor.profile);
   //   this.form.controls['password'].setValue(valor.password);
    }



   }

   updateUsuario(){
    this.registroServicio.updateUsuario(this.form.value,this.idusuario).subscribe({
      next:(res)=>{alert("Usuario Actualizado");
      this.form.reset();
      this.visionEnviar=false;
      this.visionAct=true;
      this.getusuarios();
  }
    })
  }

  deleteUsuario(valor:any){
    this.idusuario=valor.id;
    this.registroServicio.deleteUsuario(this.idusuario).subscribe({

      next:(res)=>{alert("Usuario Eliminado");
      this.getusuarios();
      }
    })

  }



}
