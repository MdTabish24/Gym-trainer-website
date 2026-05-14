import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly goals = [
    { label: 'Muscle Building', value: 'muscle' },
    { label: 'Fat Loss', value: 'fat-loss' },
    { label: 'Maintain Weight', value: 'maintain' },
    { label: 'Stamina and Endurance', value: 'stamina' },
    { label: 'Sports Training', value: 'sports' },
  ];

  readonly contactForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    age: ['', Validators.required],
    goal: ['', Validators.required],
    message: [''],
  });

  statusTone: 'success' | 'error' | 'info' = 'info';
  statusMessage = 'Send your details and the Angular contact page will open WhatsApp with a prefilled message.';

  constructor(private readonly formBuilder: FormBuilder) {}

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.statusTone = 'error';
      this.statusMessage = 'Fill the required contact fields before opening WhatsApp.';
      return;
    }

    const data = this.contactForm.getRawValue();
    const message = [
      'Hi Maaz, I want to discuss coaching.',
      '',
      `Name: ${data.firstName} ${data.lastName}`,
      `Phone: ${data.phone}`,
      `Age: ${data.age}`,
      `Goal: ${data.goal}`,
      `Message: ${data.message || 'No extra note'}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/917666987232?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    this.statusTone = 'success';
    this.statusMessage = 'WhatsApp opened with your prefilled message.';
  }
}
