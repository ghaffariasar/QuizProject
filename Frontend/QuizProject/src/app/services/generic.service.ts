// src/app/services/generic.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export abstract  class GenericService<T> {
  protected apiBase = environment.apiUrl;
  protected abstract endpoint: string;

  constructor(protected http: HttpClient) {}

  getAll(mockProvider?: () => T[]): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiBase}/${this.endpoint}`).pipe(
      catchError(err => mockProvider ? of(mockProvider()) : throwError(() => err))
    );
  }

  getById(id: number, mockProvider?: () => T): Observable<T> {
    return this.http.get<T>(`${this.apiBase}/${this.endpoint}/${id}`).pipe(
      catchError(err => mockProvider ? of(mockProvider()) : throwError(() => err))
    );
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiBase}/${this.endpoint}`, item);
  }

  update(id: number, item: T): Observable<void> {
    return this.http.put<void>(`${this.apiBase}/${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${this.endpoint}/${id}`);
  }
}
