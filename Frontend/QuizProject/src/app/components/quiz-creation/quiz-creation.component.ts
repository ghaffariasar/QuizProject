import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  form: FormGroup;
  questions: Question[] = [];
  selected: number[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      durationMinutes: [30, Validators.required],
      expirationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAll(() => []).subscribe({
      next: data => this.questions = data,
      error: err => {
        console.error(err);
        this.questions = [];
      }
    });
  }

  toggleSelect(id: number): void {
    const idx = this.selected.indexOf(id);
    if (idx >= 0) {
      this.selected.splice(idx, 1);
    } else {
      this.selected.push(id);
    }
  }

  saveQuiz(): void {
    if (this.form.invalid) return;

    const quiz = {
      id: 0,
      title: this.form.value.title,
      durationMinutes: this.form.value.durationMinutes,
      expirationDate: this.form.value.expirationDate,
      questionIds: this.selected
    };

    // فرض می‌کنیم QuizService داشته باشیم
    // this.quizService.create(quiz).subscribe(...)
    console.log('Quiz to save:', quiz);
  }
}
