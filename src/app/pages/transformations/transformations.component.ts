import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { timelineItems } from '../../data/site-data';

@Component({
  selector: 'app-transformations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transformations.component.html',
})
export class TransformationsComponent implements OnInit {
  readonly timelineItems = timelineItems;
  scrollProgress = 0;

  ngOnInit(): void {
    this.updateProgress();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateProgress(): void {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = documentHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / documentHeight)) : 0;
  }
}
