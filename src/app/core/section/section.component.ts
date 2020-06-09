import { Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from '../question-control.service';
import {StoreService} from '../store.service';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  section;
  stageId: number;
  sectionId: number;
  form: FormGroup = new FormGroup({});
  payLoad;
  boundSubmit;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private qcs: QuestionControlService,
    private store: StoreService,
    ) {
    this.boundSubmit = this.onSubmit.bind(this);
  }
  ngOnInit(): void {
    this.route.parent.params.subscribe(params => this.stageId = Number(params.stageId));
    this.route.params.subscribe(params => {
      this.sectionId = Number(params.sectionId);
      this.httpService.getSection(this.stageId, this.sectionId).subscribe((data) => {
        this.section = data;
        this.form = this.qcs.toFormGroup(this.section.children);
      });
    });
    this.store.bindSubmit(this.boundSubmit);
  }

 isCheckbox(id) {
    let result = false;
    this.section.children.forEach(question => {
      if (String(question.id) === String(id) && question.inputType === 'checkbox') {
        result = true;
      }
    });
    return result;
 }

 onSubmit() {
    this.payLoad = this.form.getRawValue();
    // обработать
    for (let item in this.payLoad) {
      if (this.payLoad.hasOwnProperty(item)) {
        let temp = [];
        for (let key in this.payLoad[item]) {
          if (this.payLoad[item].hasOwnProperty(key)) {
            if (this.payLoad[item][key] === true) {
              temp.push(key);
            }
          }
        }
        if (this.isCheckbox(item)) {
          this.payLoad[item] = temp;
        }
      }

    }
    this.store.addValues(this.payLoad);
  }

}
