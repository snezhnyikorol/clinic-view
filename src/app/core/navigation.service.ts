import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
  PRIMARY_OUTLET, NavigationEnd, Router
} from '@angular/router';
import {Location} from '@angular/common';
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  segments: UrlSegment[];
  quiz;
  quizLength;
  stageLength: Array<any> = [];
  route;
  hasJaw = false;
  constructor(private httpService: HttpService, private store: StoreService, private router: Router, private location: Location) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = location.path();
        const tree: UrlTree = router.parseUrl(this.route);
        let g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        this.segments = g.segments;
        this.httpService.getQuiz(Number(this.segments[1].path)).subscribe((data) => {
          // this.quiz = JSON.parse(data.fields);
          this.quiz = data;
          this.quizLength = this.quiz.children.length;
          this.quiz.children.forEach((el) => {
            this.stageLength.push(el.children.length);
          });
          this.hasJaw = Boolean(this.quiz.children[0].jaw.active);
        });
      }
    });
  }

  getPrev() {
    let currPath = [this.segments[0].path, this.segments[1].path, ''];
    if (!this.segments.hasOwnProperty(3)) {
      if (Number(this.segments[2].path) !== 0 ) {
        currPath[2] = String(Number(this.segments[2].path) - 1);
        currPath[3] = String(this.stageLength[Number(this.segments[2].path) - 1] - 1);
      } else {
        currPath[2] = String(Number(this.segments[2].path));
      }
    } else {
      if (this.segments[3].path === 'jaw') {
        currPath[2] = String(Number(this.segments[2].path));
      } else if (Number(this.segments[3].path) !== 0 ) {
        currPath[2] = String(Number(this.segments[2].path));
        currPath[3] = String(Number(this.segments[3].path) - 1);
      } else if (Number(this.segments[3].path) === 0 ) {
        currPath[2] = String(Number(this.segments[2].path));
        if (this.hasJaw) {
          currPath[3] = 'jaw';
        }
        currPath[3] = String('jaw');
      }
    }
    return currPath;
  }

  getNext() {
    let currPath = [this.segments[0].path, this.segments[1].path, ''];
    if (!this.segments.hasOwnProperty(3)) {
      currPath[2] = this.segments[2].path;
      if (this.hasJaw) {
        currPath[3] = 'jaw';
      } else {
        currPath[3] = String(0);
      }
    } else {
      currPath[2] = this.segments[2].path;
      if (this.segments[3].path === 'jaw') {
        currPath[3] = String(0);
      } else if (Number(this.segments[3].path) < this.stageLength[Number(this.segments[2].path)] - 1) {
        currPath[3] = String(Number(Number(this.segments[3].path) + 1));
      } else if (Number(this.segments[2].path) < this.quizLength - 1) {
        currPath[2] = String(Number(this.segments[2].path) + 1);
      } else {
        this.store.sendResult();
      }
    }
    return currPath;
  }

  getSkip() {
    let currPath = [this.segments[0].path, this.segments[1].path, ''];
    if (!this.segments.hasOwnProperty(3)) {
      // currPath[2] = this.segments[2].path;
      // if (this.hasJaw) {
      //   currPath[3] = 'jaw';
      // } else {
      //   currPath[3] = String(0);
      // }
      if (Number(this.segments[2].path) < this.quizLength - 1) {
        currPath[2] = String(Number(this.segments[2].path) + 1);
      } else {
        console.log('send');
        this.store.sendResult();
      }
    } else {
      currPath[2] = this.segments[2].path;
      if (this.segments[3].path === 'jaw') {
        currPath[3] = String(0);
      } else if (Number(this.segments[3].path) < this.stageLength[Number(this.segments[2].path)] - 1) {
        currPath[3] = String(Number(Number(this.segments[3].path) + 1));
      } else if (Number(this.segments[2].path) < this.quizLength - 1) {
        currPath[2] = String(Number(this.segments[2].path) + 1);
      } else {
        this.store.sendResult();
      }
    }
    return currPath;
  }

  isSection() {
    return !!this.segments[3] && this.segments[3].path !== 'jaw';
  }

  isJaw() {
    return !!this.segments[3] && this.segments[3].path === 'jaw';
  }
}
