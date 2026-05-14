import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Certification, certifications } from '../../data/site-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly certifications = certifications;
  selectedCertification: Certification | null = null;

  openCertification(certification: Certification): void {
    this.selectedCertification = certification;
  }

  closeCertification(): void {
    this.selectedCertification = null;
  }
}
