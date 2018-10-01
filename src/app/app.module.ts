import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

// Componentes
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StepsComponent } from './steps/steps.component';

// Providers
import { AuthService } from './auth/auth.service';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StepsComponent,
    RegisterComponent
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
