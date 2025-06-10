import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, MessageCircle, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-brand-dark">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 text-white">
          <div className="flex items-center gap-3 font-bold text-2xl">
            <Dumbbell className="h-6 w-6" />
            <span className="">EdgeFit-AI</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-brand-light hover:text-brand-dark font-semibold text-md">Login</Button>
            </Link>

            <Link href="/signup">
              <Button className="bg-brand-green hover:bg-green-700  font-semibold text-md">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-12 md:py-24 lg:py-32 bg-gradient-to-b from-brand-light via-white to-brand-light h-full md:h-[90vh]">
        <div className="container px-4 md:px-6 flex flex-col gap-10 md:flex-row items-center justify-around h-full w-full">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 md:max-w-[50vw]">
              <h1 className="text-3xl font-bold pb-6 text-brand-green tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left">Your Personal Fitness Assistant</h1>

              <p className="max-w-[600px] pb-4 md:py-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get personalized workout plans, nutrition advice, and fitness tracking with our AI-powered chatbot.
              </p>
            </div>

            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center md:justify-start">
              <Link href="/signup">
                <Button className="bg-brand-green hover:bg-green-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" className="text-brand-dark hover:bg-brand-dark hover:text-white font-semibold">Learn More</Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:h-[400px] pt-2 md:pt-0">
            <img
              src="/hero.jpg"
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
      <section className="p-12 h-full md:h-[90vh] bg-gradient-to-b from-brand-light via-white to-brand-light" id="features">
        <div className="md:container flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center gap-2 md:pb-6 text-center">
            <h2 className="text-4xl font-bold tracking-tighter text-brand-green sm:text-4xl">Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to achieve your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8 text-center sm:w-3/4 md:w-full">
            <div className="flex flex-col items-center gap-6 border p-6 md:p-6 lg:p-10 rounded-lg bg-brand-light shadow-md">
              <div className="p-4 bg-green-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-brand-green" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h3 className="text-xl font-bold text-brand-green">24/7 Chat Support</h3>
                <p className="text-center text-gray-600 italic text-sm lg:text-base">Get answers to your fitness questions anytime, anywhere.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 border p-6 lg:p-10 rounded-lg bg-brand-light shadow-md">
              <div className="p-4 bg-green-100 rounded-full">
                <Dumbbell className="h-6 w-6 text-brand-green" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h3 className="text-xl font-bold text-brand-green">Custom Workouts</h3>
                <p className="text-center text-gray-600 italic text-sm lg:text-base">
                  Personalized workout plans based on your goals and fitness level.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 border p-6 lg:p-10 rounded-lg bg-brand-light shadow-md">
              <div className="p-4 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-brand-green" />
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h3 className="text-xl font-bold text-brand-green">Progress Tracking</h3>
                <p className="text-center text-gray-600 italic text-sm lg:text-base">
                  Monitor your fitness journey with detailed analytics and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-auto bg-brand-dark text-white">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Dumbbell className="h-6 w-6" />
            <span className="text-xl">EdgeFit-AI &copy; {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-4 text-md">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
