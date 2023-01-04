import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from '../servicios/registro.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  data: any;
  token:any;
  elUser:string='';

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(6)]),
});


  constructor(private router:Router,private registroServicio:RegistroService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form;
  }

  submit(){


    if(this.form.invalid){

        return;

    }

    this.registroServicio.login(this.form.value).subscribe(res=>{

      this.data=res;
      if(this.data.status===1){
        this.token=this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home']);
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

  get f(){

    return this.form.controls;

 }







}
