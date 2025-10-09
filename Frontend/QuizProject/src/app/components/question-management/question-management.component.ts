import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-question-management',
  imports:[
    MatCard,
    MatCardTitle,
    MatList,
    MatListItem
  ],
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    // Uses service; falls back to mock if API is down
    this.questionService.getAll().subscribe(data => this.questions = data);
  }

  // For demonstration, deletion calls API; when using mock, operation won't persist
  deleteQuestion(id: number) {
    this.questionService.delete(id).subscribe(() => this.load());
  }
}
