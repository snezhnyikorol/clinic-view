import { Injectable } from '@angular/core';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  values = {};
  jawValues = {};
  submitSection;
  submitJaw;
  submitCredentials;
  constructor(private http: HttpService) { }

  addValues(data: any) {
    Object.assign(this.values, this.values, data);
  }

  bindSubmit(submit) {
    this.submitSection = submit;
  }

  bindJawSubmit(submit) {
    this.submitJaw = submit;
  }

  bindCredSubmit(submit) {
    this.submitCredentials = submit;
  }

  handleSectionSubmit() {
    this.submitSection();
    console.log(this.values);
  }

  handleCredSubmit() {
    this.submitCredentials();
    console.log(this.values);
  }

  handleJawSubmit() {
    this.submitJaw();
    console.log(this.values);
  }

  getValues() {
    return this.values;
  }

  sendResult() {
    const data = this.values;
    this.http.submitData(data);
  }

  setJawValues(stageStr, val) {
    this.jawValues[stageStr] = val;
    console.log(this.jawValues[stageStr]);
  }

  getJawValues(stageStr) {
    return this.jawValues[stageStr];
  }
}
