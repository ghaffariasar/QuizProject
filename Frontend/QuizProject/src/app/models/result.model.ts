export interface Result {
  id: number;
  quizId: number;
  userId: string;
  score: number;
  passed: boolean;
  date: string; // ISO string
}
