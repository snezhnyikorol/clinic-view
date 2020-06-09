import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brand: object[] = [];
  constructor(private httpService: HttpService, private router: Router) { }

  selected: number = null;
  loading = true;

  selectedBrand(id: number, event: MouseEvent) {
    this.selected = id;
  }

  startQuiz() {
    if (this.selected) {
      this.router.navigate(['quiz', this.selected, 0]);
    }
  }

  ngOnInit(): void {
    this.httpService.getBrands().subscribe((data: object[]) => {
      this.brand = data;
      this.loading = false;
    });
  }

}
