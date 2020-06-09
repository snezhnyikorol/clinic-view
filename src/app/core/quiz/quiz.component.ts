import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  id: number;
  loading = true;
  quiz;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params.quizId);
    // this.httpService.getQuiz(this.id).subscribe((data) => this.quiz = JSON.parse(data.fields));
    this.httpService.getQuiz(this.id).subscribe((data) => {
      this.quiz = data;
      this.loading = false;
    });
  }

}
