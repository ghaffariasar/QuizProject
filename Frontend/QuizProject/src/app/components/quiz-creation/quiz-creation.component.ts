import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../services/question.service';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';
import { Quiz } from '../../models/quiz.model';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

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
    MatButtonModule,
    MatProgressBar,
    MatCard,
    MatIcon
  ],
  templateUrl: 'quiz-creation.component.html',
  styleUrls: ['quiz-creation.component.scss']
})
export class QuizCreationComponent implements OnInit {
  form: FormGroup;
  questions: Question[] = [];
  selected: number[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private quizService: QuizService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
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
    this.isLoading = true;
    this.questionService.getAll().subscribe({
      next: data => {
        this.questions = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('❌ خطا در دریافت سوالات:', err);
        this.questions = [];
        this.isLoading = false;
      }
    });
  }

  toggleSelect(id: number): void {
    const idx = this.selected.indexOf(id);
    
    if (idx >= 0) 
      this.selected.splice(idx, 1);
    else 
    this.selected.push(id);
  }

  saveQuiz(): void {
    if (this.form.invalid || this.selected.length === 0) {
      this.snackBar.open('لطفاً تمام فیلدها و سوالات را انتخاب کنید.', 'باشه', { duration: 3000 });
      return;
    }
  
    const selectedQuestions = this.questions.filter(q => this.selected.includes(q.id));
 
    const quiz: Quiz = {
      id: 0,
      title: this.form.value.title,
      durationMinutes: this.form.value.durationMinutes,
      expirationDate: this.form.value.expirationDate,
      questions: selectedQuestions
    };
  
    this.quizService.create(quiz).subscribe({
      next: () => {
        this.snackBar.open('آزمون با موفقیت ذخیره شد!', 'باشه', { duration: 3000 });
        this.form.reset({ durationMinutes: 30 });
        this.selected = [];
      },
      error: err => {
        console.error('❌ خطا در ذخیره آزمون:', err);
        this.snackBar.open('خطا در ذخیره آزمون', 'باشه', { duration: 3000 });
      }
    });
  }

  cancel() {
    this.router.navigate(['/quizzes']);
  }

}
