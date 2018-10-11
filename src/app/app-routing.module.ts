import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { StepsComponent } from './steps/steps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'step', component: StepsComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: StepsComponent },
      { path: 'form', component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AppRoutingModule { }
