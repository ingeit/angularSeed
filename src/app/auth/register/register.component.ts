import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authSrv: AuthService
  ) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required], [this.usernameAsyncValidator]],
      email: ['', [ Validators.required,  Validators.email], [this.emailAsyncValidator]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]]
    });
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    if (this.validateForm.valid) {
      this.authSrv.registrar(value)
        .then(res => {
          console.log('TCL: RegisterComponent -> res', res);
          this.resetForm();
        })
        .catch(err => {
          console.log('TCL: RegisterComponent -> err', err);

        })
    }
  };

  resetForm(): void {
   this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  usernameAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      const selector = {
        username: control.value
      }
      this.authSrv.buscarCoincidencias(selector)
        .then(res => {
          // no hay coincidencias
          observer.next(null);
          observer.complete();
        })
        .catch(err => {
          // ya existe
          observer.next({ error: true, duplicated: true });
          observer.complete();
        });
    }, 200);
  });

  emailAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      const selector = {
        email: control.value
      }
      this.authSrv.buscarCoincidencias(selector)
        .then(res => {
          // no hay coincidencias
          observer.next(null);
          observer.complete();
        })
        .catch(err => {
          // ya existe
          observer.next({ error: true, duplicated: true });
          observer.complete();
        });
    }, 200);
  });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };
}