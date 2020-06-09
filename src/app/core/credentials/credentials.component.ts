import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required])
  });
  boundSubmit;

  get name() { return this.form.get('name'); }

  get email() { return this.form.get('email'); }
  constructor(private router: Router, private store: StoreService) {
    this.boundSubmit = this.submit.bind(this);
  }

  ngOnInit(): void {
    this.store.bindCredSubmit(this.boundSubmit);
  }

  submit() {
    // console.warn(this.form.value);
    // куда-то отправить
    this.store.addValues(this.form.getRawValue());
  }

  submitAndNext() {
    this.store.handleCredSubmit();
    this.router.navigate(['brand']);
  }

}
