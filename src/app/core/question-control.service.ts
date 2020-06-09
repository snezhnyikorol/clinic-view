import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {
  constructor(
    private store: StoreService
  ) { }

  toFormGroup(questions: any ) {
    let group: any = {};
    let data = this.store.getValues();
    questions.forEach(question => {
      if (question.inputType === 'input') {
        let inputGroup: any = {};
        question.elements.forEach(element => {
          if (data.hasOwnProperty(question.id)) {
            if (data[question.id].hasOwnProperty(element.id)) {
              inputGroup[element.id] = new FormControl(data[question.id][element.id]);
            }
          } else {
            inputGroup[element.id] = new FormControl('');
          }
          // group[element.id] = data.hasOwnProperty(element.id) ? new FormControl(data[element.id]) : new FormControl('');
        });
        group[question.id] = new FormGroup(inputGroup);
      } else if (question.inputType === 'checkbox') {
          let inputGroup: any = {};
          if (data.hasOwnProperty(question.id)) {
            let dataGroup = data[question.id];
            question.elements.forEach(element => {
              if (dataGroup.includes(String(element.id))) { // тут наверное не так
                inputGroup[element.id] = new FormControl(true);
              } else {
                inputGroup[element.id] = new FormControl(false);
              }
            });
          } else {
            question.elements.forEach(element => {
              inputGroup[element.id] = new FormControl(false);
            });
          }
          group[question.id] = new FormGroup(inputGroup);
      } else {
        group[question.id] = data.hasOwnProperty(question.id) ? new FormControl(data[question.id]) : new FormControl('');
      }

    });
    return new FormGroup(group);
  }
}
