import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Brain, Users, Target, Shield, ArrowLeft, Code, Star, Award } from 'lucide-react';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Intelligence",
      description: "Advanced algorithms analyze your personal data to create truly customized fitness and nutrition plans."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Approach",
      description: "Every recommendation is tailored to your unique weight, height, age, and fitness goals."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert-Backed Content",
      description: "Our AI is trained on knowledge from certified trainers and nutritionists worldwide."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Your personal health data is encrypted and protected with industry-standard security measures."
    }
  ];

  const teamMembers = [
    {
      name: "Sarvesh Chaurasia",
      role: "Full Stack Developer & UI/UX Designer",
      description: "I am a full stack developer and UI/UX designer. I am a student of Computer Science and Engineering at IIIT Vadodara. I am a passionate about web development and UI/UX design. I am a quick learner and I am always looking to improve my skills.",
      avatar: "/avatars/sarvesh.jpg"
    },
    {
      name: "Shubham Gupta",
      role: "Backend Developer",
      description: "I am a backend developer. I am a student of Computer Science and Engineering at IIIT Vadodara. I am a passionate about backend development and I am a quick learner and I am always looking to improve my skills.",
      avatar: "/avatars/shubham.jpg"
    },
    {
      name: "Nenavath Rahul",
      role: "Frontend Developer",
      description: "I am a frontend developer. I am a student of Computer Science and Engineering at IIIT Vadodara. I am a passionate about frontend development and I am a quick learner and I am always looking to improve my skills.",
      avatar: "/avatars/rahul.jpg"
    },
    {
      name: "Rishi Raghuvanshi",
      role: "AI & Fitness Expert",
      description: "I am an AI and fitness expert. I am a student of Computer Science and Engineering at IIIT Vadodara. I am a passionate about AI and fitness and I am a quick learner and I am always looking to improve my skills.",
      avatar: "/avatars/rishi.jpg"
    }
  ];

  const technologies = [
    {
      name: "Machine Learning & LLM Models",
      description: "We use machine learning and LLM models to analyze your personal data so that our website is as accurate and efficient as possible, and create truly customized fitness and nutrition plans."
    },
    {
      name: "Next.js & Tailwind CSS",
      description: "A React framework for building server-side rendered and static websites and a CSS framework for building responsive and intuitive user interfaces."
    },
    {
      name: "Mobile-First Design & MongoDB",
      description: "We use MongoDB as our database to store user data and preferences. We use mobile-first design and responsive design to ensure that our website is accessible on all devices."
    }
  ];

  const testimonials = [
    {
      quote: "EdgeFit transformed my fitness journey. The AI recommendations are spot-on!",
      author: "Emma Thompson",
      role: "Fitness Enthusiast"
    },
    {
      quote: "Finally, a fitness app that understands my unique needs and adapts to my progress.",
      author: "David Park",
      role: "Marathon Runner"
    },
    {
      quote: "The personalized nutrition advice has been a game-changer for my health goals.",
      author: "Lisa Martinez",
      role: "Health Coach"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
      <div className="container mx-auto p-12 md:px-24 lg:px-32">
        <div className="flex items-center mb-12">
          <Link href="/" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-colors duration-300 z-50">
            <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
              About AI Fitness Assistant
            </h1>
            <p className="text-lg md:text-xl text-brand-dark/70 max-w-2xl mx-auto italic leading-relaxed">
              Revolutionizing personal fitness through artificial intelligence, delivering customized workout plans and nutrition advice that evolve with you.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-4 lg:p-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-dark">
                    <div className="text-brand-green mr-3 p-2 bg-brand-green/10 rounded-lg">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brand-dark/70 text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <Card className="border-brand-accent/20 mb-20 hover:shadow-xl transition-all duration-300 p-2 sm:p-4 lg:p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle className="text-brand-dark text-center text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-dark/80 text-center leading-relaxed text-lg">
                We believe that everyone deserves access to personalized fitness guidance. Our AI-powered platform democratizes expert-level fitness and nutrition advice, making it accessible to people of all fitness levels and backgrounds. By leveraging cutting-edge artificial intelligence, we create dynamic, adaptive plans that grow and evolve with your progress, ensuring you always have the support you need to reach your health and fitness goals.
              </p>
            </CardContent>
          </Card>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
              Our Expert Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-4 lg:p-6 animate-fade-in" style={{ animationDelay: `${500 + index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 border-2 border-brand-green">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-brand-green/10 text-brand-green text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-brand-dark text-xl">{member.name}</CardTitle>
                        <CardDescription className="text-brand-green font-medium text-lg italic">{member.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brand-dark/70 text-md">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
              Our Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <Card key={index} className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-4 animate-fade-in" style={{ animationDelay: `${700 + index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-brand-dark text-xl">
                      <Code className="w-8 h-8 text-brand-green mr-3 p-2 bg-brand-green/10 rounded-lg" />
                      {tech.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brand-dark/70 text-lg text-justify">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-brand-dark text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-green-700">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-2 sm:p-4 animate-fade-in" style={{ animationDelay: `${1000 + index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-brand-dark/80 italic text-lg">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-brand-dark text-lg">{testimonial.author}</p>
                    <p className="text-brand-dark/70">{testimonial.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-6 mb-10">
            <h3 className="text-3xl font-semibold text-brand-dark mb-6">Ready to Start Your Journey?</h3>
            <div className="space-x-6">
              <Button asChild className="bg-brand-green hover:bg-green-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-green hover:border-brand-dark text-brand-green hover:bg-brand-dark hover:text-white text-lg px-8 py-6 transition-all duration-300">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />

      <Footer />
    </div>
  );
};

export default About;