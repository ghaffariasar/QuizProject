// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class QuestionService extends GenericService<Question> {
  protected override endpoint: string = "questions";

  constructor(http: HttpClient) {
    super(http);
  }

  getQuestionsWithAnswers() {
    return this.http.get<Question[]>(`${this.apiBase}/${this.endpoint}/with-answers`);
  }
}
