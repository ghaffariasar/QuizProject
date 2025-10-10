import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-question-form-dialog',
  templateUrl: 'question-dialog.component.html',
  styleUrl: 'question-dialog.component.css',
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatCheckbox,
    MatDialogActions,
    ReactiveFormsModule
  ]
})
export class QuestionDialogComponent {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question | null) 
    {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      id: [data?.id || 0],
      text: [data?.text || '', Validators.required],
      answers: this.fb.array(
        data?.answers?.map(a => this.createAnswerGroup(a.text, a.isCorrect, a.questionId)) || 
        [this.createAnswerGroup(), this.createAnswerGroup(), this.createAnswerGroup(), this.createAnswerGroup()]
      )
    });
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  createAnswerGroup(text = '', isCorrect = false, questionId = 0): FormGroup {
  //  const question = this.form.value as Question;
    return this.fb.group({
      text: [text, Validators.required],
      isCorrect: [isCorrect],
      questionId: this.isEditMode ? questionId : 0
    });
  }

  submit(): void 
  {
    debugger;
    const question = this.form.value as Question;
    const obs = this.isEditMode
      ? this.questionService.update(question.id, question)
      : this.questionService.create(question);

    obs.subscribe(() => this.dialogRef.close(true));
   
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
