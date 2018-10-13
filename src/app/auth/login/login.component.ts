import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authSrv: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm() {
    this.authSrv.login(this.validateForm.value)
      .then(res => {
        this.router.navigate(['/dashboard']);
        this.message.success('Ha iniciado sesión correctamente', { nzDuration: 3500 })
      })
      .catch(err => {
        // if (err.status >= 500) {
        //   this.message.error('Problemas de conexion con el servidor. Intente nuevamente mas tarde', { nzDuration: 5000 })
        // } else {
        //   this.message.warning('Credenciales incorrectas. Compruebe los datos ingresados', { nzDuration: 5000 })
        // }
        // this.validateForm.reset();
      })
  }

  setLogged() {

  }

}
