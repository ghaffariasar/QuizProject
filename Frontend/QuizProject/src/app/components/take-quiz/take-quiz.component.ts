import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { ResultService } from '../../services/result.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Quiz } from '../../models/quiz.model';
import { Result } from '../../models/result.model';
import { Subscription, interval } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [ FormsModule, MatCard, MatCardTitle, MatRadioGroup, MatRadioButton, MatProgressBar],

  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  quiz!: Quiz;
  answers: { [key: number]: number } = {};
  timeLeft = 0;
  displayTime  = '';

  progress = 0;
  isSubmitted = false;
  private timerSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private resultService: ResultService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getById(quizId).subscribe({
      next: (quiz) => {
        this.quiz = quiz;
        this.startTimer(quiz.durationMinutes);
      },
      error: (err) => console.error('خطا در بارگذاری آزمون:', err)
    });
  }

  startTimer(durationInMinutes: number) {
    // Minute to second
    const durationInSeconds = durationInMinutes * 60;
    this.timeLeft = durationInSeconds;
  
    this.timerSub = interval(1000).subscribe(() => {
      this.timeLeft--;
  
      // Quiz progress percentage
      this.progress = 100 - (this.timeLeft / durationInSeconds) * 100;
  
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      this.displayTime = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  
      if (this.timeLeft <= 0) {
        this.timerSub?.unsubscribe();
        if (!this.isSubmitted) this.submitQuiz();
      }
    });
  }

  

  selectAnswer(questionId: number, answerId: number) {
    this.answers[questionId] = answerId;
  }

  submitQuiz() {
    if (this.isSubmitted || !this.quiz) return;

    this.isSubmitted = true;
    this.timerSub?.unsubscribe();

    let correct = 0;
    this.quiz.questions.forEach(q => {
      const selected = this.answers[q.id];
      const ans = q.answers.find(a => a.id === selected);
      if (ans?.isCorrect) 
        correct++;
    });

    const score = Math.round((correct / this.quiz.questions.length) * 100);
    const passed = score >= 50;

    // ✅ Make Result Object
    const result: Result = {
      id: 0,
      quizId: this.quiz.id,
      userName: 'کاربر نمونه',
      score,
      takenAt: new Date().toISOString(),
      passed
    };

    this.resultService.create(result).subscribe({
      next: () => {
        this.snackBar.open(
          `آزمون پایان یافت. نمره شما: ${score}% - ${passed ? 'قبول شدید ✅' : 'رد شدید ❌'}`,
          'باشه',
          { duration: 5000, panelClass: [passed ? 'snackbar-success' : 'snackbar-error'] }
        );

        setTimeout(() => this.router.navigate(['/results']), 3000);
      },
      error: (err) => {
        console.error('خطا در ثبت نتیجه:', err);
        this.snackBar.open('خطا در ثبت نتیجه آزمون', 'باشه', { duration: 5000 });
        this.isSubmitted = false;
      }
    });
  }

  
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}
