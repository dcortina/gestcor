import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from '../Material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SubheaderComponent } from './subheader/subheader.component';
import { AreaComponent } from './graficos/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { PizzaComponent } from './graficos/pizza/pizza.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConducePdfComponent } from './PDF/conduce-pdf/conduce-pdf.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SubheaderComponent,
    AreaComponent,
    TarjetasComponent,
    PizzaComponent,
    ErrorPageComponent,
    ConducePdfComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HighchartsChartModule,

  ],

  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SubheaderComponent,
    AreaComponent,
    TarjetasComponent,
    PizzaComponent,
    ErrorPageComponent,
    ConducePdfComponent
  ]
})
export class PartesModule { }
