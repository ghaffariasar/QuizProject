import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class QuizService extends GenericService<Quiz> {
  protected override endpoint: string = "quizzes";

  constructor(http: HttpClient) {
    super(http);
  }
}
