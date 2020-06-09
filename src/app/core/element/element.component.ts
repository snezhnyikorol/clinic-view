import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ElementBase} from './element-base';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  @Input()
  element: ElementBase<string>;
  @Input()
  form: FormGroup;
  get isValid() {
    return this.form.controls[this.element.key].valid;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
