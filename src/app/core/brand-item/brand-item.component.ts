import {Component, Input, OnInit, HostListener} from '@angular/core';

@Component({
  selector: '[app-brand-item]',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.css']
})
export class BrandItemComponent implements OnInit {
  @Input()
  item = {
    form_name: '',
    form_id: '',
    materials: '',
    country: '',
    engraftment_time: '',
    guarantee: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
