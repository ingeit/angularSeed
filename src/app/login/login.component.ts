import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;

  // submitForm(): void {
  //   for (let i of this.validateForm.controls) {
  //     this.validateForm.controls[ i ].markAsDirty();
  //     this.validateForm.controls[ i ].updateValueAndValidity();
  //   }
  // }

  constructor(private fb: FormBuilder, public authSrv: AuthService) {
  }

  setLogged() {
    this.authSrv.isLoggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
