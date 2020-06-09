import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-jaw',
  templateUrl: './jaw.component.html',
  styleUrls: ['./jaw.component.css']
})
export class JawComponent implements OnInit {
  jaw = {
    46: 11,
    47: 12,
    48: 13,
    49: 14,
    45: 15,
    41: 16,
    44: 17,
    43: 18,
    62: 21,
    63: 22,
    64: 23,
    65: 24,
    61: 25,
    58: 26,
    60: 27,
    59: 28,
    30: 41,
    31: 42,
    32: 43,
    33: 44,
    29: 45,
    26: 46,
    28: 47,
    27: 48,
    14: 31,
    15: 32,
    16: 33,
    17: 34,
    13: 35,
    10: 36,
    12: 37,
    11: 38,
  };
  form = new FormGroup({});
  checkbox = {};
  storage = {};
  counts = {};
  jawData;
  stageId: number;
  current = '';
  stageString = '';
  boundSubmit;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private store: StoreService
  ) {
    this.boundSubmit = this.submit.bind(this);
  }

  ngOnInit(): void {
    for (const key in this.jaw) {
      if (this.jaw.hasOwnProperty(key)) {
        this.checkbox[this.jaw[key]] = false;
      }
    }
    this.route.parent.params.subscribe(params => this.stageId = Number(params.stageId));
    // tslint:disable-next-line:max-line-length
    this.httpService.getStage(this.stageId).subscribe((data) => {this.jawData = data.jaw.data; this.stageString = data.id; this.initStorage(); console.log(data); });
    this.store.bindJawSubmit(this.boundSubmit);
  }

  initStorage() {
    console.log(this.store.getJawValues(this.stageString));
    if (this.store.getJawValues(this.stageString)) {
      this.storage = this.store.getJawValues(this.stageString);
      this.initForm(true);
    } else {
      this.jawData.forEach((el) => {
        this.storage[el.color] = {};
        this.counts[el.color] = 0;
      });
      this.initForm(false);
    }
  }

  initForm(filled) {
    let temp = {};
    this.jawData.forEach((el) => {
      temp[el.color] = new FormControl('0');
    });
    if (filled) {
      for (let key in this.storage) {
        if (this.storage.hasOwnProperty(key)) {
          let count = 0;
          for (let i in this.storage[key]) {
            if (this.storage[key][i]) {
              count++;
            }
          }
          temp[key] = new FormControl(count);
        }
      }
    }
    let formGroup = {};
    formGroup[this.stageString] = new FormGroup(temp);
    this.form = new FormGroup(formGroup);
  }

  jawClick(event: MouseEvent) {
    let tooth = event.target as HTMLElement;
    const className = tooth.className as unknown as SVGAnimatedString;
    const keys = Object.keys(this.jaw) as Array<string>;
    const item = className.baseVal.slice(-2);
    if (keys.includes(item)) {
      this.checkbox[this.jaw[item]] = !this.checkbox[this.jaw[item]];
      tooth.style.fill = this.checkbox[this.jaw[item]] ? this.current : 'url(#SVGID_' + String(Number(item) - 1) + '_)';
      this.counts[this.current] = this.checkbox[this.jaw[item]] ? this.counts[this.current] + 1 : this.counts[this.current] - 1;
      let temp = {};
      if (this.checkbox[this.jaw[item]]) {
        temp[this.current] = Number(this.form.get(this.stageString).get(this.current).value) + 1;
      } else {
        temp[this.current] = Number(this.form.get(this.stageString).get(this.current).value) - 1;
      }
      this.form.get(this.stageString).patchValue(temp);
    }
  }

  colorClick(color: string) {
    if (this.current !== '') {
      this.storage[this.current] = {...this.checkbox};
    }
    this.repaint(color);
    this.current = color;
    if (Object.keys(this.storage[this.current]).length !== 0) {
      this.checkbox = {...this.storage[this.current]};
    } else {
      for (const key in this.checkbox) {
        if (this.checkbox.hasOwnProperty(key)) {
          this.checkbox[key] = false;
        }
      }
    }
  }

  submit() {
    if (this.current !== '') {
      this.storage[this.current] = {...this.checkbox};
    }
    this.store.setJawValues(this.stageString, this.storage);
    this.store.addValues(this.form.getRawValue());
  }

  repaint(color: string) {
    if (this.current !== '') {
      for (const el in this.checkbox) {
        if (this.checkbox.hasOwnProperty(el)) {
          const cl = Object.keys(this.jaw).find(key => this.jaw[key] === Number(el));
          const tooth = document.getElementsByClassName('st' + String(cl))[0] as SVGElement;
          tooth.style.fill = 'url(#SVGID_' + String(Number(cl) - 1) + '_)';
        }
      }
    }

    if (Object.keys(this.storage[color]).length !== 0) {
      for (const el in this.checkbox) {
        if (this.checkbox.hasOwnProperty(el)) {
          const cl = Object.keys(this.jaw).find(key => this.jaw[key] === Number(el));
          const tooth = document.getElementsByClassName('st' + String(cl))[0] as SVGElement;
          if (this.storage[color][el]) {
            tooth.style.fill = color;
          }
        }
      }
    }
  }
}
