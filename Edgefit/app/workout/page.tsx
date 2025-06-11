import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Clock, Zap, Target, ArrowLeft } from 'lucide-react';

const Workouts = () => {
  const workoutPlans = [
    {
      id: 1,
      title: "Beginner Full Body",
      description: "Perfect for starting your fitness journey",
      duration: "30 min",
      difficulty: "Beginner",
      type: "Strength",
      color: "bg-brand-accent",
      slug: "beginner-full-body"
    },
    {
      id: 2,
      title: "HIIT Cardio Blast",
      description: "High-intensity interval training for fat burning",
      duration: "20 min",
      difficulty: "Intermediate",
      type: "Cardio",
      color: "bg-status-warning",
      slug: "hiit-cardio-blast"
    },
    {
      id: 3,
      title: "Upper Body Strength",
      description: "Build muscle and strength in your upper body",
      duration: "45 min",
      difficulty: "Advanced",
      type: "Strength",
      color: "bg-brand-accent",
      slug: "upper-body-strength"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="container mx-auto px-12 md:px-8 py-10">
        <div className="flex items-center">
          <Link href="/dashboard" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-all duration-300 z-50">
            <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="ml-2 hidden md:block">Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-4 animate-fade-in">AI-Powered Workout Plans</h1>
          <p className="text-brand-dark/70 text-lg max-w-2xl mx-auto">Personalized workouts based on your fitness level, goals, and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workoutPlans.map((workout, index) => (
            <Card 
              key={workout.id} 
              className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${workout.color} text-white px-3 py-1 rounded-full`}>
                    {workout.type}
                  </Badge>
                  <div className="flex items-center text-sm text-brand-dark/60 bg-brand-light/50 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    {workout.duration}
                  </div>
                </div>
                <CardTitle className="text-brand-dark text-xl">{workout.title}</CardTitle>
                <CardDescription className="text-brand-dark/70">{workout.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center bg-brand-light/30 px-3 py-1 rounded-full">
                    <Target className="w-4 h-4 mr-2 text-brand-green" />
                    <span className="text-sm font-medium text-brand-dark">{workout.difficulty}</span>
                  </div>
                </div>
                <Button asChild className="bg-brand-green hover:bg-green-700 w-full py-6 text-base font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                  <Link href={`/workout/${workout.slug}`}>Start Workout</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 animate-fade-in">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center text-brand-dark text-2xl">
              <Zap className="w-6 h-6 mr-3 text-brand-green animate-pulse" />
              Get Your Custom Workout Plan
            </CardTitle>
            <CardDescription className="text-lg text-brand-dark/70">
              Let our AI create a personalized workout plan based on your specific goals, fitness level, and available time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-brand-accent hover:bg-brand-accent/90 py-6 text-base font-semibold transition-all duration-300 transform hover:scale-[1.02]">
              <Link href="/chat">Create Custom Plan with AI</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Workouts;

// Add these styles to your global CSS file
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
`;