import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { homeFeatures, transformationStats } from '../../data/site-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly features = homeFeatures;
  readonly stats = transformationStats;

  @ViewChild('comparisonArea') comparisonArea?: ElementRef<HTMLElement>;

  comparisonValue = 50;
  private dragging = false;

  get comparisonClipPath(): string {
    return `inset(0 ${100 - this.comparisonValue}% 0 0)`;
  }

  startComparisonDrag(event: MouseEvent | TouchEvent): void {
    this.dragging = true;
    this.updateComparisonValue(event);
    event.preventDefault();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.dragging) {
      this.updateComparisonValue(event);
    }
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.dragging) {
      this.updateComparisonValue(event);
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopComparisonDrag(): void {
    this.dragging = false;
  }

  private updateComparisonValue(event: MouseEvent | TouchEvent): void {
    const area = this.comparisonArea?.nativeElement;
    if (!area) {
      return;
    }

    const point = 'touches' in event ? event.touches[0] : event;
    if (!point) {
      return;
    }

    const bounds = area.getBoundingClientRect();
    const nextValue = ((point.clientX - bounds.left) / bounds.width) * 100;
    this.comparisonValue = Math.min(100, Math.max(0, nextValue));
  }
}
