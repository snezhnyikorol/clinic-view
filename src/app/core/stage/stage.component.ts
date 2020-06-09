import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  stage;
  id: number;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) { }

  get routeHasChild() {return this.route.firstChild !== null; }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params.stageId);
      this.httpService.getStage(this.id).subscribe((data) => this.stage = data);
    });
  }

}
