import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/use-toast';

const DietPlanPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    goal: '',
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    dietType: '',
    breakfastTime: '',
    lunchTime: '',
    dinnerTime: '',
    snackTimes: ''
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubstitutions, setShowSubstitutions] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear previous diet plan when form changes
    setDietPlan(null);
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    return bmr * multipliers[activityLevel];
  };

  const getSubstitutions = (selectedMeal, dietType, goal) => {
    const calorieRange = selectedMeal.match(/\((\d+)\s*cal\)/);
    const targetCalories = calorieRange ? parseInt(calorieRange[1]) : 300;
    
    const substitutions = {
      vegetarian: {
        low: [
          { food: "Mixed vegetable salad with olive oil", calories: targetCalories - 50 },
          { food: "Quinoa bowl with roasted vegetables", calories: targetCalories - 30 },
          { food: "Lentil soup with whole grain bread", calories: targetCalories - 20 },
          { food: "Greek yogurt with mixed berries", calories: targetCalories + 10 }
        ],
        medium: [
          { food: "Chickpea curry with brown rice", calories: targetCalories - 40 },
          { food: "Paneer tikka with quinoa", calories: targetCalories - 20 },
          { food: "Mixed dal with roti", calories: targetCalories + 15 },
          { food: "Vegetable biryani (small portion)", calories: targetCalories + 30 }
        ],
        high: [
          { food: "Large paneer butter masala with naan", calories: targetCalories - 30 },
          { food: "Protein-rich smoothie with nuts", calories: targetCalories - 10 },
          { food: "Quinoa pulao with mixed vegetables", calories: targetCalories + 20 },
          { food: "Chickpea protein bowl", calories: targetCalories + 40 }
        ]
      },
      nonVegetarian: {
        low: [
          { food: "Grilled chicken breast with salad", calories: targetCalories - 40 },
          { food: "Fish curry with steamed rice", calories: targetCalories - 20 },
          { food: "Egg white omelette with vegetables", calories: targetCalories - 30 },
          { food: "Turkey sandwich (whole grain)", calories: targetCalories + 10 }
        ],
        medium: [
          { food: "Chicken curry with brown rice", calories: targetCalories - 30 },
          { food: "Grilled salmon with quinoa", calories: targetCalories - 10 },
          { food: "Mutton curry with roti", calories: targetCalories + 20 },
          { food: "Fish biryani (medium portion)", calories: targetCalories + 35 }
        ],
        high: [
          { food: "Large chicken biryani", calories: targetCalories - 20 },
          { food: "Beef curry with naan", calories: targetCalories + 10 },
          { food: "Fish fry with rice", calories: targetCalories + 30 },
          { food: "Chicken tikka masala with rice", calories: targetCalories + 45 }
        ]
      },
      vegan: {
        low: [
          { food: "Buddha bowl with tahini dressing", calories: targetCalories - 40 },
          { food: "Lentil salad with vegetables", calories: targetCalories - 30 },
          { food: "Quinoa soup with herbs", calories: targetCalories - 20 },
          { food: "Smoothie bowl with plant protein", calories: targetCalories + 15 }
        ],
        medium: [
          { food: "Tofu curry with brown rice", calories: targetCalories - 30 },
          { food: "Black bean bowl with avocado", calories: targetCalories - 10 },
          { food: "Lentil dal with quinoa", calories: targetCalories + 20 },
          { food: "Chickpea flour pancakes", calories: targetCalories + 25 }
        ],
        high: [
          { food: "Large tofu stir-fry with nuts", calories: targetCalories - 20 },
          { food: "Bean and grain bowl", calories: targetCalories + 10 },
          { food: "Lentil curry with coconut rice", calories: targetCalories + 30 },
          { food: "Quinoa biryani with cashews", calories: targetCalories + 40 }
        ]
      }
    };

    const calorieCategory = targetCalories < 250 ? 'low' : targetCalories > 400 ? 'high' : 'medium';
    return substitutions[dietType]?.[calorieCategory] || substitutions.vegetarian.medium;
  };

  const generateDietPlan = () => {
    setLoading(true);
    
    setTimeout(() => {
      const { weight, height, age, gender, goal, activityLevel, dietType } = formData;
      
      const bmr = calculateBMR(parseFloat(weight), parseFloat(height), parseInt(age), gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      
      let targetCalories, protein, carbs, fats;
      
      if (goal === 'muscle') {
        targetCalories = tdee + 300;
        protein = Math.round((targetCalories * 0.35) / 4);
        carbs = Math.round((targetCalories * 0.35) / 4);
        fats = Math.round((targetCalories * 0.3) / 9);
      } else if (goal === 'fat-loss') {
        targetCalories = tdee - 500;
        protein = Math.round((targetCalories * 0.4) / 4);
        carbs = Math.round((targetCalories * 0.3) / 4);
        fats = Math.round((targetCalories * 0.3) / 9);
      } else if (goal === 'stamina') {
        targetCalories = tdee + 200;
        protein = Math.round((targetCalories * 0.25) / 4);
        carbs = Math.round((targetCalories * 0.55) / 4);
        fats = Math.round((targetCalories * 0.2) / 9);
      } else if (goal === 'sports') {
        targetCalories = tdee + 400;
        protein = Math.round((targetCalories * 0.3) / 4);
        carbs = Math.round((targetCalories * 0.5) / 4);
        fats = Math.round((targetCalories * 0.2) / 9);
      } else {
        targetCalories = tdee;
        protein = Math.round((targetCalories * 0.3) / 4);
        carbs = Math.round((targetCalories * 0.4) / 4);
        fats = Math.round((targetCalories * 0.3) / 9);
      }

      // Dynamic meal plans based on goal and calories
      const getMealPlans = (goal, calories, dietType) => {
        const baseMeals = {
          vegetarian: {
            breakfast: goal === 'muscle' ? 
              [`High-protein oats (${Math.round(calories*0.2)} cal)`, `Paneer scramble with toast`, `Protein smoothie with nuts`] :
              goal === 'fat-loss' ? 
              [`Light oats with berries (${Math.round(calories*0.25)} cal)`, `Greek yogurt with almonds`, `Green smoothie`] :
              goal === 'stamina' ?
              [`Carb-rich oats with banana (${Math.round(calories*0.22)} cal)`, `Whole grain toast with honey`, `Energy smoothie with dates`] :
              goal === 'sports' ?
              [`Power breakfast bowl (${Math.round(calories*0.2)} cal)`, `Quinoa porridge with fruits`, `Pre-workout smoothie`] :
              [`Balanced oats bowl (${Math.round(calories*0.23)} cal)`, `Vegetable omelette`, `Fruit smoothie`],
            lunch: goal === 'muscle' ? 
              [`Large quinoa bowl (${Math.round(calories*0.35)} cal)`, `Dal with brown rice`, `Chickpea curry with roti`] :
              goal === 'fat-loss' ? 
              [`Small quinoa salad (${Math.round(calories*0.3)} cal)`, `Vegetable soup with bread`, `Sprouts salad`] :
              goal === 'stamina' ?
              [`Complex carb bowl with sweet potato (${Math.round(calories*0.35)} cal)`, `Brown rice with dal`, `Pasta with vegetables`] :
              goal === 'sports' ?
              [`Performance bowl with quinoa (${Math.round(calories*0.33)} cal)`, `Recovery dal with rice`, `Energy-dense chickpea curry`] :
              [`Medium quinoa bowl (${Math.round(calories*0.32)} cal)`, `Lentil curry with rice`, `Mixed vegetable curry`],
            dinner: goal === 'muscle' ? 
              [`Paneer with vegetables (${Math.round(calories*0.3)} cal)`, `Tofu stir-fry with quinoa`, `Black bean curry`] :
              goal === 'fat-loss' ? 
              [`Grilled vegetables (${Math.round(calories*0.25)} cal)`, `Light tofu curry`, `Vegetable soup`] :
              goal === 'stamina' ?
              [`Carb-loading pasta (${Math.round(calories*0.28)} cal)`, `Sweet potato with dal`, `Quinoa with mixed vegetables`] :
              goal === 'sports' ?
              [`Recovery paneer curry (${Math.round(calories*0.3)} cal)`, `Post-training tofu bowl`, `Protein-rich dal with rice`] :
              [`Balanced paneer dish (${Math.round(calories*0.28)} cal)`, `Mixed dal`, `Vegetable curry`],
            snacks: goal === 'muscle' ? 
              [`Protein shake (${Math.round(calories*0.15)} cal)`, `Mixed nuts`, `Peanut butter with apple`] :
              goal === 'stamina' ?
              [`Energy bars (${Math.round(calories*0.15)} cal)`, `Banana with dates`, `Coconut water with nuts`] :
              goal === 'sports' ?
              [`Sports drink with banana (${Math.round(calories*0.15)} cal)`, `Trail mix`, `Recovery smoothie`] :
              [`Green tea`, `Small handful nuts`, `Fruit`]
          },
          nonVegetarian: {
            breakfast: goal === 'muscle' ? 
              [`4 eggs with toast (${Math.round(calories*0.2)} cal)`, `Chicken omelette`, `Protein pancakes`] :
              goal === 'fat-loss' ? 
              [`2 eggs with vegetables (${Math.round(calories*0.25)} cal)`, `Egg white omelette`, `Light chicken sandwich`] :
              goal === 'stamina' ?
              [`3 eggs with whole grain toast (${Math.round(calories*0.22)} cal)`, `Chicken and oats bowl`, `Energy-rich egg sandwich`] :
              goal === 'sports' ?
              [`Power eggs with quinoa (${Math.round(calories*0.2)} cal)`, `Pre-workout chicken wrap`, `Athletic breakfast bowl`] :
              [`3 eggs with toast (${Math.round(calories*0.23)} cal)`, `Chicken scramble`, `Balanced omelette`],
            lunch: goal === 'muscle' ? 
              [`Large chicken with rice (${Math.round(calories*0.35)} cal)`, `Fish curry with quinoa`, `Turkey with sweet potato`] :
              goal === 'fat-loss' ? 
              [`Grilled chicken salad (${Math.round(calories*0.3)} cal)`, `Fish with vegetables`, `Lean meat soup`] :
              goal === 'stamina' ?
              [`Chicken with brown rice (${Math.round(calories*0.35)} cal)`, `Fish with pasta`, `Turkey with sweet potato`] :
              goal === 'sports' ?
              [`Performance chicken bowl (${Math.round(calories*0.33)} cal)`, `Athletic fish curry`, `Sports training meat dish`] :
              [`Medium chicken with rice (${Math.round(calories*0.32)} cal)`, `Fish curry`, `Turkey sandwich`],
            dinner: goal === 'muscle' ? 
              [`Salmon with quinoa (${Math.round(calories*0.3)} cal)`, `Chicken breast with rice`, `Lean beef with vegetables`] :
              goal === 'fat-loss' ? 
              [`Grilled fish (${Math.round(calories*0.25)} cal)`, `Chicken breast with salad`, `Lean meat with vegetables`] :
              goal === 'stamina' ?
              [`Endurance salmon dish (${Math.round(calories*0.28)} cal)`, `Chicken with complex carbs`, `Fish with quinoa`] :
              goal === 'sports' ?
              [`Recovery salmon meal (${Math.round(calories*0.3)} cal)`, `Post-training chicken`, `Athletic beef dish`] :
              [`Balanced fish dish (${Math.round(calories*0.28)} cal)`, `Chicken with vegetables`, `Meat curry`],
            snacks: goal === 'muscle' ? 
              [`Protein shake (${Math.round(calories*0.15)} cal)`, `Boiled eggs`, `Greek yogurt`] :
              goal === 'stamina' ?
              [`Energy shake with banana (${Math.round(calories*0.15)} cal)`, `Chicken strips`, `Endurance smoothie`] :
              goal === 'sports' ?
              [`Sports protein drink (${Math.round(calories*0.15)} cal)`, `Recovery eggs`, `Athletic yogurt bowl`] :
              [`Boiled egg`, `Greek yogurt`, `Chicken soup`]
          },
          vegan: {
            breakfast: goal === 'muscle' ? 
              [`Protein-rich chia pudding (${Math.round(calories*0.2)} cal)`, `Smoothie bowl with protein`, `Oatmeal with nuts`] :
              goal === 'fat-loss' ? 
              [`Light chia pudding (${Math.round(calories*0.25)} cal)`, `Green smoothie`, `Small oatmeal bowl`] :
              goal === 'stamina' ?
              [`Carb-rich chia bowl (${Math.round(calories*0.22)} cal)`, `Energy smoothie with oats`, `Quinoa breakfast bowl`] :
              goal === 'sports' ?
              [`Power chia pudding (${Math.round(calories*0.2)} cal)`, `Athletic smoothie bowl`, `Pre-training oats`] :
              [`Balanced chia bowl (${Math.round(calories*0.23)} cal)`, `Fruit smoothie`, `Oats with berries`],
            lunch: goal === 'muscle' ? 
              [`Large Buddha bowl (${Math.round(calories*0.35)} cal)`, `Lentil curry with bread`, `Quinoa with tahini`] :
              goal === 'fat-loss' ? 
              [`Light Buddha bowl (${Math.round(calories*0.3)} cal)`, `Vegetable soup`, `Quinoa salad`] :
              goal === 'stamina' ?
              [`Endurance Buddha bowl (${Math.round(calories*0.35)} cal)`, `Lentil with brown rice`, `Quinoa pasta bowl`] :
              goal === 'sports' ?
              [`Performance Buddha bowl (${Math.round(calories*0.33)} cal)`, `Athletic lentil curry`, `Sports quinoa dish`] :
              [`Medium Buddha bowl (${Math.round(calories*0.32)} cal)`, `Lentil soup`, `Mixed grain bowl`],
            dinner: goal === 'muscle' ? 
              [`Tofu curry with rice (${Math.round(calories*0.3)} cal)`, `Bean stir-fry`, `Lentil dal with quinoa`] :
              goal === 'fat-loss' ? 
              [`Light tofu stir-fry (${Math.round(calories*0.25)} cal)`, `Vegetable curry`, `Bean soup`] :
              goal === 'stamina' ?
              [`Carb-rich tofu dish (${Math.round(calories*0.28)} cal)`, `Bean curry with rice`, `Lentil pasta`] :
              goal === 'sports' ?
              [`Recovery tofu meal (${Math.round(calories*0.3)} cal)`, `Post-training bean dish`, `Athletic lentil curry`] :
              [`Balanced tofu dish (${Math.round(calories*0.28)} cal)`, `Mixed bean curry`, `Vegetable stir-fry`],
            snacks: goal === 'muscle' ? 
              [`Plant protein shake (${Math.round(calories*0.15)} cal)`, `Trail mix`, `Hummus with vegetables`] :
              goal === 'stamina' ?
              [`Energy smoothie (${Math.round(calories*0.15)} cal)`, `Date and nut balls`, `Coconut water with fruits`] :
              goal === 'sports' ?
              [`Plant sports drink (${Math.round(calories*0.15)} cal)`, `Athletic trail mix`, `Recovery smoothie`] :
              [`Herbal tea`, `Small nuts portion`, `Fresh fruit`]
          }
        };
        return baseMeals[dietType] || baseMeals.vegetarian;
      };

      const mealPlans = getMealPlans(goal, targetCalories, dietType);

      const formatMealSchedule = (meals, timings) => {
        const schedule = [];
        
        if (timings.breakfastTime) {
          schedule.push({
            time: timings.breakfastTime,
            type: 'Breakfast',
            foods: meals.breakfast
          });
        }
        
        if (timings.snackTimes) {
          const snackTimes = timings.snackTimes.split(',').map(t => t.trim());
          snackTimes.forEach((time, index) => {
            if (time && meals.snacks[index]) {
              schedule.push({
                time: time,
                type: `Snack ${index + 1}`,
                foods: [meals.snacks[index]]
              });
            }
          });
        }
        
        if (timings.lunchTime) {
          schedule.push({
            time: timings.lunchTime,
            type: 'Lunch',
            foods: meals.lunch
          });
        }
        
        if (timings.dinnerTime) {
          schedule.push({
            time: timings.dinnerTime,
            type: 'Dinner',
            foods: meals.dinner
          });
        }
        
        return schedule.sort((a, b) => a.time.localeCompare(b.time));
      };

      setDietPlan({
        calories: Math.round(targetCalories),
        protein,
        carbs,
        fats,
        meals: mealPlans,
        schedule: formatMealSchedule(mealPlans, formData),
        bmi: (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1),
        goal: goal,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
      });

      setLoading(false);
      toast({
        title: "Diet Plan Generated!",
        description: "Your personalized diet plan is ready."
      });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.goal || !formData.weight || !formData.height || !formData.age || !formData.gender || !formData.activityLevel || !formData.dietType) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    generateDietPlan();
  };

  const handleSubstitution = (newMeal) => {
    // This function can be extended to actually replace the meal in the diet plan
    toast({
      title: "Meal Substituted!",
      description: `Replaced with: ${newMeal.food}`
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Personalized Diet Plan Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Get your customized diet plan based on your goals and body metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-lg shadow-lg p-6 border"
            >
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Fitness Goal</label>
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
                    <option value="maintain">Maintain Weight</option>
                    <option value="stamina">Stamina & Endurance</option>
                    <option value="sports">Sports Training</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Weight (kg)</label>
                    <Input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="70"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Height (cm)</label>
                    <Input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="175"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Age</label>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Activity Level</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                    required
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary (Office job, no exercise)</option>
                    <option value="light">Light (Light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (Moderate exercise 3-5 days/week)</option>
                    <option value="active">Active (Heavy exercise 6-7 days/week)</option>
                    <option value="veryActive">Very Active (Physical job + exercise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Diet Preference</label>
                  <select
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground"
                    required
                  >
                    <option value="">Select Diet Type</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="nonVegetarian">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Meal Timings</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Breakfast Time</label>
                      <Input
                        type="time"
                        name="breakfastTime"
                        value={formData.breakfastTime}
                        onChange={handleInputChange}
                        placeholder="08:00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Lunch Time</label>
                      <Input
                        type="time"
                        name="lunchTime"
                        value={formData.lunchTime}
                        onChange={handleInputChange}
                        placeholder="13:00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Dinner Time</label>
                      <Input
                        type="time"
                        name="dinnerTime"
                        value={formData.dinnerTime}
                        onChange={handleInputChange}
                        placeholder="20:00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Snack Times</label>
                      <Input
                        type="text"
                        name="snackTimes"
                        value={formData.snackTimes}
                        onChange={handleInputChange}
                        placeholder="11:00, 16:00"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Generating Plan...' : 'Generate Diet Plan'}
                </Button>
              </form>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-lg shadow-lg p-6 border"
            >
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Diet Plan</h2>
              
              {!dietPlan ? (
                <div className="text-center text-muted-foreground py-12">
                  <p>Fill the form to generate your personalized diet plan</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Nutrition Summary */}
                  <div className="bg-primary/10 rounded-lg p-4 border">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Daily Nutrition Target</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-foreground">
                      <div>
                        <span className="font-medium">Goal:</span> {dietPlan.goal === 'muscle' ? 'Muscle Building' : dietPlan.goal === 'fat-loss' ? 'Fat Loss' : dietPlan.goal === 'stamina' ? 'Stamina & Endurance' : dietPlan.goal === 'sports' ? 'Sports Training' : 'Maintain Weight'}
                      </div>
                      <div>
                        <span className="font-medium">BMI:</span> {dietPlan.bmi}
                      </div>
                      <div>
                        <span className="font-medium">BMR:</span> {dietPlan.bmr} kcal
                      </div>
                      <div>
                        <span className="font-medium">TDEE:</span> {dietPlan.tdee} kcal
                      </div>
                      <div>
                        <span className="font-medium">Target Calories:</span> {dietPlan.calories} kcal
                      </div>
                      <div>
                        <span className="font-medium">Protein:</span> {dietPlan.protein}g
                      </div>
                      <div>
                        <span className="font-medium">Carbs:</span> {dietPlan.carbs}g
                      </div>
                      <div>
                        <span className="font-medium">Fats:</span> {dietPlan.fats}g
                      </div>
                    </div>
                  </div>

                  {/* Meal Schedule */}
                  {dietPlan.schedule && dietPlan.schedule.length > 0 ? (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Maaz Suggested Daily Meal Schedule</h3>
                      <div className="space-y-3">
                        {dietPlan.schedule.map((meal, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 bg-secondary/10 rounded-lg border">
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                              {meal.time}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground mb-1">{meal.type}</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {meal.foods.map((food, foodIndex) => (
                                  <li key={foodIndex}>• {food}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-foreground">Maaz Suggested Meals</h3>
                      <div className="space-y-4">
                        {Object.entries(dietPlan.meals).map(([mealType, foods]) => (
                          <div key={mealType} className="border-l-4 border-primary pl-4">
                            <h4 className="font-medium capitalize text-foreground mb-2">
                              {mealType}
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {foods.map((food, index) => (
                                <li key={index}>• {food}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Change Diet Plan Section */}
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-3">Didn't Find the Right Fit? Change It Now!</p>
                    <Button 
                      onClick={() => setShowSubstitutions(!showSubstitutions)}
                      variant="outline"
                      className="mb-4"
                    >
                      Change Now
                    </Button>
                  </div>

                  {/* Meal Substitution Section */}
                  {showSubstitutions && (
                    <div className="bg-secondary/10 rounded-lg p-4 border">
                      <h4 className="font-semibold text-foreground mb-3">Select Meal to Substitute</h4>
                      <div className="space-y-3">
                        <select
                          value={selectedMealType}
                          onChange={(e) => {
                            setSelectedMealType(e.target.value);
                            setSelectedMeal('');
                          }}
                          className="w-full p-2 border rounded-lg bg-background text-foreground"
                        >
                          <option value="">Select Meal Type</option>
                          {Object.keys(dietPlan.meals).map(mealType => (
                            <option key={mealType} value={mealType}>
                              {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                            </option>
                          ))}
                        </select>

                        {selectedMealType && (
                          <select
                            value={selectedMeal}
                            onChange={(e) => setSelectedMeal(e.target.value)}
                            className="w-full p-2 border rounded-lg bg-background text-foreground"
                          >
                            <option value="">Select Specific Meal</option>
                            {dietPlan.meals[selectedMealType].map((meal, index) => (
                              <option key={index} value={meal}>
                                {meal}
                              </option>
                            ))}
                          </select>
                        )}

                        {selectedMeal && (
                          <div className="bg-primary/10 rounded-lg p-3 border">
                            <h5 className="font-medium text-foreground mb-2">Substitution Options:</h5>
                            <div className="text-sm text-muted-foreground space-y-1">
                              {getSubstitutions(selectedMeal, formData.dietType, formData.goal).map((sub, index) => (
                                <div key={index} className="flex items-center justify-between py-1">
                                  <span>• {sub.food}</span>
                                  <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                                    {sub.calories} cal
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-secondary/20 rounded-lg p-4 text-sm border">
                    <p className="font-medium text-foreground mb-2">Important Notes:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Drink at least 3-4 liters of water daily</li>
                      {dietPlan.schedule && dietPlan.schedule.length > 0 ? (
                        <li>• Follow your personalized meal timings for best results</li>
                      ) : (
                        <li>• Eat every 3-4 hours to maintain metabolism</li>
                      )}
                      {dietPlan.goal === 'stamina' && <li>• Focus on complex carbs 2-3 hours before training</li>}
                      {dietPlan.goal === 'sports' && <li>• Consume protein within 30 minutes post-training</li>}
                      <li>• Adjust portions based on your hunger and energy levels</li>
                      <li>• Consult a nutritionist for personalized guidance</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DietPlanPage;