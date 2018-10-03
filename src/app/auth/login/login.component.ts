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
    if (localStorage.getItem('loggedIn')) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(credenciales) {
    console.log('TCL: LoginComponent -> submitForm -> value', credenciales);
    this.authSrv.login(credenciales)
      .then(res => {
        console.log('TCL: LoginComponent -> submitForm -> res', res);
        if (res) {
          this.router.navigate(['/dashboard']);
          this.message.success('Ha iniciado sesión correctamente', { nzDuration: 3500 })
        } else {
          this.validateForm.reset();
          this.message.warning('No se pudo iniciar sesión. Compruebe el nombre de usuario y contraseña', { nzDuration: 3500 })
        }
      })
      .catch(() => {
      })
  }

  setLogged() {

  }

}
