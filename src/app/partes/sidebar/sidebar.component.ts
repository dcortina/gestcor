import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  profile='';
  perfil:boolean=false;

  token: string;
  userdata: any;
  user: any;


  constructor() { }

  ngOnInit(): void {
   this.token=localStorage.getItem('token');
  this.userdata=jwtDecode(this.token);
  this.user=this.userdata.name;
  this.profile=this.userdata.profile;
  this.getProfile();

}

getProfile(){

  if(this.profile == 'Comercial' || this.profile == 'Administrador'){

    this.perfil = true;

  }
}

}
