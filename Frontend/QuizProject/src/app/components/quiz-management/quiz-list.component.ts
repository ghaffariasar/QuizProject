import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';

import { CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl:'quiz-list.component.html',
  styleUrls: ['quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  isLoading = false;

  constructor(private readonly quizService: QuizService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.isLoading = true;
    this.quizService.getAll().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ خطا در دریافت آزمون‌ها:', err);
        this.isLoading = false;
      }
    });
  }

  startQuiz(quizId: number): void {
    this.router.navigate(['/take-quiz', quizId]);
  }

  isExpired(quiz: Quiz): boolean {
    return new Date(quiz.expirationDate) < new Date();
  }
}
