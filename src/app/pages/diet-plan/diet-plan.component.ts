import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface DietScheduleItem {
  time: string;
  title: string;
  foods: string[];
}

interface DietPlanSummary {
  goalLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  bmi: string;
  schedule: DietScheduleItem[];
  notes: string[];
}

type DietType = 'vegetarian' | 'nonVegetarian' | 'vegan';
type GoalType = 'muscle' | 'fat-loss' | 'maintain' | 'stamina' | 'sports';

@Component({
  selector: 'app-diet-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './diet-plan.component.html',
})
export class DietPlanComponent {
  readonly goalLabels: Record<GoalType, string> = {
    muscle: 'Muscle Building',
    'fat-loss': 'Fat Loss',
    maintain: 'Maintain Weight',
    stamina: 'Stamina and Endurance',
    sports: 'Sports Training',
  };

  readonly activityLevels = [
    { label: 'Sedentary', value: 'sedentary' },
    { label: 'Lightly Active', value: 'light' },
    { label: 'Moderately Active', value: 'moderate' },
    { label: 'Active', value: 'active' },
    { label: 'Very Active', value: 'veryActive' },
  ];

  readonly dietTypes = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Non-Vegetarian', value: 'nonVegetarian' },
    { label: 'Vegan', value: 'vegan' },
  ];

  readonly dietForm = this.formBuilder.nonNullable.group({
    goal: ['', Validators.required],
    weight: ['', Validators.required],
    height: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    activityLevel: ['', Validators.required],
    dietType: ['', Validators.required],
    breakfastTime: ['08:00'],
    lunchTime: ['13:00'],
    dinnerTime: ['20:00'],
    snackTimes: ['11:00, 16:00'],
  });

  plan: DietPlanSummary | null = null;
  statusTone: 'success' | 'error' | 'info' = 'info';
  statusMessage = 'Fill the form and generate a simplified Angular diet plan preview.';

  constructor(private readonly formBuilder: FormBuilder) {}

  submit(): void {
    if (this.dietForm.invalid) {
      this.dietForm.markAllAsTouched();
      this.statusTone = 'error';
      this.statusMessage = 'Complete the required fields before generating the plan.';
      return;
    }

    const formValue = this.dietForm.getRawValue();
    const weight = Number(formValue.weight);
    const height = Number(formValue.height);
    const age = Number(formValue.age);
    const gender = formValue.gender;
    const activityLevel = formValue.activityLevel;
    const goal = formValue.goal as GoalType;
    const dietType = formValue.dietType as DietType;

    const bmr =
      gender === 'male'
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

    const activityMultiplier: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const adjustment: Record<GoalType, number> = {
      muscle: 300,
      'fat-loss': -450,
      maintain: 0,
      stamina: 200,
      sports: 350,
    };

    const calories = Math.round(bmr * activityMultiplier[activityLevel] + adjustment[goal]);
    const protein = Math.round((calories * (goal === 'fat-loss' ? 0.35 : 0.3)) / 4);
    const carbs = Math.round((calories * (goal === 'sports' || goal === 'stamina' ? 0.45 : 0.4)) / 4);
    const fats = Math.round((calories * 0.25) / 9);

    const mealLibrary: Record<DietType, string[]> = {
      vegetarian: ['Protein oats bowl', 'Paneer or tofu plate', 'Dal with rice', 'Greek yogurt or curd', 'Fruit and nuts'],
      nonVegetarian: ['Egg and toast combo', 'Chicken rice bowl', 'Fish or lean meat dinner', 'Greek yogurt snack', 'Fruit and nuts'],
      vegan: ['Chia oats bowl', 'Tofu quinoa plate', 'Lentil rice bowl', 'Smoothie snack', 'Fruit and nuts'],
    };

    const meals = mealLibrary[dietType];
    const snackTimes = formValue.snackTimes
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);

    const schedule: DietScheduleItem[] = [
      { time: formValue.breakfastTime, title: 'Breakfast', foods: [meals[0], meals[4]] },
      { time: snackTimes[0] || '11:00', title: 'Snack 1', foods: [meals[3]] },
      { time: formValue.lunchTime, title: 'Lunch', foods: [meals[1], meals[2]] },
      { time: snackTimes[1] || '16:00', title: 'Snack 2', foods: [meals[4]] },
      { time: formValue.dinnerTime, title: 'Dinner', foods: [meals[2], meals[1]] },
    ].sort((left, right) => left.time.localeCompare(right.time));

    this.plan = {
      goalLabel: this.goalLabels[goal],
      calories,
      protein,
      carbs,
      fats,
      bmi: (weight / Math.pow(height / 100, 2)).toFixed(1),
      schedule,
      notes: [
        'Keep hydration at roughly 3 to 4 liters through the day.',
        'Stay consistent with meal timing before chasing variety.',
        'Use the plan as a coaching preview, then adjust with progress updates.',
      ],
    };

    this.statusTone = 'success';
    this.statusMessage = 'Angular diet plan preview generated.';
  }
}
