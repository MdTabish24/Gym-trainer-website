import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navItems, siteName } from '../data/site-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly navItems = navItems;
  readonly siteName = siteName;

  isMenuOpen = false;
  isHidden = false;

  private lastScrollPosition = 0;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentPosition = window.scrollY || 0;
    this.isHidden = currentPosition > this.lastScrollPosition && currentPosition > 160;
    this.lastScrollPosition = currentPosition;
  }
}
