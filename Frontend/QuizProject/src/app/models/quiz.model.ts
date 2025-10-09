import { Question } from './question.model';

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  durationMinutes: number; // allowed time
  expirationDate: string; // ISO string
}
