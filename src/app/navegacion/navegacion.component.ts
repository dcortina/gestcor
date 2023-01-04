import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import{ActivatedRoute, Params, Router} from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  token: any;
  userdata:any;
  user='';

  subtitulo:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private route:ActivatedRoute) {





  }

  ngOnInit(): void {

    this.token=localStorage.getItem('token');
    this.userdata=jwt_decode(this.token);

    this.user=this.userdata.name;

   this.route.queryParams.subscribe((params:Params)=>{
      this.subtitulo=params['title'];
   });


  }

  logout(){

    localStorage.removeItem('token');
    this.router.navigate(['login']);

  }

  setRouteInicio():void{

    this.router.navigate(['/home'],{queryParams:{title:'Inicio'}});

  }

  setRouteProducto():void{

    this.router.navigate(['/home/productos'],{queryParams:{title:'Listado de Productos'}});

  }

  setRouteProvedores():void{

    this.router.navigate(['/home/provedores'],{queryParams:{title:'Listado de Provedores'}});

  }

  setRouteEntradas():void{

    this.router.navigate(['/home/entradas'],{queryParams:{title:'Listado de Entradas'}});

  }

  setRoutePlan():void{

    this.router.navigate(['/home/plan'],{queryParams:{title:'Plan Anual'}});

  }


  setRouteDemanda():void{

    this.router.navigate(['/home/demanda'],{queryParams:{title:'Demanda de Medicamentos'}});

  }

  setRouteDemandaPlan():void{

    this.router.navigate(['/home/planMedicamento'],{queryParams:{title:'Plan Anual de Medicamentos'}});

  }


}
