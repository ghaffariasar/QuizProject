import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports:[MatToolbar,MatSlideToggle,RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // simple theme switch - persists in localStorage
  isDark = localStorage.getItem('theme') === 'dark';

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', this.isDark);
  }

  constructor() {
    // apply theme on load
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    }
  }
}
