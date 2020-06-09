import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-jaw-control',
  templateUrl: './jaw-control.component.html',
  styleUrls: ['./jaw-control.component.css']
})
export class JawControlComponent implements OnInit {
  @Input()
  values;
  @Input()
  form;
  @Input()
  stageString;
  clicked = false;
  constructor() { }

  ngOnInit(): void {
  }

}
