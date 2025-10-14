import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Result } from '../models/result.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ResultService extends GenericService<Result> {
  protected endpoint = 'results';  

  constructor(http: HttpClient) {
    super(http);
  }

  getTopResults(limit: number) {
    return this.http.get<Result[]>(`${this.apiBase}/${this.endpoint}/top/${limit}`);
  }
}
