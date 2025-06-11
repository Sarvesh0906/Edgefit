"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dumbbell, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeTerms: checked,
    })
    if (errors.agreeTerms) {
      setErrors({
        ...errors,
        agreeTerms: "",
      })
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email, // assuming email is used as username
          password: formData.password,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail || "Registration failed")
      }

      // Optionally show success toast or notification here

      // Redirect to login or chat page
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup failed:", error.message)
      alert(error.message || "Something went wrong during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Section - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-accent/20 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1200&fit=crop&crop=center"
            alt="Person starting their fitness journey"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="text-center text-white p-8">
              <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">
                Start Your Fitness Journey
              </h1>
              <p className="text-xl drop-shadow-lg italic w-[80%] mx-auto">
                Join EdgeFit today and experience personalized AI-powered workouts and nutrition plans.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-12 md:px-16 xl:p-20">
          <div className="w-full max-w-2xl">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Dumbbell className="h-8 w-8 text-brand-green" />
                <h1 className="text-3xl font-bold text-brand-green">EdgeFit-AI</h1>
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Create an Account</h2>
              <p className="text-brand-dark/70">Sign up to start your fitness journey</p>
            </div>

            <Link href="/" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-all duration-300 z-50">
              <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 hidden md:block">Back to Home</span>
              </Button>
            </Link>

            <Card className="w-full shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center hidden lg:block">Create an Account</CardTitle>
                <CardDescription className="text-center hidden lg:block">
                  Sign up to start your fitness journey with our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${errors.name ? "border-red-500" : ""} bg-white`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${errors.email ? "border-red-500" : ""} bg-white`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${errors.password ? "border-red-500" : ""} bg-white`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${errors.confirmPassword ? "border-red-500" : ""} bg-white`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={handleCheckboxChange}
                      className={errors.agreeTerms ? "border-red-500" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the{" "}
                        <Link href="#" className="text-brand-green hover:text-green-700 underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-brand-green hover:text-green-700 underline">
                          Privacy Policy
                        </Link>
                      </Label>
                      {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-brand-green hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link href="/login" className="text-brand-green hover:text-green-700 font-medium">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
