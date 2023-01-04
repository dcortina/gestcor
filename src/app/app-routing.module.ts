import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RegistroComponent } from './registro/registro.component';
import {AuthGuard} from './auth.guard';
//import { ProvedoresComponent } from './provedores/provedores.component';
//import { EntradasComponent } from './entradas/entradas.component';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorPageComponent } from '../app/partes/error-page/error-page.component';
//import {PlanComponent} from './plan/plan.component';
//import { DemandaComponent } from './demanda/demanda.component';
//import { PlanComponentMedicamentos } from './demanda/plan/plan.component';
import { DefaultComponent } from './plantillas/default/default.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { ProductosComponent } from 'src/app/modulos/productos/productos.component';
import { ProvedoresComponent } from 'src/app/modulos/provedores/provedores.component';
import { EntradasComponent } from 'src/app/modulos/entradas/entradas.component';
import { PlanComponent } from 'src/app/modulos/plan/plan.component';
import { DemandaComponent } from 'src/app/modulos/demanda/demanda.component';
import { PlanComponentMedicamentos,WrapperTable } from 'src/app/modulos/demanda/plan/plan.component';
import { ComprobarPreciosComponent } from './modulos/comprobar-precios/comprobar-precios.component';
import { AnalisisComponent } from './modulos/analisis/analisis.component';
import { ConduceComponent } from './modulos/conduce/conduce.component';

/*
const routes: Routes = [

  {path: '', component:InicioComponent},

  {path: 'home',title: 'Inicio', component:NavegacionComponent, children:[

    {
      path:'registrar', title: 'Registrar',component:RegistroComponent
  },
    {
      path:'entradas',title: 'Entradas', component:EntradasComponent
    },

    {
      path:'productos',title: 'Productos', component:ProductosComponent
    },

  {
    path:'provedores',title: 'Provedores', component:ProvedoresComponent
  },

  {
    path:'plan',title: 'Plan Anual de los Centros de Consumos', component:PlanComponent
  },

  {
    path:'demanda',title: 'Demanda de Medicamentos', component:DemandaComponent
  },

  {
    path:'planMedicamento',title: 'Plan Anual de Medicamentos', component:PlanComponentMedicamentos
  },

    ], canActivate:[AuthGuard]},

  {path: 'login', component:LoginComponent},
  {path: '**', component:ErrorPageComponent},

];
*/

const routes: Routes = [
  {path: '', component:LoginComponent},
  {
    path:'home',
    component:DefaultComponent,
    children:[
      {path:'', title: 'Inicio', component:DashboardComponent},
      {path:'inicio', title: 'Inicio', component:DashboardComponent},
      {path:'productos', title: 'Productos', component:ProductosComponent},
      {path:'provedores', title: 'Provedores', component:ProvedoresComponent},
      {path:'entradas',title: 'Entradas', component:EntradasComponent},
      {path:'consumos',title: 'Plan Anual de los Centros de Consumos', component:PlanComponent},
      {path:'demanda',title: 'Demanda de Medicamentos', component:DemandaComponent},
      {path:'plan',title: 'Plan Anual de Medicamentos', component:PlanComponentMedicamentos},
      {path:'conduce',title: 'Generador de Conduces', component:ConduceComponent},
      {path:'precios',title: 'Precios Oficiales', component:ComprobarPreciosComponent},
      {path:'analisis', title: 'Analisis de Inventario',component:AnalisisComponent},
      {path:'registrar', title: 'Registrar',component:RegistroComponent},


  ], canActivate:[AuthGuard]},

  {path: '**', component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
