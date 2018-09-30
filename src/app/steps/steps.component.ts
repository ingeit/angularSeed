import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent {
  current = 0;
  disableUpload = false;
  excelFile:any;

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

  customReq() {}

  deleteFile() {
    this.disableUpload = false;
  }

  constructor() {
  }
}
