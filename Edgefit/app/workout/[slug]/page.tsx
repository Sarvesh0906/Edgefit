"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, Zap, Dumbbell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NotFound from '@/app/not-found';
import { BackButton } from '@/components/BackButton';

// Define the workout plans data
const workoutPlans = {
  'beginner-full-body': {
    title: "Beginner Full Body",
    description: "Perfect for starting your fitness journey",
    duration: "30 min",
    difficulty: "Beginner",
    type: "Strength",
    color: "bg-brand-accent",
    exercises: [
      {
        name: "Bodyweight Squats",
        sets: 3,
        reps: "12-15",
        rest: "60 sec",
        description: "Stand with feet shoulder-width apart, lower body as if sitting in a chair"
      },
      {
        name: "Push-ups (Modified)",
        sets: 3,
        reps: "8-10",
        rest: "60 sec",
        description: "Start on knees if needed, keep core tight and body straight"
      },
      {
        name: "Plank",
        sets: 3,
        reps: "30 sec",
        rest: "45 sec",
        description: "Hold push-up position with forearms on ground"
      },
      {
        name: "Walking Lunges",
        sets: 3,
        reps: "10 each leg",
        rest: "60 sec",
        description: "Step forward and lower until both knees are at 90 degrees"
      }
    ]
  },
  'hiit-cardio-blast': {
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training for fat burning",
    duration: "20 min",
    difficulty: "Intermediate",
    type: "Cardio",
    color: "bg-status-warning",
    exercises: [
      {
        name: "Jumping Jacks",
        sets: 4,
        reps: "45 sec",
        rest: "15 sec",
        description: "Jump with arms and legs moving in and out"
      },
      {
        name: "Mountain Climbers",
        sets: 4,
        reps: "45 sec",
        rest: "15 sec",
        description: "Alternate bringing knees to chest in plank position"
      },
      {
        name: "High Knees",
        sets: 4,
        reps: "45 sec",
        rest: "15 sec",
        description: "Run in place bringing knees up high"
      },
      {
        name: "Burpees",
        sets: 4,
        reps: "45 sec",
        rest: "15 sec",
        description: "Squat, kick feet back, do push-up, jump up"
      }
    ]
  },
  'upper-body-strength': {
    title: "Upper Body Strength",
    description: "Build muscle and strength in your upper body",
    duration: "45 min",
    difficulty: "Advanced",
    type: "Strength",
    color: "bg-brand-accent",
    exercises: [
      {
        name: "Bench Press",
        sets: 4,
        reps: "8-10",
        rest: "90 sec",
        description: "Lie on bench, lower bar to chest, push up"
      },
      {
        name: "Pull-ups",
        sets: 4,
        reps: "8-10",
        rest: "90 sec",
        description: "Hang from bar, pull body up until chin over bar"
      },
      {
        name: "Overhead Press",
        sets: 4,
        reps: "8-10",
        rest: "90 sec",
        description: "Stand with feet shoulder-width, press weight overhead"
      },
      {
        name: "Bent Over Rows",
        sets: 4,
        reps: "10-12",
        rest: "90 sec",
        description: "Bend at hips, pull weight to lower chest"
      }
    ]
  }
} as const;

// Define the type for the workout plan
type WorkoutPlan = typeof workoutPlans[keyof typeof workoutPlans];

export default function WorkoutPlanPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const plan = workoutPlans[slug as keyof typeof workoutPlans];

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
        <NotFound redirectLink="/workout" redirectMessage="Back to Workouts" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back to Workouts */}
        <div className="flex items-center mb-8">
          <BackButton href="/workout" text="Back to Workouts" />
        </div>

        {/* Workout Plan */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Badge className={`${plan.color} text-white px-3 py-1 rounded-full transform hover:scale-105 transition-transform duration-300`}>
              {plan.type}
            </Badge>
            <div className="flex items-center text-sm text-brand-dark/60 bg-brand-light/50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" />
              {plan.duration}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-brand-dark mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
            {plan.title}
          </h1>
          <p className="text-brand-dark/70 text-lg">{plan.description}</p>
        </div>

        {/* Exercises */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plan.exercises.map((exercise, index) => (
            <Card
              key={index}
              className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <CardTitle className="text-brand-dark text-xl flex items-center">
                  <Dumbbell className="w-5 h-5 mr-2 text-brand-green" />
                  {exercise.name}
                </CardTitle>
                <CardDescription className="text-brand-dark/70">{exercise.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="bg-brand-light/30 p-3 rounded-lg transform hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-brand-dark/60">Sets</p>
                    <p className="text-lg font-semibold text-brand-dark">{exercise.sets}</p>
                  </div>
                  <div className="bg-brand-light/30 p-3 rounded-lg transform hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-brand-dark/60">Reps</p>
                    <p className="text-lg font-semibold text-brand-dark">{exercise.reps}</p>
                  </div>
                  <div className="bg-brand-light/30 p-3 rounded-lg transform hover:scale-105 transition-transform duration-300">
                    <p className="text-sm text-brand-dark/60">Rest</p>
                    <p className="text-lg font-semibold text-brand-dark">{exercise.rest}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Get AI Guidance */}
        <div className="mt-12 border-t border-brand-dark/20 pt-12">
          <Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-brand-dark text-xl">
                <Zap className="w-6 h-6 mr-3 text-brand-green animate-pulse" />
                Ready to Start?
              </CardTitle>
              <CardDescription className="text-brand-dark/70">
                Track your progress and get personalized adjustments with our AI fitness assistant.
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
