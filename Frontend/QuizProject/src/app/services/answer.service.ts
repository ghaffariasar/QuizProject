// src/app/services/answer.service.ts
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/answer.model';

@Injectable({ providedIn: 'root' })
export class AnswerService extends GenericService<Answer> {
  protected override endpoint: string = "";

  constructor(http: HttpClient) {
    super(http);
  }
}
