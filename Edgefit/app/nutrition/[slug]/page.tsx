"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, Zap, Utensils, Heart, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NotFound from '@/app/not-found';
import { BackButton } from '@/components/BackButton';

// Define the meal plans data
const mealPlans = {
  'weight-loss-plan': {
    title: "Weight Loss Plan",
    description: "Balanced meals for sustainable weight loss",
    calories: "1,800 cal/day",
    type: "Weight Loss",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-brand-accent",
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        description: "High-protein breakfast to start your day",
        foods: [
          "Greek yogurt with berries",
          "Whole grain toast with avocado",
          "Green tea"
        ]
      },
      {
        name: "Lunch",
        time: "12:30 PM",
        description: "Balanced meal to keep you energized",
        foods: [
          "Grilled chicken salad",
          "Quinoa bowl",
          "Mixed vegetables"
        ]
      },
      {
        name: "Dinner",
        time: "6:30 PM",
        description: "Light but satisfying dinner",
        foods: [
          "Baked salmon",
          "Steamed vegetables",
          "Brown rice"
        ]
      },
      {
        name: "Snacks",
        time: "Between meals",
        description: "Healthy snacks to curb hunger",
        foods: [
          "Apple with almond butter",
          "Carrot sticks with hummus",
          "Handful of nuts"
        ]
      }
    ]
  },
  'muscle-building': {
    title: "Muscle Building",
    description: "High-protein meals to support muscle growth",
    calories: "2,400 cal/day",
    type: "Muscle Gain",
    icon: <Utensils className="w-5 h-5" />,
    color: "bg-brand-accent",
    meals: [
      {
        name: "Breakfast",
        time: "7:00 AM",
        description: "Protein-rich breakfast for muscle recovery",
        foods: [
          "Protein smoothie with banana",
          "Eggs with whole grain toast",
          "Oatmeal with nuts"
        ]
      },
      {
        name: "Lunch",
        time: "12:00 PM",
        description: "High-protein lunch for muscle maintenance",
        foods: [
          "Grilled chicken breast",
          "Sweet potato",
          "Broccoli"
        ]
      },
      {
        name: "Dinner",
        time: "6:00 PM",
        description: "Protein-packed dinner for overnight recovery",
        foods: [
          "Lean beef steak",
          "Brown rice",
          "Mixed vegetables"
        ]
      },
      {
        name: "Snacks",
        time: "Between meals",
        description: "Protein-rich snacks for muscle support",
        foods: [
          "Protein shake",
          "Greek yogurt with granola",
          "Tuna on whole grain crackers"
        ]
      }
    ]
  },
  'maintenance-plan': {
    title: "Maintenance Plan",
    description: "Balanced nutrition for maintaining current weight",
    calories: "2,000 cal/day",
    type: "Maintenance",
    icon: <Leaf className="w-5 h-5" />,
    color: "bg-status-warning",
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        description: "Balanced breakfast for sustained energy",
        foods: [
          "Whole grain cereal with milk",
          "Fresh fruit",
          "Green tea"
        ]
      },
      {
        name: "Lunch",
        time: "12:30 PM",
        description: "Nutritious lunch for afternoon energy",
        foods: [
          "Mediterranean salad",
          "Whole grain wrap",
          "Fresh vegetables"
        ]
      },
      {
        name: "Dinner",
        time: "6:30 PM",
        description: "Well-balanced dinner",
        foods: [
          "Grilled fish",
          "Quinoa",
          "Roasted vegetables"
        ]
      },
      {
        name: "Snacks",
        time: "Between meals",
        description: "Healthy snacks for energy",
        foods: [
          "Mixed nuts",
          "Fresh fruit",
          "Yogurt"
        ]
      }
    ]
  }
} as const;

// Define the type for the meal plan
type MealPlan = typeof mealPlans[keyof typeof mealPlans];

export default function MealPlanPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const plan = mealPlans[slug as keyof typeof mealPlans];

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
        <NotFound redirectLink="/nutrition" redirectMessage="Back to Nutrition" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back to Nutrition */}
        <div className="flex items-center mb-8">
          <BackButton href="/nutrition" text="Back to Nutrition" />
        </div>

        {/* Meal Plan */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Badge className={`${plan.color} text-white px-3 py-1 rounded-full transform hover:scale-105 transition-transform duration-300`}>
              {plan.icon}
              <span className="ml-2 font-medium">{plan.type}</span>
            </Badge>
            <div className="flex items-center text-sm text-brand-dark/60 bg-brand-light/50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" />
              {plan.calories}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-brand-dark mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
            {plan.title}
          </h1>
          <p className="text-brand-dark/70 text-lg">{plan.description}</p>
        </div>

        {/* Meals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {plan.meals.map((meal, index) => (
            <Card
              key={index}
              className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-brand-dark text-xl flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-brand-green" />
                    {meal.name}
                  </CardTitle>
                  <span className="text-sm font-medium text-brand-dark/60 bg-brand-light/50 px-3 py-1 rounded-full">
                    {meal.time}
                  </span>
                </div>
                <CardDescription className="text-brand-dark/70">{meal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="flex items-start group">
                      <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-brand-dark group-hover:text-brand-green transition-colors duration-300">{food}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Get AI Guidance */}
        <div className="mt-12 border-t border-brand-accent/20 pt-12">
          <Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-brand-dark text-xl">
                <Zap className="w-6 h-6 mr-3 text-brand-green animate-pulse" />
                Need Adjustments?
              </CardTitle>
              <CardDescription className="text-brand-dark/70">
                Get personalized modifications to this meal plan based on your preferences and dietary restrictions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="bg-brand-green hover:bg-green-700 w-fit py-6 text-base font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
              >
                <Link href="/chat">Get AI Guidance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
