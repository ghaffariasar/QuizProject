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
  isRtl = localStorage.getItem('direction') === 'rtl';

  toggleDirection() {
    this.isRtl = !this.isRtl;
    let direction =  this.isRtl ? 'rtl' : 'ltr';
    localStorage.setItem('direction',direction);
    document.documentElement.setAttribute('dir', direction);

  }

  constructor() {
    
  }
}
