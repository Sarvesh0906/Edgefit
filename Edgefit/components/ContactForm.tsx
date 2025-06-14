import React, { useState, useRef } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { Mail, Phone, User, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getInquiryTypeLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'workout-plans': 'Personalized Workout Plans',
      'nutrition': 'Nutrition Advice',
      'fitness-tracking': 'Fitness Tracking',
      'ai-chatbot': 'AI Chatbot Support',
      'technical': 'Technical Support',
      'general': 'General Inquiry'
    };
    return labels[value] || value;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.message.trim() !== '' &&
      formData.inquiryType !== ''
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      );

      toast.success("Message sent successfully! We'll get back to you within 24 hours.");

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="hidden" 
          name="inquiryType" 
          value={getInquiryTypeLabel(formData.inquiryType)} 
        />
        <input 
          type="hidden" 
          name="time" 
          value={getCurrentTime()} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-brand-dark font-medium">
              <User className="w-4 h-4 text-brand-green" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
              className="border-neutral-gray"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-brand-dark font-medium">
              <Mail className="w-4 h-4 text-brand-accent" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              required
              className="border-neutral-gray"
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
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="border-neutral-gray"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-brand-dark font-medium">Inquiry Type</Label>
            <Select 
              onValueChange={(value) => handleInputChange('inquiryType', value)}
              value={formData.inquiryType}
            >
              <SelectTrigger className="border-neutral-gray">
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
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about your fitness goals, current activity level, or any specific questions you have..."
            rows={5}
            required
            className="border-neutral-gray resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isFormValid()}
          className="w-full bg-brand-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>

      <div className="mt-8 border-t border-neutral-gray/30 flex justify-between">
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 text-sm text-brand-dark/70">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand-accent" />
            <span>support@aifitness.com</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-accent" />
            <span>+1 (555) 123-FLEX</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="text-brand-dark hover:bg-brand-dark hover:text-white font-semibold transition-all duration-300">
            <Link href="/" className="flex gap-2 items-center justify-center">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;