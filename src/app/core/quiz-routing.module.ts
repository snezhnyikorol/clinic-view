import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizComponent} from './quiz/quiz.component';
import {CredentialsComponent} from './credentials/credentials.component';
import {StageComponent} from './stage/stage.component';
import {SectionComponent} from './section/section.component';
import {JawComponent} from './jaw/jaw.component';

const coreRoutes: Routes = [
  {
    path: 'quiz/:quizId',
    component: QuizComponent,
    children: [
      {
        path: ':stageId',
        component: StageComponent,
        children: [
          {
            path: 'jaw',
            component: JawComponent,
          },
          {
            path: ':sectionId',
            component: SectionComponent,
          }
        ]
      },
      {
        path: 'dashboard',
        component: CredentialsComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
