"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { Activity, Target, Utensils, MessageSquare, TrendingUp, LogOut } from 'lucide-react';
import Footer from '@/components/Footer';

const Dashboard = () => {
	const router = useRouter()

	const handleLogout = () => {
		// In a real app, you would clear the token and call the logout API
		localStorage.removeItem("token")
		router.push("/")
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

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Card className="border-brand-accent/20 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<Activity className="w-6 h-6 mr-3 text-status-success" />
								Recent Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 bg-brand-light/50 rounded-xl hover:bg-brand-light/70 transition-colors duration-200">
									<span className="text-brand-dark font-medium">Upper Body Workout</span>
									<span className="text-sm text-brand-dark/60 bg-white px-3 py-1 rounded-full">Today</span>
								</div>
								<div className="flex items-center justify-between p-4 bg-brand-light/50 rounded-xl hover:bg-brand-light/70 transition-colors duration-200">
									<span className="text-brand-dark font-medium">Nutrition Plan Updated</span>
									<span className="text-sm text-brand-dark/60 bg-white px-3 py-1 rounded-full">Yesterday</span>
								</div>
								<div className="flex items-center justify-between p-4 bg-brand-light/50 rounded-xl hover:bg-brand-light/70 transition-colors duration-200">
									<span className="text-brand-dark font-medium">Goal Progress Check</span>
									<span className="text-sm text-brand-dark/60 bg-white px-3 py-1 rounded-full">2 days ago</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-brand-accent/20 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
						<CardHeader>
							<CardTitle className="flex items-center text-brand-dark text-xl">
								<TrendingUp className="w-6 h-6 mr-3 text-status-warning" />
								Progress Overview
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-brand-dark font-medium">Weekly Goal</span>
										<span className="text-brand-dark font-medium">75%</span>
									</div>
									<div className="w-full bg-neutral-gray/30 rounded-full h-3 overflow-hidden">
										<div className="bg-status-success h-3 rounded-full transition-all duration-500 ease-out" style={{ width: '75%' }}></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between text-sm mb-2">
										<span className="text-brand-dark font-medium">Monthly Target</span>
										<span className="text-brand-dark font-medium">60%</span>
									</div>
									<div className="w-full bg-neutral-gray/30 rounded-full h-3 overflow-hidden">
										<div className="bg-brand-accent h-3 rounded-full transition-all duration-500 ease-out" style={{ width: '60%' }}></div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Dashboard;