import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Output() activeMenu: EventEmitter<any>= new EventEmitter();

  token: any;
  userdata:any;
  user='';
  profile='';
  perfilAdmin:boolean=false;

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.token=localStorage.getItem('token');
    this.userdata=jwtDecode(this.token);
    this.user=this.userdata.name;
    this.profile=this.userdata.profile;
    this.getProfile();

  }

  getProfile(){

    if(this.profile == 'Administrador'){

      this.perfilAdmin = true;

    }
  }

  menuActivo(){

    this.activeMenu.emit();
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);


  }

  logout(){

    localStorage.removeItem('token');
    this.router.navigate(['']);

  }

}
function jwt_decode(token: any): any {
  throw new Error('Function not implemented.');
}

