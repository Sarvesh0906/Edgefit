import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-gray/20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-green mb-3">Get In Touch</h2>
        <p className="text-brand-dark/70">
          Ready to start your personalized fitness journey? Our AI-powered platform is here to help you achieve your goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-brand-dark font-medium">
              <User className="w-4 h-4 text-brand-green" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-brand-dark font-medium">
              <Mail className="w-4 h-4 text-brand-accent" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
              className="border-neutral-gray focus:border-brand-green focus:ring-brand-green/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-brand-dark font-medium">
              <Phone className="w-4 h-4 text-brand-accent" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="border-neutral-gray focus:border-brand-green focus:ring-brand-green/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-brand-dark font-medium">Inquiry Type</Label>
            <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
              <SelectTrigger className="border-neutral-gray focus:border-brand-green focus:ring-brand-green/20">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workout-plans">Personalized Workout Plans</SelectItem>
                <SelectItem value="nutrition">Nutrition Advice</SelectItem>
                <SelectItem value="fitness-tracking">Fitness Tracking</SelectItem>
                <SelectItem value="ai-chatbot">AI Chatbot Support</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2 text-brand-dark font-medium">
            <MessageSquare className="w-4 h-4 text-brand-accent" />
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about your fitness goals, current activity level, or any specific questions you have..."
            rows={5}
            required
            className="border-neutral-gray focus:border-brand-green focus:ring-brand-green/20 resize-none"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Send Message
        </Button>
      </form>

      <div className="mt-8 border-t border-neutral-gray/30">
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-brand-dark/70">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-accent" />
            <span>support@aifitness.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>+1 (555) 123-FLEX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;