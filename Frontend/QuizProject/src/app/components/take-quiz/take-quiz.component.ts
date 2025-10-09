import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { GenericService } from '../../services/generic.service';
import { Question } from '../../models/question.model';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-take-quiz',
  imports:[
    MatCard,
    MatCardTitle,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {
  quiz: Quiz | null = null;
  answers: { [questionId: number]: number } = {};
  remainingSeconds = 0;
  timerRef: any;

  constructor( private route: ActivatedRoute,private router: Router,private quizService: QuizService, private generic: GenericService<any>
  ) { 

  
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // try to get quiz from API, fallback to mock using generic
    this.generic.getById(id, () => MOCK_QUIZ).subscribe(q => {
      this.quiz = q as Quiz;
      this.startTimer();
    }, err => {
      // if both fail, user will not see quiz
    });
  }

  startTimer() {
    if (!this.quiz) return;
    this.remainingSeconds = (this.quiz.durationMinutes || 0) * 60;
    this.timerRef = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds <= 0) {
        clearInterval(this.timerRef);
        this.submit();
      }
    }, 1000);
  }

  selectAnswer(question: Question, answerId: number) {
    this.answers[question.id] = answerId;
  }

  submit() {
    if (!this.quiz) return;
    // compute score locally for demo
    let correct = 0;
    this.quiz.questions.forEach(q => {
      const selected = this.answers[q.id];
      const ans = q.answers.find(a => a.id === selected);
      if (ans && ans.isCorrect) correct++;
    });
    const score = Math.round((correct / this.quiz.questions.length) * 100);
    // in a real app you would POST the result to API
    alert('Finished. Score: ' + score + '%');
    this.router.navigate(['/results']);
  }
}

// Mock quiz used when API is not available
const MOCK_QUIZ: Quiz = {
  id: 1,
  title: 'Demo Quiz',
  durationMinutes: 1,
  expirationDate: new Date().toISOString(),
  questions: [
    {
      id: 1, text: 'What is 2+2?', answers: [
        { id: 1, text: '3', isCorrect: false, questionId: 1 },
        { id: 2, text: '4', isCorrect: true, questionId: 1 }
      ]
    }
  ]
};
