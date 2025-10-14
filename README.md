# 🧩 Full-Stack Quiz Project with ASP.NET Core 9 & Angular 20

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Angular Version](https://img.shields.io/badge/Angular-20-blue.svg)](https://angular.io/)  
[![.NET Version](https://img.shields.io/badge/.NET-9-green.svg)](https://dotnet.microsoft.com/)  

A **full-stack quiz application** built with **ASP.NET Core 9** backend and **Angular 20** frontend, demonstrating clean architecture, reusable **Generic Service** patterns, and responsive UI with **Angular Material**. Includes mock data fallback if API is unavailable.

---

## 📑 Table of Contents

- [Technologies Used](#-technologies-used)  
- [Key Features](#-key-features)  
- [Project Structure](#-project-structure)  
- [How to Run](#-how-to-run)  
- [Generic Service Pattern](#-generic-service-pattern-angular)  
- [Screenshots](#-screenshots)  
- [Future Improvements](#-future-improvements)  
- [Author](#-author)  
- [License](#-license)  

---

## 🚀 Technologies Used

### Backend

- ASP.NET Core 9
- C# 12
- Entity Framework Core (In-Memory Database)
- RESTful API Design
- Controllers for Questions, Quizzes, Results
- Dependency Injection
- Error Handling Middleware

### Frontend

- Angular 20
- TypeScript
- Angular Material
- Reactive Forms
- Standalone Components
- Generic Service Pattern with Mock Data Fallback
- Responsive UI Layout
- Dark / Light Theme Toggle

---

## 🧠 Key Features

- Clear separation between frontend and backend
- Centralized **Generic Service** for API communication
- Endpoints defined inside services; components never send URLs
- Mock data fallback if API fails
- Quiz management: create, update, delete questions & answers
- Quiz creation: select questions, set duration & expiration
- Users can take quizzes and see results
- Result dashboard with top scores
- Responsive design with Angular Material
- Clean folder structure for scalability and readability
- Designed for **learning, demonstration, and portfolio** use

---

## 🗂️ Project Structure

### Backend (`/Backend`)

```
Backend/
│
├── Controllers/
│   ├── QuestionsController.cs
│   ├── QuizzesController.cs
│   └── ResultsController.cs
│
├── Models/
│   ├── Question.cs
│   ├── Answer.cs
│   ├── Quiz.cs
│   └── Result.cs
│
├── Data/
│   └── QuizContext.cs
│
├── Middleware/
│   └── ErrorHandlerMiddleware.cs
│
└── Program.cs
```

### Frontend (`/Frontend`)

```
Frontend/
│
├── src/app/
│   ├── services/
│   │   ├── generic.service.ts
│   │   ├── question.service.ts
│   │   ├── quiz.service.ts
│   │   └── result.service.ts
│   │
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.scss
│   │   │   └── navbar.component.ts
│   │   │
│   │   ├── question-management/
│   │   │   ├── question-dialog.component.css
│   │   │   ├── question-dialog.component.html
│   │   │   ├── question-dialog.component.ts
│   │   │   ├── question-management.component.html
│   │   │   ├── question-management.component.scss
│   │   │   └── question-management.component.ts
│   │   │
│   │   ├── quiz-creation/
│   │   │   ├── quiz-creation.component.html
│   │   │   ├── quiz-creation.component.scss
│   │   │   └── quiz-creation.component.ts
│   │   │
│   │   ├── quiz-management/
│   │   │   ├── quiz-list.component.css
│   │   │   ├── quiz-list.component.html
│   │   │   └── quiz-list.component.ts
│   │   │
│   │   ├── result-dashboard/
│   │   │   ├── result-dashboard.component.html
│   │   │   ├── result-dashboard.component.scss
│   │   │   └── result-dashboard.component.ts
│   │   │
│   │   └── take-quiz/
│   │       ├── take-quiz.component.html
│   │       ├── take-quiz.component.scss
│   │       └── take-quiz.component.ts
│   │
│   ├── models/
│   │   ├── question.model.ts
│   │   ├── answer.model.ts
│   │   ├── quiz.model.ts
│   │   └── result.model.ts
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── main.ts
│
└── package.json

```

---

## ⚙️ How to Run

### Backend

```bash
cd Backend\QuizProject
dotnet run
```

Backend will run at: <https://localhost:7068>

### Frontend

```bash
cd Frontend\QuizProject
npm install
ng serve
```

Frontend will run at: <http://localhost:4200>

---

## 🧩 Generic Service Pattern (Angular)

Reusable **GenericService** handles CRUD operations.  
Endpoints are **defined inside services**, not passed from components.

```typescript
@Injectable({ providedIn: 'root' })
export class QuestionService extends GenericService<Question> {
  protected override endpoint = 'questions';
}
```

Usage in components:

```typescript
this.questionService.getAllWithAnswers().subscribe(questions => {
  this.questions = questions;
});
```

---

## 📦 Future Improvements

- Authentication & Authorization (JWT)
- Persistent Database (SQL Server or PostgreSQL)
- Caching & State Management
- Lazy Loading & Performance Optimization
- Dark / Light Theme Toggle

---

## 🧑‍💻 Author

**Mohammad Ghaffari**  
Full-Stack Developer | Software Architect | System Analyst  
📧 ghaffariasar@gmail.com  
🔗 [GitHub](https://github.com/Ghaffariasar)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

