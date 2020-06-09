import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  public quiz;
  quizData;
  getBrands() {
    return this.http.get('/forms/available');
  }

  getQuiz(id: number) {
      this.quiz = new Observable<any>(subscriber => {
      if (this.quizData) {
        subscriber.next(this.quizData);
      } else {
        this.http.get(`/form/${id}/questions`).subscribe((data: any) => {
          this.quizData = JSON.parse(data.fields);
          subscriber.next(this.quizData);
        });
      }
    });
      return this.quiz;
  }

  getStage(id: number) {
    return new Observable<any>(subscriber => {
      // this.quiz.subscribe((data) => subscriber.next(JSON.parse(data.fields).children[id]));
      this.quiz.subscribe((data) => subscriber.next(data.children[id]));
    });
  }

  getSection(stageId: number, sectionId: number) {
    return new Observable<any>(subscriber => {
      this.getStage(stageId).subscribe((data) => subscriber.next(data.children[sectionId]));
    });
  }

  submitData(data) {
    const url = '/form/saveFilledForm';
    this.http.post(url, data).subscribe((res: any) => window.location = res.url);
  }
}
