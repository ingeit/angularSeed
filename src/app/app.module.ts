import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

// Routing
import { AppRoutingModule } from './/app-routing.module';

//Componentes
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StepsComponent } from './steps/steps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstablecimientoListaComponent } from './establecimientos/establecimiento-lista/establecimiento-lista.component';

//Providers
import { AuthService } from './auth/auth.service';
import { AuthHttpInterceptor } from './auth/auth.http.interceptor.service';
import { EstablecimientosService } from './establecimientos/establecimientos.service';
import { EstablecimientoModalComponent } from './establecimientos/establecimiento-modal/establecimiento-modal.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    StepsComponent,
    EstablecimientoListaComponent,
    EstablecimientoModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    AuthService,
    AuthHttpInterceptor,
    EstablecimientosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
