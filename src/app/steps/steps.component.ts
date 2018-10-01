import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent {
  current = 0;
  disableUpload = false;
  excelFile: any;
  validateForm: FormGroup;
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
  
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nickname: [null, [Validators.required]]
    });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  handleChange({ file, fileList }): void {
    this.excelFile = file;
    console.log(this.excelFile);
    (fileList.length > 0) ? this.disableUpload = true : this.disableUpload = false;
  }

  customReq() { }

  deleteFile() {
    this.disableUpload = false;
  }

}
