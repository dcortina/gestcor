import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MaterialModule} from './Material.module';
import { DefaultModule } from './plantillas/default/default.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { SpinnerModule } from './spinner/spinner/spinner.module';
import { SpinnerInterceptor } from './spinner/interceptors/spinner.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './paginator/customPaginator';
import { PartesModule } from './partes/partes.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//Date import
import localePy from '@angular/common/locales/es-PY';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePy,'es');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
   NavegacionComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    SpinnerModule,
    DefaultModule,
    PartesModule,







  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true},
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    {provide:LOCALE_ID,useValue:'es'}
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
