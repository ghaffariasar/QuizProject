import { Component } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports:[MatToolbar,MatSlideToggle],
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
