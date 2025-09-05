import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';

const WorkoutPlanPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    goal: '',
    experience: '',
    daysPerWeek: '',
    timePerSession: '',
    equipment: '',
    injuries: '',
    preferredTime: '',
    bodyFocus: ''
  });
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const handleInputChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    setWorkoutPlan(null);
    
    // Auto-generate if all required fields are filled
    if (newFormData.goal && newFormData.experience && newFormData.daysPerWeek && newFormData.timePerSession && newFormData.equipment) {
      setTimeout(() => {
        console.log('Auto-generating plan with:', newFormData);
        generateWorkoutPlanDirect(newFormData);
      }, 300);
    }
  };

  const generateWorkoutPlanDirect = (data) => {
    setLoading(true);
    
    setTimeout(() => {
      const { goal, experience, daysPerWeek, timePerSession, equipment, bodyFocus, injuries } = data;
      
      const getWorkoutPlan = (goal, experience, days, time, equipment, focus, injuries) => {
        // Dynamic plan generation based on all inputs
        const getIntensity = (experience) => {
          return {
            beginner: { sets: [2,3], reps: [8,15], rest: [45,90] },
            intermediate: { sets: [3,4], reps: [6,12], rest: [60,120] },
            advanced: { sets: [4,5], reps: [4,10], rest: [90,180] }
          }[experience];
        };
        
        const intensity = getIntensity(experience);
        const timeMultiplier = time <= 30 ? 0.7 : time <= 45 ? 0.85 : time <= 60 ? 1.0 : 1.2;
        const adjustedSets = Math.round(intensity.sets[1] * timeMultiplier);
        
        // Dynamic exercise database based on equipment and goal
        const exerciseDatabase = {
          bodyweight: {
            push: goal === 'strength' ? ["Handstand Push-ups", "Archer Push-ups", "One-Arm Push-ups", "Pike Push-ups", "Diamond Push-ups"] :
                  goal === 'fat-loss' ? ["Burpees", "Jump Push-ups", "Mountain Climbers", "Push-up Jacks", "Explosive Push-ups"] :
                  ["Push-ups", "Incline Push-ups", "Decline Push-ups", "Wide Push-ups", "Tricep Dips"],
            pull: goal === 'strength' ? ["Weighted Pull-ups", "One-Arm Pull-ups", "Muscle-ups", "Archer Pull-ups", "Commando Pull-ups"] :
                  goal === 'fat-loss' ? ["Jump Pull-ups", "Burpee Pull-ups", "High Pulls", "Fast Pull-ups", "Pull-up Intervals"] :
                  ["Pull-ups", "Chin-ups", "Negative Pull-ups", "Assisted Pull-ups", "Inverted Rows"],
            legs: goal === 'strength' ? ["Pistol Squats", "Shrimp Squats", "Jump Squats", "Single Leg Deadlifts", "Bulgarian Split Squats"] :
                  goal === 'fat-loss' ? ["Jump Squats", "Squat Thrusts", "Jumping Lunges", "High Knees", "Burpee Squats"] :
                  ["Squats", "Lunges", "Wall Sits", "Step-ups", "Calf Raises"],
            core: goal === 'strength' ? ["Human Flag", "Dragon Flag", "L-Sit", "Planche Hold", "Front Lever"] :
                  goal === 'fat-loss' ? ["Mountain Climbers", "Burpees", "High Knees", "Jumping Jacks", "Sprint Intervals"] :
                  ["Plank", "Side Plank", "Dead Bug", "Bird Dog", "Hollow Hold"]
          },
          dumbbells: {
            push: goal === 'strength' ? ["Heavy DB Press", "Single Arm Press", "DB Bench Press", "Arnold Press", "Heavy Tricep Press"] :
                  goal === 'fat-loss' ? ["DB Thrusters", "DB Burpees", "DB Swings", "DB Circuits", "Fast DB Press"] :
                  ["Dumbbell Press", "Shoulder Press", "Chest Press", "Tricep Extensions", "Lateral Raises"],
            pull: goal === 'strength' ? ["Heavy DB Rows", "Single Arm Rows", "DB Deadlifts", "Heavy Curls", "DB Pullovers"] :
                  goal === 'fat-loss' ? ["DB Row Circuits", "DB High Pulls", "Fast Curls", "DB Renegade Rows", "DB Swings"] :
                  ["Dumbbell Rows", "Bicep Curls", "Hammer Curls", "Reverse Flyes", "Shrugs"],
            legs: goal === 'strength' ? ["Heavy Goblet Squats", "Single Leg RDL", "DB Lunges", "Heavy Step-ups", "DB Deadlifts"] :
                  goal === 'fat-loss' ? ["DB Thrusters", "DB Jump Squats", "DB Lunges", "DB Step-ups", "DB Swings"] :
                  ["Goblet Squats", "Romanian Deadlifts", "Lunges", "Step-ups", "Calf Raises"],
            core: goal === 'strength' ? ["Weighted Planks", "DB Russian Twists", "Heavy Side Bends", "DB Woodchoppers", "Weighted Crunches"] :
                  goal === 'fat-loss' ? ["DB Thrusters", "DB Mountain Climbers", "Fast Russian Twists", "DB Burpees", "Core Circuits"] :
                  ["Russian Twists", "Weighted Crunches", "Side Bends", "Woodchoppers", "Plank"]
          },
          'full-gym': {
            push: goal === 'strength' ? ["Heavy Bench Press", "Weighted Dips", "Heavy OHP", "Close-Grip Bench", "Board Press"] :
                  goal === 'fat-loss' ? ["Circuit Bench", "Superset Push", "High Rep Press", "Push Circuits", "Cardio Push"] :
                  ["Bench Press", "Incline Press", "Overhead Press", "Dips", "Cable Flyes"],
            pull: goal === 'strength' ? ["Heavy Deadlifts", "Weighted Pull-ups", "Heavy Rows", "Rack Pulls", "Power Cleans"] :
                  goal === 'fat-loss' ? ["Circuit Pulls", "High Rep Rows", "Pull Circuits", "Cardio Pulls", "Superset Back"] :
                  ["Deadlifts", "Pull-ups", "Barbell Rows", "Lat Pulldowns", "Cable Rows"],
            legs: goal === 'strength' ? ["Heavy Squats", "Heavy Deadlifts", "Front Squats", "Hip Thrusts", "Leg Press"] :
                  goal === 'fat-loss' ? ["Squat Circuits", "Leg Supersets", "High Rep Legs", "Cardio Legs", "Leg Intervals"] :
                  ["Squats", "Leg Press", "Romanian Deadlifts", "Leg Curls", "Leg Extensions"],
            core: goal === 'strength' ? ["Weighted Planks", "Heavy Cable Crunches", "Hanging Leg Raises", "Ab Wheel", "Dragon Flags"] :
                  goal === 'fat-loss' ? ["Core Circuits", "Ab Intervals", "High Rep Core", "Cardio Core", "Core Supersets"] :
                  ["Cable Crunches", "Hanging Leg Raises", "Ab Wheel", "Cable Woodchoppers", "Plank"]
          },
          'home-gym': {
            push: goal === 'strength' ? ["Barbell Bench", "Heavy OHP", "Weighted Dips", "Close-Grip Press", "Push Press"] :
                  goal === 'fat-loss' ? ["Push Circuits", "Barbell Thrusters", "High Rep Press", "Push Supersets", "Cardio Push"] :
                  ["Barbell Press", "Dumbbell Press", "Push-ups", "Overhead Press", "Tricep Press"],
            pull: goal === 'strength' ? ["Heavy Deadlifts", "Barbell Rows", "Weighted Chins", "Power Cleans", "Heavy Curls"] :
                  goal === 'fat-loss' ? ["Pull Circuits", "High Rep Pulls", "Row Intervals", "Pull Supersets", "Cardio Pulls"] :
                  ["Barbell Rows", "Pull-ups", "Deadlifts", "Barbell Curls", "Reverse Flyes"],
            legs: goal === 'strength' ? ["Heavy Squats", "Barbell Lunges", "Romanian DL", "Front Squats", "Hip Thrusts"] :
                  goal === 'fat-loss' ? ["Squat Circuits", "Lunge Intervals", "High Rep Legs", "Leg Supersets", "Cardio Legs"] :
                  ["Barbell Squats", "Lunges", "Romanian Deadlifts", "Step-ups", "Calf Raises"],
            core: goal === 'strength' ? ["Weighted Planks", "Barbell Rollouts", "Heavy Russian Twists", "L-Sits", "Dragon Flags"] :
                  goal === 'fat-loss' ? ["Core Circuits", "Ab Intervals", "High Rep Core", "Core Supersets", "Cardio Core"] :
                  ["Plank Variations", "Russian Twists", "Dead Bug", "Mountain Climbers", "Bicycle Crunches"]
          }
        };
        
        const getExercises = (type, count) => {
          const available = exerciseDatabase[equipment] || exerciseDatabase.bodyweight;
          const exercises = available[type] || [];
          // Shuffle and select for variety
          const shuffled = exercises.sort(() => Math.random() - 0.5);
          return shuffled.slice(0, count);
        };
        
        const generateDay = (focus, exerciseCount) => {
          let exercises = [];
          const baseReps = goal === 'strength' ? '3-6' : goal === 'muscle' ? '8-12' : '12-20';
          const baseRest = goal === 'strength' ? '3min' : goal === 'muscle' ? '90s' : '60s';
          
          if (focus === 'upper') {
            exercises = [
              ...getExercises('push', Math.ceil(exerciseCount/2)).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus - ${experience} level`
              })),
              ...getExercises('pull', Math.floor(exerciseCount/2)).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus - ${experience} level`
              }))
            ];
          } else if (focus === 'lower') {
            exercises = [
              ...getExercises('legs', exerciseCount-1).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus - ${experience} level`
              })),
              ...getExercises('core', 1).map(ex => ({
                name: ex, sets: (adjustedSets-1).toString(), reps: baseReps, rest: '45s',
                notes: 'Core stability'
              }))
            ];
          } else {
            exercises = [
              ...getExercises('push', 1).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus`
              })),
              ...getExercises('pull', 1).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus`
              })),
              ...getExercises('legs', 1).map(ex => ({
                name: ex, sets: adjustedSets.toString(), reps: baseReps, rest: baseRest,
                notes: `${goal} focus`
              })),
              ...getExercises('core', 1).map(ex => ({
                name: ex, sets: (adjustedSets-1).toString(), reps: baseReps, rest: '45s',
                notes: 'Core stability'
              }))
            ];
          }
          
          // Modify for injuries
          if (injuries && injuries.toLowerCase().includes('back')) {
            exercises = exercises.filter(ex => !ex.name.toLowerCase().includes('deadlift'));
          }
          if (injuries && injuries.toLowerCase().includes('knee')) {
            exercises = exercises.filter(ex => !ex.name.toLowerCase().includes('squat') && !ex.name.toLowerCase().includes('lunge'));
          }
          
          return exercises.slice(0, exerciseCount);
        };
        
        const plans = {};
        const exercisesPerDay = time <= 30 ? 3 : time <= 45 ? 4 : time <= 60 ? 5 : 6;
        
        for (let i = 1; i <= days; i++) {
          const dayFocus = i % 3 === 1 ? 'upper' : i % 3 === 2 ? 'lower' : 'full';
          const actualFocus = focus || dayFocus;
          
          plans[`day${i}`] = {
            name: `Day ${i}: ${actualFocus === 'upper' ? 'Upper Body' : actualFocus === 'lower' ? 'Lower Body' : 'Full Body'} - ${goal.charAt(0).toUpperCase() + goal.slice(1)}`,
            exercises: generateDay(actualFocus, exercisesPerDay)
          };
        }
        
        return plans;
      };

      const plan = getWorkoutPlan(goal, experience, parseInt(daysPerWeek), parseInt(timePerSession), equipment, bodyFocus, injuries);
      
      const tips = {
        muscle: [
          `Progressive overload: Increase weight by 2.5-5lbs weekly for ${experience}s`,
          `Rest ${experience === 'beginner' ? '48-72' : '24-48'} hours between same muscle groups`,
          `${equipment === 'bodyweight' ? 'Increase reps/sets' : 'Add weight'} for progression`,
          `Target ${experience === 'beginner' ? '0.5-1lb' : '1-2lbs'} weight gain per week`
        ],
        'fat-loss': [
          `Combine ${daysPerWeek} strength days with 2-3 cardio sessions`,
          `Keep rest periods ${timePerSession <= 45 ? 'under 60s' : '60-90s'} for higher burn`,
          `${equipment === 'full-gym' ? 'Use supersets and circuits' : 'Focus on compound movements'}`,
          `Target ${experience === 'beginner' ? '1-2lbs' : '1-1.5lbs'} loss per week`
        ],
        strength: [
          `Focus on ${equipment === 'full-gym' ? 'barbell compounds' : 'progressive bodyweight'}`,
          `Rest ${timePerSession >= 60 ? '3-5 minutes' : '2-3 minutes'} between heavy sets`,
          `Track lifts: aim for ${experience === 'beginner' ? '5-10lbs' : '2.5-5lbs'} weekly increase`,
          `Warm up with ${timePerSession >= 60 ? '10-15min' : '5-10min'} dynamic movements`
        ],
        endurance: [
          `Build base with ${daysPerWeek >= 5 ? 'daily' : 'frequent'} moderate sessions`,
          `Mix ${timePerSession >= 60 ? 'long steady' : 'short interval'} training`,
          `Progress volume by 10% weekly for ${experience}s`,
          `Recovery is crucial - include 1-2 easy days weekly`
        ]
      };

      setWorkoutPlan({
        goal: goal,
        experience: experience,
        daysPerWeek: daysPerWeek,
        timePerSession: timePerSession,
        equipment: equipment,
        bodyFocus: bodyFocus,
        injuries: injuries,
        plan: plan,
        tips: tips[goal] || tips.muscle,
        totalExercises: Object.values(plan).reduce((acc, day) => acc + day.exercises.length, 0),
        estimatedCalories: Math.round((timePerSession * (goal === 'fat-loss' ? 8 : goal === 'strength' ? 5 : 6))),
        weeklyVolume: `${daysPerWeek} days × ${timePerSession}min = ${daysPerWeek * timePerSession}min/week`
      });

      setLoading(false);
      toast({
        title: "Maaz Workout Plan Generated!",
        description: "Your Maaz personalized workout plan is ready."
      });
    }, 1000);
  };
  
  const generateWorkoutPlan = () => {
    generateWorkoutPlanDirect(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.goal || !formData.experience || !formData.daysPerWeek || !formData.timePerSession || !formData.equipment) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    generateWorkoutPlan();
  };

  const getExerciseDemo = (exerciseName) => {
    const exerciseData = {
      // Push exercises
      "Push-ups": {
        visual: "🤸‍♂️",
        steps: ["Start in plank position", "Lower chest to ground", "Push back up", "Keep core tight"],
        tips: "Keep straight line from head to heels",
        muscles: "Chest, Shoulders, Triceps"
      },
      "Bench Press": {
        visual: "🏋️‍♂️",
        steps: ["Lie on bench, grip bar", "Lower to chest", "Press up explosively", "Control the descent"],
        tips: "Keep feet planted, arch back slightly",
        muscles: "Chest, Shoulders, Triceps"
      },
      "Overhead Press": {
        visual: "🏋️‍♀️",
        steps: ["Stand with bar at shoulders", "Press overhead", "Lock out arms", "Lower with control"],
        tips: "Keep core tight, don't arch back",
        muscles: "Shoulders, Triceps, Core"
      },
      // Pull exercises
      "Pull-ups": {
        visual: "🤸‍♂️",
        steps: ["Hang from bar", "Pull chest to bar", "Lower with control", "Full arm extension"],
        tips: "Engage lats, avoid swinging",
        muscles: "Lats, Biceps, Rear Delts"
      },
      "Deadlifts": {
        visual: "🏋️‍♂️",
        steps: ["Stand over bar", "Grip and lift", "Drive through heels", "Stand tall, squeeze glutes"],
        tips: "Keep bar close to body, neutral spine",
        muscles: "Hamstrings, Glutes, Back"
      },
      "Barbell Rows": {
        visual: "🏋️‍♀️",
        steps: ["Hinge at hips", "Pull bar to chest", "Squeeze shoulder blades", "Lower with control"],
        tips: "Keep chest up, core engaged",
        muscles: "Lats, Rhomboids, Biceps"
      },
      // Leg exercises
      "Squats": {
        visual: "🏃‍♂️",
        steps: ["Stand with feet shoulder-width", "Lower hips back and down", "Go to parallel", "Drive through heels up"],
        tips: "Keep knees tracking over toes",
        muscles: "Quads, Glutes, Hamstrings"
      },
      "Lunges": {
        visual: "🤸‍♀️",
        steps: ["Step forward", "Lower back knee", "Push back to start", "Alternate legs"],
        tips: "Keep front knee over ankle",
        muscles: "Quads, Glutes, Hamstrings"
      },
      // Core exercises
      "Plank": {
        visual: "🧘‍♂️",
        steps: ["Start in push-up position", "Hold on forearms", "Keep straight line", "Breathe normally"],
        tips: "Don't let hips sag or pike up",
        muscles: "Core, Shoulders, Glutes"
      }
    };

    // Find closest match for exercise name
    const exactMatch = exerciseData[exerciseName];
    if (exactMatch) return exactMatch;

    // Fuzzy matching for similar exercises
    const exerciseKeys = Object.keys(exerciseData);
    const match = exerciseKeys.find(key => 
      exerciseName.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(exerciseName.toLowerCase().split(' ')[0])
    );
    
    return match ? exerciseData[match] : {
      visual: "💪",
      steps: ["Position yourself correctly", "Perform the movement", "Control the motion", "Return to start"],
      tips: "Focus on proper form over weight",
      muscles: "Target muscle groups"
    };
  };

  const handleExerciseClick = (exerciseName) => {
    setSelectedExercise({
      name: exerciseName,
      ...getExerciseDemo(exerciseName)
    });
    setShowExerciseModal(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Professional Workout Plan Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Get expert-level workout plans tailored to your goals and experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 bg-card rounded-lg shadow-lg p-6 border"
            >
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Primary Goal</label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                    required
                  >
                    <option value="">Select Goal</option>
                    <option value="muscle">Muscle Building</option>
                    <option value="fat-loss">Fat Loss</option>
                    <option value="strength">Strength Training</option>
                    <option value="endurance">Endurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="beginner">Beginner (0-6 months)</option>
                    <option value="intermediate">Intermediate (6 months - 2 years)</option>
                    <option value="advanced">Advanced (2+ years)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Days/Week</label>
                    <select
                      name="daysPerWeek"
                      value={formData.daysPerWeek}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    >
                      <option value="">Select</option>
                      <option value="3">3 Days</option>
                      <option value="4">4 Days</option>
                      <option value="5">5 Days</option>
                      <option value="6">6 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Time/Session</label>
                    <select
                      name="timePerSession"
                      value={formData.timePerSession}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    >
                      <option value="">Select</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Available Equipment</label>
                  <select
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                    required
                  >
                    <option value="">Select Equipment</option>
                    <option value="bodyweight">Bodyweight Only</option>
                    <option value="dumbbells">Dumbbells</option>
                    <option value="home-gym">Home Gym Setup</option>
                    <option value="full-gym">Full Gym Access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Body Focus (Optional)</label>
                  <select
                    name="bodyFocus"
                    value={formData.bodyFocus}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                  >
                    <option value="">No Specific Focus</option>
                    <option value="upper">Upper Body</option>
                    <option value="lower">Lower Body</option>
                    <option value="core">Core</option>
                    <option value="arms">Arms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Injuries/Limitations</label>
                  <Input
                    type="text"
                    name="injuries"
                    value={formData.injuries}
                    onChange={handleInputChange}
                    placeholder="e.g., Lower back, knee issues"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Generating Plan...' : 'Generate Workout Plan'}
                </Button>
              </form>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-card rounded-lg shadow-lg p-6 border"
            >
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Maaz Suggested Workout Plan</h2>
              
              {!workoutPlan ? (
                <div className="text-center text-muted-foreground py-12">
                  <p>Fill the form to generate your Maaz personalized workout plan</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Plan Summary */}
                  <div className="bg-primary/10 rounded-lg p-4 border">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Plan Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foreground">
                      <div>
                        <span className="font-medium">Goal:</span> {workoutPlan.goal.charAt(0).toUpperCase() + workoutPlan.goal.slice(1).replace('-', ' ')}
                      </div>
                      <div>
                        <span className="font-medium">Level:</span> {workoutPlan.experience.charAt(0).toUpperCase() + workoutPlan.experience.slice(1)}
                      </div>
                      <div>
                        <span className="font-medium">Equipment:</span> {workoutPlan.equipment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div>
                        <span className="font-medium">Weekly Volume:</span> {workoutPlan.weeklyVolume}
                      </div>
                      <div>
                        <span className="font-medium">Total Exercises:</span> {workoutPlan.totalExercises}
                      </div>
                      <div>
                        <span className="font-medium">Est. Calories/Session:</span> {workoutPlan.estimatedCalories}
                      </div>
                      {workoutPlan.bodyFocus && (
                        <div>
                          <span className="font-medium">Focus:</span> {workoutPlan.bodyFocus.charAt(0).toUpperCase() + workoutPlan.bodyFocus.slice(1)} Body
                        </div>
                      )}
                      {workoutPlan.injuries && (
                        <div>
                          <span className="font-medium">Modifications:</span> Injury-adapted
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Workout Days */}
                  <div className="grid gap-4">
                    {Object.entries(workoutPlan.plan).map(([dayKey, dayPlan]) => (
                      <div key={dayKey} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-lg text-foreground mb-3">
                          Day {dayKey.slice(-1)}: {dayPlan.name}
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 text-foreground">Exercise</th>
                                <th className="text-left py-2 text-foreground">Sets</th>
                                <th className="text-left py-2 text-foreground">Reps</th>
                                <th className="text-left py-2 text-foreground">Rest</th>
                                <th className="text-left py-2 text-foreground">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dayPlan.exercises.map((exercise, index) => (
                                <tr key={index} className="border-b hover:bg-secondary/10 transition-colors">
                                  <td className="py-2 font-medium text-foreground">
                                    <button 
                                      onClick={() => handleExerciseClick(exercise.name)}
                                      className="text-left hover:text-primary transition-colors cursor-pointer underline-offset-4 hover:underline"
                                    >
                                      {exercise.name}
                                    </button>
                                  </td>
                                  <td className="py-2 text-muted-foreground">{exercise.sets}</td>
                                  <td className="py-2 text-muted-foreground">{exercise.reps}</td>
                                  <td className="py-2 text-muted-foreground">{exercise.rest}</td>
                                  <td className="py-2 text-muted-foreground text-xs">{exercise.notes}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Professional Tips */}
                  <div className="bg-secondary/20 rounded-lg p-4 border">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Maaz Professional Tips</h3>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      {workoutPlan.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                      <li>• Always warm up for 5-10 minutes before starting</li>
                      <li>• Cool down and stretch after each session</li>
                      <li>• Stay hydrated throughout your workout</li>
                      <li>• Listen to your body and rest when needed</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Exercise Demo Modal */}
          {showExerciseModal && selectedExercise && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-lg shadow-xl max-w-md w-full p-6 border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{selectedExercise.name}</h3>
                  <button 
                    onClick={() => setShowExerciseModal(false)}
                    className="text-muted-foreground hover:text-foreground text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                {/* Visual Demo */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-2">{selectedExercise.visual}</div>
                  <p className="text-sm text-muted-foreground">Visual representation</p>
                </div>
                
                {/* Target Muscles */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Target Muscles:</h4>
                  <p className="text-sm text-muted-foreground">{selectedExercise.muscles}</p>
                </div>
                
                {/* Steps */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">How to Perform:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    {selectedExercise.steps.map((step, index) => (
                      <li key={index}>{index + 1}. {step}</li>
                    ))}
                  </ol>
                </div>
                
                {/* Tips */}
                <div className="bg-primary/10 rounded-lg p-3 border">
                  <h4 className="font-medium text-foreground mb-1">Pro Tip:</h4>
                  <p className="text-sm text-muted-foreground">{selectedExercise.tips}</p>
                </div>
                
                <Button 
                  onClick={() => setShowExerciseModal(false)}
                  className="w-full mt-4"
                >
                  Got It!
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPlanPage;