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
    dietType: ''
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const generateDietPlan = () => {
    setLoading(true);
    
    setTimeout(() => {
      const { weight, height, age, gender, goal, activityLevel, dietType } = formData;
      
      const bmr = calculateBMR(parseFloat(weight), parseFloat(height), parseInt(age), gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      
      let targetCalories;
      if (goal === 'muscle') {
        targetCalories = tdee + 300;
      } else if (goal === 'fat-loss') {
        targetCalories = tdee - 500;
      } else {
        targetCalories = tdee;
      }

      const protein = Math.round((targetCalories * 0.3) / 4);
      const carbs = Math.round((targetCalories * 0.4) / 4);
      const fats = Math.round((targetCalories * 0.3) / 9);

      // Dynamic meal plans based on goal and calories
      const getMealPlans = (goal, calories, dietType) => {
        const baseMeals = {
          vegetarian: {
            breakfast: goal === 'muscle' ? 
              [`High-protein oats (${Math.round(calories*0.2)} cal)`, `Paneer scramble with toast`, `Protein smoothie with nuts`] :
              goal === 'fat-loss' ? 
              [`Light oats with berries (${Math.round(calories*0.25)} cal)`, `Greek yogurt with almonds`, `Green smoothie`] :
              [`Balanced oats bowl (${Math.round(calories*0.23)} cal)`, `Vegetable omelette`, `Fruit smoothie`],
            lunch: goal === 'muscle' ? 
              [`Large quinoa bowl (${Math.round(calories*0.35)} cal)`, `Dal with brown rice`, `Chickpea curry with roti`] :
              goal === 'fat-loss' ? 
              [`Small quinoa salad (${Math.round(calories*0.3)} cal)`, `Vegetable soup with bread`, `Sprouts salad`] :
              [`Medium quinoa bowl (${Math.round(calories*0.32)} cal)`, `Lentil curry with rice`, `Mixed vegetable curry`],
            dinner: goal === 'muscle' ? 
              [`Paneer with vegetables (${Math.round(calories*0.3)} cal)`, `Tofu stir-fry with quinoa`, `Black bean curry`] :
              goal === 'fat-loss' ? 
              [`Grilled vegetables (${Math.round(calories*0.25)} cal)`, `Light tofu curry`, `Vegetable soup`] :
              [`Balanced paneer dish (${Math.round(calories*0.28)} cal)`, `Mixed dal`, `Vegetable curry`],
            snacks: goal === 'muscle' ? 
              [`Protein shake (${Math.round(calories*0.15)} cal)`, `Mixed nuts`, `Peanut butter with apple`] :
              [`Green tea`, `Small handful nuts`, `Fruit`]
          },
          nonVegetarian: {
            breakfast: goal === 'muscle' ? 
              [`4 eggs with toast (${Math.round(calories*0.2)} cal)`, `Chicken omelette`, `Protein pancakes`] :
              goal === 'fat-loss' ? 
              [`2 eggs with vegetables (${Math.round(calories*0.25)} cal)`, `Egg white omelette`, `Light chicken sandwich`] :
              [`3 eggs with toast (${Math.round(calories*0.23)} cal)`, `Chicken scramble`, `Balanced omelette`],
            lunch: goal === 'muscle' ? 
              [`Large chicken with rice (${Math.round(calories*0.35)} cal)`, `Fish curry with quinoa`, `Turkey with sweet potato`] :
              goal === 'fat-loss' ? 
              [`Grilled chicken salad (${Math.round(calories*0.3)} cal)`, `Fish with vegetables`, `Lean meat soup`] :
              [`Medium chicken with rice (${Math.round(calories*0.32)} cal)`, `Fish curry`, `Turkey sandwich`],
            dinner: goal === 'muscle' ? 
              [`Salmon with quinoa (${Math.round(calories*0.3)} cal)`, `Chicken breast with rice`, `Lean beef with vegetables`] :
              goal === 'fat-loss' ? 
              [`Grilled fish (${Math.round(calories*0.25)} cal)`, `Chicken breast with salad`, `Lean meat with vegetables`] :
              [`Balanced fish dish (${Math.round(calories*0.28)} cal)`, `Chicken with vegetables`, `Meat curry`],
            snacks: goal === 'muscle' ? 
              [`Protein shake (${Math.round(calories*0.15)} cal)`, `Boiled eggs`, `Greek yogurt`] :
              [`Boiled egg`, `Greek yogurt`, `Chicken soup`]
          },
          vegan: {
            breakfast: goal === 'muscle' ? 
              [`Protein-rich chia pudding (${Math.round(calories*0.2)} cal)`, `Smoothie bowl with protein`, `Oatmeal with nuts`] :
              goal === 'fat-loss' ? 
              [`Light chia pudding (${Math.round(calories*0.25)} cal)`, `Green smoothie`, `Small oatmeal bowl`] :
              [`Balanced chia bowl (${Math.round(calories*0.23)} cal)`, `Fruit smoothie`, `Oats with berries`],
            lunch: goal === 'muscle' ? 
              [`Large Buddha bowl (${Math.round(calories*0.35)} cal)`, `Lentil curry with bread`, `Quinoa with tahini`] :
              goal === 'fat-loss' ? 
              [`Light Buddha bowl (${Math.round(calories*0.3)} cal)`, `Vegetable soup`, `Quinoa salad`] :
              [`Medium Buddha bowl (${Math.round(calories*0.32)} cal)`, `Lentil soup`, `Mixed grain bowl`],
            dinner: goal === 'muscle' ? 
              [`Tofu curry with rice (${Math.round(calories*0.3)} cal)`, `Bean stir-fry`, `Lentil dal with quinoa`] :
              goal === 'fat-loss' ? 
              [`Light tofu stir-fry (${Math.round(calories*0.25)} cal)`, `Vegetable curry`, `Bean soup`] :
              [`Balanced tofu dish (${Math.round(calories*0.28)} cal)`, `Mixed bean curry`, `Vegetable stir-fry`],
            snacks: goal === 'muscle' ? 
              [`Plant protein shake (${Math.round(calories*0.15)} cal)`, `Trail mix`, `Hummus with vegetables`] :
              [`Herbal tea`, `Small nuts portion`, `Fresh fruit`]
          }
        };
        return baseMeals[dietType] || baseMeals.vegetarian;
      };

      const mealPlans = getMealPlans(goal, targetCalories, dietType);

      setDietPlan({
        calories: Math.round(targetCalories),
        protein,
        carbs,
        fats,
        meals: mealPlans,
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
                        <span className="font-medium">Goal:</span> {dietPlan.goal === 'muscle' ? 'Muscle Building' : dietPlan.goal === 'fat-loss' ? 'Fat Loss' : 'Maintain Weight'}
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

                  {/* Meal Plan */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-foreground">Suggested Meals</h3>
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

                  <div className="bg-secondary/20 rounded-lg p-4 text-sm border">
                    <p className="font-medium text-foreground mb-2">Important Notes:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Drink at least 3-4 liters of water daily</li>
                      <li>• Eat every 3-4 hours to maintain metabolism</li>
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