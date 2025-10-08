# 🧩 Full-Stack Project with ASP.NET Core 9 & Angular 18

This project is a **modern full-stack web application** built with
**ASP.NET Core 9** as the backend and **Angular 18** as the frontend.\
It demonstrates a clean architecture, reusable service patterns, and
responsive UI design with **Angular Material**.

------------------------------------------------------------------------

## 🚀 Technologies Used

### Backend

-   **ASP.NET Core 9**
-   **C# 12**
-   **Entity Framework Core (In-Memory Database)**
-   **RESTful API Design**
-   **Dependency Injection**
-   **Error Handling Middleware**

### Frontend

-   **Angular 18**
-   **TypeScript**
-   **Angular Material**
-   **Reactive Forms**
-   **Generic Service Pattern for API communication**
-   **Responsive UI Layout**

------------------------------------------------------------------------

## 🧠 Key Features

-   Separation of concerns between frontend and backend.
-   Centralized, reusable **Generic Service** in Angular to handle all
    API requests.
-   Fully responsive design using **Angular Material**.
-   In-memory database for fast testing and demo purposes.
-   Clean folder structure for scalability and readability.
-   Designed primarily for **learning, demonstration, and portfolio**
    use.

------------------------------------------------------------------------

## 🗂️ Project Structure

### Backend (`/Server`)

    Server/
    │
    ├── Controllers/
    │   └── QuestionsController.cs
    │
    ├── Models/
    │   └── [Question].cs
    │
    ├── Data/
    │   └── AppDbContext.cs
    │
    ├── Middleware/
    │   └── ErrorHandlerMiddleware.cs
    │
    └── Program.cs

### Frontend (`/Client`)

    Client/
    │
    ├── src/app/
    │   ├── services/
    │   │   └── baseService.ts
    │   ├── components/
    │   │   ├── [entity]-list/
    │   │   └── [entity]-form/
    │   ├── app.module.ts
    │   ├── app.component.ts
    │   └── app-routing.module.ts
    └── package.json

------------------------------------------------------------------------

## ⚙️ How to Run

### 1️⃣ Backend (ASP.NET Core)

``` bash
cd Server
dotnet run
```

Backend will start at: <https://localhost:7068>

### 2️⃣ Frontend (Angular)

``` bash
cd Client
npm install
ng serve
```

Frontend will start at: <http://localhost:4200>

------------------------------------------------------------------------

## 🧩 Generic Service Pattern (Angular)

A reusable **GenericService** handles all CRUD operations and API calls,
reducing boilerplate code and improving maintainability.

``` typescript
export class BaseService<T> {
  constructor(private http: HttpClient, private apiUrl: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: number, item: T): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

------------------------------------------------------------------------

## 📦 Future Improvements

-   Add authentication & authorization (JWT)
-   Integrate a persistent database (SQL Server or PostgreSQL)
-   Implement caching and state management
-   Add lazy loading for better performance

------------------------------------------------------------------------

## 🧑‍💻 Author

**Mohammad Ghaffari**\
Full-Stack Developer \| Software Architect \| System Analyst\
📧 \[ghaffariasar@gmail.com\]\
🔗 \[LinkedIn or GitHub Profile\]

------------------------------------------------------------------------

## 📄 License

This project is open source and available under the [MIT
License](LICENSE).
