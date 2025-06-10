"use client";

import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <div className="h-screen bg-brand-light">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Section - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-accent/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1200&fit=crop&crop=center"
            alt="Person using laptop for fitness planning"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="text-center text-white p-8">
              <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">
                Your AI Fitness Journey Starts Here
              </h1>
              <p className="text-xl drop-shadow-lg italic w-[80%] mx-auto">
                Personalized workout plans, nutrition advice, and fitness tracking powered by advanced AI technology.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-2xl">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-3xl font-bold text-brand-dark mb-4">
                Contact Our AI Fitness Team
              </h1>
              <p className="text-brand-dark/70">
                Get personalized support for your fitness journey
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;