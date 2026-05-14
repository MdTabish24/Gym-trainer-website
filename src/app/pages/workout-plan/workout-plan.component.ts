import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  title: string;
  exercises: WorkoutExercise[];
}

interface WorkoutPlanSummary {
  overview: string;
  weeklyVolume: string;
  days: WorkoutDay[];
  tips: string[];
}

type GoalType = 'muscle' | 'fat-loss' | 'strength' | 'endurance';

@Component({
  selector: 'app-workout-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout-plan.component.html',
})
export class WorkoutPlanComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly workoutForm = this.formBuilder.nonNullable.group({
    goal: ['', Validators.required],
    experience: ['', Validators.required],
    daysPerWeek: ['', Validators.required],
    timePerSession: ['', Validators.required],
    equipment: ['', Validators.required],
    bodyFocus: [''],
    injuries: [''],
  });

  readonly goalOptions = [
    { label: 'Muscle Building', value: 'muscle' },
    { label: 'Fat Loss', value: 'fat-loss' },
    { label: 'Strength', value: 'strength' },
    { label: 'Endurance', value: 'endurance' },
  ];

  plan: WorkoutPlanSummary | null = null;
  statusTone: 'success' | 'error' | 'info' = 'info';
  statusMessage = 'Generate a simplified Angular workout preview from the form below.';

  submit(): void {
    if (this.workoutForm.invalid) {
      this.workoutForm.markAllAsTouched();
      this.statusTone = 'error';
      this.statusMessage = 'Complete the required workout fields before generating the plan.';
      return;
    }

    const data = this.workoutForm.getRawValue();
    const goal = data.goal as GoalType;
    const days = Number(data.daysPerWeek);
    const sessionMinutes = Number(data.timePerSession);
    const focus = data.bodyFocus || 'balanced';
    const equipment = data.equipment;

    const exercisePools: Record<string, string[]> = {
      bodyweight: ['Push-ups', 'Split Squats', 'Plank Hold', 'Pull-up Variation', 'Lunges', 'Mountain Climbers'],
      dumbbells: ['DB Press', 'Goblet Squat', 'Romanian Deadlift', 'Single Arm Row', 'Lateral Raise', 'Farmer Carry'],
      'home-gym': ['Barbell Squat', 'Bench Press', 'Row Variation', 'Hip Hinge', 'Overhead Press', 'Core Finisher'],
      'full-gym': ['Back Squat', 'Bench Press', 'Cable Row', 'Lat Pulldown', 'Leg Press', 'Conditioning Finisher'],
    };

    const repScheme: Record<GoalType, string> = {
      muscle: '8-12',
      'fat-loss': '12-15',
      strength: '4-6',
      endurance: '12-20',
    };

    const restScheme: Record<GoalType, string> = {
      muscle: '75s',
      'fat-loss': '45s',
      strength: '120s',
      endurance: '60s',
    };

    const basePool = exercisePools[equipment] || exercisePools['bodyweight'];
    const exercisesPerDay = sessionMinutes >= 60 ? 5 : sessionMinutes >= 45 ? 4 : 3;

    const daysPlan: WorkoutDay[] = Array.from({ length: days }, (_, index) => {
      const rotated = [...basePool.slice(index), ...basePool.slice(0, index)].slice(0, exercisesPerDay);
      return {
        title: `Day ${index + 1} - ${focus === 'balanced' ? 'Balanced Session' : `${focus} Focus`}`,
        exercises: rotated.map((name) => ({
          name,
          sets: goal === 'strength' ? '4' : '3',
          reps: repScheme[goal],
          rest: restScheme[goal],
        })),
      };
    });

    this.plan = {
      overview: `${data.experience} level plan for ${goal.replace('-', ' ')} with ${equipment.replace('-', ' ')} access.`,
      weeklyVolume: `${days} days x ${sessionMinutes} min = ${days * sessionMinutes} min / week`,
      days: daysPlan,
      tips: [
        'Warm up before each session and keep the first working sets controlled.',
        'Track one simple progression marker every week: reps, load, or session quality.',
        data.injuries ? `Use injury note while adjusting exercises: ${data.injuries}` : 'Swap any painful movement for a close variation.',
      ],
    };

    this.statusTone = 'success';
    this.statusMessage = 'Angular workout plan preview generated.';
  }
}
