import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: 'app.html'
})
export class AppComponent {

    protected readonly title = signal('QuizProject');

}
