import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsComponent } from './credentials/credentials.component';
import {HttpClientModule} from '@angular/common/http';
import { BrandComponent } from './brand/brand.component';
import { BrandItemComponent } from './brand-item/brand-item.component';
import { QuizComponent } from './quiz/quiz.component';
import {QuizRoutingModule} from './quiz-routing.module';
import { StageComponent } from './stage/stage.component';
import { SectionComponent } from './section/section.component';
import { QuestionComponent } from './question/question.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { JawComponent } from './jaw/jaw.component';
import {JawControlComponent} from './jaw-control/jaw-control.component';
import { ElementComponent } from './element/element.component';


@NgModule({
  declarations: [ CredentialsComponent, BrandComponent, BrandItemComponent, QuizComponent, StageComponent, SectionComponent, QuestionComponent, NavigationComponent, JawComponent, JawControlComponent, ElementComponent],
  exports: [
    CredentialsComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    QuizRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
