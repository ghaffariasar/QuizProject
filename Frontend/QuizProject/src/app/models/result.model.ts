export interface Result {
  id: number;
  quizId: number;
  userName: string;
  score: number;
  passed: boolean;
  takenAt: string; // ISO string
}
