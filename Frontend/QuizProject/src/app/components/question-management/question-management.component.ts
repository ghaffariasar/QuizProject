import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionDialogComponent } from './question-dialog.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider, MatList, MatListItem } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  imports: [
    MatProgressBar,
    MatCard,
    MatCardTitle,
    MatList,
    MatListItem,
    NgClass,
    MatIcon,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatDivider
  ],
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent implements OnInit {
  questions: Question[] = [];
  isLoading = false;

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.questionService.getAll().subscribe({
      next: (data) => {
        this.questions = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('خطا در بارگذاری سؤالات', 'باشه', { duration: 3000 });
      },
    });
  }

  addQuestion(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '600px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.load();
    });
  }

  editQuestion(question: Question): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '600px',
      data: question,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.load();
    });
  }

  deleteQuestion(id: number): void {
    if (!confirm('آیا از حذف این سؤال اطمینان دارید؟')) return;

    this.questionService.delete(id).subscribe(() => {
      this.snackBar.open('سؤال حذف شد', 'باشه', { duration: 2000 });
      this.load();
    });
  }
}
