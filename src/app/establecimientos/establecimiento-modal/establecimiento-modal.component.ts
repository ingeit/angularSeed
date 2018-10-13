import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-establecimiento-modal',
  templateUrl: './establecimiento-modal.component.html',
  styleUrls: ['./establecimiento-modal.component.css']
})
export class EstablecimientoModalComponent implements OnInit, OnDestroy {

  @Input() establecimientoInput: any;
  @Output() mensaje = new EventEmitter<{}>();

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    //hacemos una copia para dejar de referenciar en memoria.
    this.formulario = this.formBuilder.group({
      cue: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(7), Validators.required])],
      nombre: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(100), Validators.required])],
      ambito: ['', Validators.required],
      parroquial: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.rellenarForm();
  }
  ngOnDestroy() {
  }

  rellenarForm() {
    // en caso de que sea una modificacion se autorellena el form
    if (this.establecimientoInput) {
      this.formulario.controls['cue'].setValue(this.establecimientoInput.cue);
      this.formulario.controls['nombre'].setValue(this.establecimientoInput.nombre);
      this.formulario.controls['ambito'].setValue(this.establecimientoInput.ambito);
      this.formulario.controls['parroquial'].setValue(this.establecimientoInput.parroquial);
    }
  }

  submitForm() {
    for (const i in this.formulario.controls) {
      if (this.formulario.controls.hasOwnProperty(i)) {
        this.formulario.controls[i].markAsDirty();
        this.formulario.controls[i].updateValueAndValidity();
      }
    }
    if (this.formulario.valid) {
      this.formulario.value.cue = parseInt(this.formulario.value.cue);
      // this.authSrv.login(this.formulario.value)
      //   .then(res => {
      //     this.router.navigate(['/dashboard']);
      //     this.message.success('Ha iniciado sesión correctamente', { nzDuration: 3500 })
      //   })
      //   .catch(err => {
      //     if (err.status >= 500) {
      //       this.message.error('Problemas de conexion con el servidor. Intente nuevamente mas tarde', { nzDuration: 5000 })
      //     } else {
      //       this.message.warning('Credenciales incorrectas. Compruebe los datos ingresados', { nzDuration: 5000 })
      //     }
      //     this.validateForm.reset();
      //   })
    }
  }



}
