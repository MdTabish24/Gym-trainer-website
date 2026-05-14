import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { navItems, siteName } from '../data/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly siteName = siteName;
  readonly quickLinks = navItems.filter((item) => item.path !== '/');
  readonly services = ['Personal Training', 'Online Coaching', 'Nutrition Coaching', 'Group Sessions'];
  readonly socials = [
    { label: 'Instagram', href: 'https://www.instagram.com/maxzlifts?igsh=MThhbXVncnd1anRuNQ%3D%3D&utm_source=qr', short: 'IG' },
    { label: 'WhatsApp', href: 'https://wa.me/917666987232', short: 'WA' },
    { label: 'Book Now', href: '/contact', short: 'CT' },
  ];
}
