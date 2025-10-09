// app/app.routes.ts
import { Routes } from '@angular/router';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { QuizCreationComponent } from './components/quiz-creation/quiz-creation.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { ResultDashboardComponent } from './components/result-dashboard/result-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
  { path: 'questions', component: QuestionManagementComponent },
  { path: 'quizzes', component: QuizCreationComponent },
  { path: 'take-quiz/:id', component: TakeQuizComponent },
  { path: 'results', component: ResultDashboardComponent }
];