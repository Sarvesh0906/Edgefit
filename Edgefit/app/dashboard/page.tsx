"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { Activity, Target, Utensils, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Footer from '@/components/Footer';

const Dashboard = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate loading data
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	const handleLogout = () => {
		// In a real app, you would clear the token and call the logout API
		localStorage.removeItem("token")
		router.push("/")
	}

	if (isLoading) {
		return <LoadingSpinner fullScreen text="Loading your dashboard..." />
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-brand-light">
			<div className="container mx-auto p-12 lg:p-8">
				<div className="mb-7 flex justify-between items-center gap-5 px-6">
					<div>
						<h1 className="text-4xl font-bold text-brand-dark mb-3 tracking-tight">Your Fitness Dashboard</h1>
						<p className="text-brand-dark/70 text-lg">Track your progress and access your personalized AI fitness tools</p>
					</div>

					<div>
						<Button
							variant="outline"
							className="w-fit bg-red-600 hover:bg-red-700 text-white hover:text-white"
							onClick={handleLogout}
						>
							<LogOut className="h-5 w-5" />
							Logout
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
				{/* Workout Plans */}
					<Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<Target className="w-6 h-6 mr-3 text-brand-green" />
								Workout Plans
							</CardTitle>
							<CardDescription className="text-base">AI-generated workouts tailored to your goals</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild className="bg-brand-green hover:bg-green-700 w-full text-base py-6 transition-all duration-300">
								<Link href="/workout">View Plans</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Nutrition Guide */}
					<Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '100ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<Utensils className="w-6 h-6 mr-3 text-brand-green" />
								Nutrition Guide
							</CardTitle>
							<CardDescription className="text-base">Personalized meal plans and nutrition advice</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild className="bg-brand-green hover:bg-green-700 w-full text-base py-6 transition-all duration-300">
								<Link href="/nutrition">Explore Nutrition</Link>
							</Button>
						</CardContent>
					</Card>

					{/* AI Assistant */}
					<Card className="border-brand-accent/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<MessageSquare className="w-6 h-6 mr-3 text-brand-green" />
								AI Assistant
							</CardTitle>
							<CardDescription className="text-base">Chat with our AI for instant fitness advice</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild variant="outline" className="border-brand-accent text-brand-green hover:bg-brand-accent hover:text-white w-full text-base py-6 transition-all duration-300">
								<Link href="/chat">Start Chat</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
					<Card className="border-brand-accent/20 bg-white/80 backdrop-blur-sm animate-fade-in lg:col-span-3" style={{ animationDelay: '300ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<Activity className="w-6 h-6 mr-3 text-status-success" />
								Fitness Tips
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="p-4 bg-brand-light/50 rounded-xl">
									<h3 className="text-brand-dark font-medium mb-2">Stay Hydrated</h3>
									<p className="text-brand-dark/70">Drink at least 8 glasses of water daily to maintain optimal performance.</p>
								</div>
								<div className="p-4 bg-brand-light/50 rounded-xl">
									<h3 className="text-brand-dark font-medium mb-2">Proper Form</h3>
									<p className="text-brand-dark/70">Focus on maintaining correct form during exercises to prevent injuries.</p>
								</div>
								<div className="p-4 bg-brand-light/50 rounded-xl">
									<h3 className="text-brand-dark font-medium mb-2">Rest Days</h3>
									<p className="text-brand-dark/70">Remember to take rest days to allow your body to recover and grow stronger.</p>
								</div>
								<div className="p-4 bg-brand-light/50 rounded-xl">
									<h3 className="text-brand-dark font-medium mb-2">Consistency is Key</h3>
									<p className="text-brand-dark/70">Small, consistent efforts over time yield better results than intense, sporadic workouts.</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="lg:col-span-2 space-y-8">
						<Card className="border-brand-accent/20 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '350ms' }}>
							<CardHeader>
								<CardTitle className="flex items-center text-brand-dark text-xl">
									<Activity className="w-6 h-6 mr-3 text-brand-green" />
									Daily Motivation
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="p-4 bg-brand-light/50 rounded-xl">
									<blockquote className="text-brand-dark/80 italic mb-2 text-md">
										"Success isn't always about greatness. It's about consistency. Consistent hard work gains success. Greatness will come."
									</blockquote>
									<p className="text-brand-dark/60 text-sm text-right">- Dwayne "The Rock" Johnson</p>
								</div>
							</CardContent>
						</Card>

						<Card className="border-brand-accent/20 bg-white/80 backdrop-blur-sm animate-fade-in h-fit" style={{ animationDelay: '400ms' }}>
							<CardHeader>
								<CardTitle className="flex items-center text-brand-dark text-xl">
									<MessageSquare className="w-6 h-6 mr-3 text-status-warning" />
									Get in Touch
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<p className="text-brand-dark/70">Have questions or need support? Our team is here to help you on your fitness journey.</p>
									<Button asChild className="bg-brand-green hover:bg-green-700 w-full text-base py-6 transition-all duration-300">
										<Link href="/contact">Contact Support</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Dashboard;