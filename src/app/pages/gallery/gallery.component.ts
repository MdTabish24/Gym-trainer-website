import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { galleryItems } from '../../data/site-data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent {
  readonly images = galleryItems;
  activeIndex = 0;

  selectImage(index: number): void {
    this.activeIndex = index;
  }
}
