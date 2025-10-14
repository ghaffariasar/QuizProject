import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { Result } from '../../models/result.model';
import { MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-result-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule,  MatListModule, MatIcon , MatProgressBar],
  templateUrl: './result-dashboard.component.html',
  styleUrls: ['./result-dashboard.component.scss']
})
export class ResultDashboardComponent implements OnInit {
  results: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.resultService.getAll(() => [])
    .pipe(
      tap(data => this.results = data),
      catchError(err => {
        console.error(err); 
        return of([]);
      })
    ).subscribe();
  }
}
