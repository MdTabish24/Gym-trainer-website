import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Maaz Momin | Angular Fitness Coach',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    title: 'About | Maaz Momin',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'services',
    title: 'Services | Maaz Momin',
    loadComponent: () => import('./pages/services/services.component').then((m) => m.ServicesComponent),
  },
  {
    path: 'diet-plan',
    title: 'Diet Plan | Maaz Momin',
    loadComponent: () => import('./pages/diet-plan/diet-plan.component').then((m) => m.DietPlanComponent),
  },
  {
    path: 'workout-plan',
    title: 'Workout Plan | Maaz Momin',
    loadComponent: () => import('./pages/workout-plan/workout-plan.component').then((m) => m.WorkoutPlanComponent),
  },
  {
    path: 'transformations',
    title: 'Transformations | Maaz Momin',
    loadComponent: () =>
      import('./pages/transformations/transformations.component').then((m) => m.TransformationsComponent),
  },
  {
    path: 'gallery',
    title: 'Gallery | Maaz Momin',
    loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
  },
  {
    path: 'contact',
    title: 'Contact | Maaz Momin',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
