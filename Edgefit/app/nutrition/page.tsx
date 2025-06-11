import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Apple, Coffee, Utensils, ArrowLeft, Heart, Leaf } from 'lucide-react';

const Nutrition = () => {
  const mealPlans = [
    {
      id: 1,
      title: "Weight Loss Plan",
      description: "Balanced meals for sustainable weight loss",
      calories: "1,800 cal/day",
      type: "Weight Loss",
      icon: <Heart className="w-5 h-5" />,
      color: "bg-brand-accent",
      slug: "weight-loss-plan"
    },
    {
      id: 2,
      title: "Muscle Building",
      description: "High-protein meals to support muscle growth",
      calories: "2,400 cal/day",
      type: "Muscle Gain",
      icon: <Utensils className="w-5 h-5" />,
      color: "bg-brand-accent",
      slug: "muscle-building"
    },
    {
      id: 3,
      title: "Maintenance Plan",
      description: "Balanced nutrition for maintaining current weight",
      calories: "2,000 cal/day",
      type: "Maintenance",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-status-warning",
      slug: "maintenance-plan"
    }
  ];

  const nutritionTips = [
    "Stay hydrated - aim for 8 glasses of water daily",
    "Include protein in every meal for muscle maintenance",
    "Eat a variety of colorful fruits and vegetables",
    "Don't skip meals - maintain consistent eating patterns"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center">
          <Link href="/dashboard" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-all duration-300 z-50">
            <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
              <span className="ml-2 hidden md:block">Back to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-dark mb-4 animate-fade-in">AI Nutrition Guidance</h1>
          <p className="text-brand-dark/70 text-lg max-w-2xl mx-auto">Personalized meal plans and nutrition advice tailored to your goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mealPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${plan.color} text-white flex items-center px-3 py-1 rounded-full`}>
                    {plan.icon}
                    <span className="ml-2 font-medium">{plan.type}</span>
                  </Badge>
                  <span className="text-sm font-medium text-brand-dark/60 bg-brand-light/50 px-3 py-1 rounded-full">{plan.calories}</span>
                </div>
                <CardTitle className="text-brand-dark text-xl">{plan.title}</CardTitle>
                <CardDescription className="text-brand-dark/70">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-brand-green hover:bg-green-700 w-full py-6 text-base font-medium transition-all duration-300 hover:shadow-lg">
                  <Link href={`/nutrition/${plan.slug}`}>View Meal Plan</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-brand-dark text-xl">
                <Apple className="w-6 h-6 mr-3 text-brand-green" />
                Daily Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {nutritionTips.map((tip, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-brand-dark group-hover:text-brand-green transition-colors duration-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-brand-dark text-xl">
                <Coffee className="w-6 h-6 mr-3 text-brand-green" />
                Get Personalized Advice
              </CardTitle>
              <CardDescription className="text-brand-dark/70 text-base">
                Let our AI nutritionist create a custom meal plan based on your dietary preferences, restrictions, and goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button asChild className="bg-brand-green hover:bg-green-700 w-full py-6 text-base font-medium transition-all duration-300 hover:shadow-lg">
                  <Link href="/contact">Book Session</Link>
                </Button>
                <Button asChild variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white w-full py-6 text-base font-medium transition-all duration-300">
                  <Link href="/chat">Ask AI Nutritionist</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;