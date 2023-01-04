import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modulos/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ProductosComponent } from 'src/app/modulos/productos/productos.component';
import { MaterialModule } from 'src/app/Material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartesModule } from 'src/app/partes/partes.module';
import { ProvedoresComponent } from 'src/app/modulos/provedores/provedores.component';
import { DialogProvedoresComponent } from 'src/app/modulos/provedores/dialog-provedores/dialog-provedores.component';
import { DemandaComponent } from 'src/app/modulos/demanda/demanda.component';
import { EntradasComponent } from 'src/app/modulos/entradas/entradas.component';
import { DialogComponent } from 'src/app/modulos/entradas/dialog/dialog.component';
import { EditFacturaDdialogComponent } from 'src/app/modulos/entradas/edit-factura-ddialog/edit-factura-ddialog.component';
import { PlanComponentMedicamentos,WrapperTable } from 'src/app/modulos/demanda/plan/plan.component';
import { PlanComponent } from 'src/app/modulos/plan/plan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComprobarPreciosComponent,ComprobarTable} from '../../modulos/comprobar-precios/comprobar-precios.component';
import { DialogActPlanComponent } from '../../modulos/demanda/dialog-act-plan/dialog-act-plan.component';
import { AnalisisComponent } from '../../modulos/analisis/analisis.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ConduceComponent } from '../../modulos/conduce/conduce.component';
import { DialogConduceComponent } from '../../modulos/conduce/dialog-conduce/dialog-conduce.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ProductosComponent,
    ProvedoresComponent,
    DialogProvedoresComponent,
    DemandaComponent,
    DialogComponent,
    EditFacturaDdialogComponent,
    [PlanComponentMedicamentos,WrapperTable],
    EntradasComponent,
    PlanComponent,
    [ComprobarPreciosComponent,ComprobarTable],
    DialogActPlanComponent,
    AnalisisComponent,
    ConduceComponent,
    DialogConduceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PartesModule,
    FlexLayoutModule,
    HighchartsChartModule,


  ],

  exports: [
    DefaultComponent,
    DashboardComponent,
    ProductosComponent,
    ProvedoresComponent,
    DialogProvedoresComponent,
    DemandaComponent,
    DialogComponent,
    EditFacturaDdialogComponent,
    [PlanComponentMedicamentos,WrapperTable],
    EntradasComponent,
    PlanComponent,
    [ComprobarPreciosComponent,ComprobarTable]

  ]

})
export class DefaultModule { }
