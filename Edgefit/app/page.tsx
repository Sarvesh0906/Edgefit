import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Dumbbell, MessageCircle, Shield, Phone, Mail, Clock, HeadphonesIcon } from "lucide-react"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="border-b bg-brand-dark">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 text-white">
          <div className="flex items-center gap-3 font-bold text-2xl">
            <Dumbbell className="h-6 w-6" />
            <span className="">EdgeFit-AI</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button asChild variant="ghost" className="hover:bg-brand-light hover:text-brand-dark font-semibold text-md">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild className="bg-brand-green hover:bg-green-700 font-semibold text-md">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-12 md:py-24 lg:py-32 bg-gradient-to-b from-brand-light via-white to-brand-light h-full md:h-screen">
        <div className="container px-4 md:px-6 flex flex-col gap-10 md:flex-row items-center justify-around h-full w-full">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 md:max-w-[50vw]">
              <h1 className="text-3xl font-bold pb-6 text-brand-green tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left">Your Personal Fitness Assistant</h1>

              <p className="max-w-[600px] pb-4 md:py-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get personalized workout plans, nutrition advice, and fitness tracking with our AI-powered chatbot.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center md:justify-start">
              <Button asChild className="bg-brand-green hover:bg-green-700">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-brand-dark hover:bg-brand-dark hover:text-white font-semibold">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:h-[400px] pt-2 md:pt-0">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"
              alt="Fitness Chatbot"
              className="rounded-lg object-cover shadow-md"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="bg-brand-light md:hidden">
        <div className="border-b-2 border-gray-400/60 w-[80%] mx-auto"></div>
      </div>

      {/* Features Section */}
      <section className="p-12 md:py-24 lg:py-32 bg-gradient-to-b from-brand-light via-white to-brand-light h-full" id="features">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-2 md:pb-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter text-primary sm:text-4xl">Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to achieve your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '0ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary py-2">24/7 Chat Support</CardTitle>
                <CardDescription className="italic w-[80%] mx-auto">Get answers to your fitness questions anytime, anywhere.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary py-2">Custom Workouts</CardTitle>
                <CardDescription className="italic w-[80%] mx-auto">
                  Personalized workout plans based on your goals and fitness level.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary py-2">Progress Tracking</CardTitle>
                <CardDescription className="italic w-[80%] mx-auto">
                  Monitor your fitness journey with detailed analytics and insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark text-white p-12 md:py-24 lg:py-32 min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who have achieved their goals with AI-powered fitness guidance.</p>
          <Button asChild variant="secondary" className="text-lg px-8 py-3">
            <Link href="/login">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-12 lg:py-16 bg-gradient-to-b from-brand-light via-white to-brand-light min-h-[90vh] flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter text-primary mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Need help or have questions? Our team is here to support you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '0ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <CardTitle className="text-primary">Phone Support</CardTitle>
                <CardDescription>24/7 direct support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm mb-2">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <CardTitle className="text-primary">Email Support</CardTitle>
                <CardDescription className="italic">Detailed responses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm mb-2">support@edgefit-ai.com</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <CardTitle className="text-primary">Live Chat</CardTitle>
                <CardDescription className="italic">Instant AI assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm mb-2">Available 24/7</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="w-16 h-16 bg-neutral-gray/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Consultation</CardTitle>
                <CardDescription className="italic">Book expert sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm mb-2">Free 30-min sessions</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-brand-green hover:bg-green-700 text-white font-semibold">
              <Link href="/contact">
                View All Contact Options
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <div className="fixed bottom-24 right-6">
        <BackToTop />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
