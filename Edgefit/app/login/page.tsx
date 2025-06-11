"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dumbbell, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
      rememberMe: checked,
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

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
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email, // Mapping email input to backend's "username"
          password: formData.password,
        }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()
      localStorage.setItem("token", data.access_token) // Store the token

      router.push("/dashboard") // Redirect to chat page
    } catch (error: any) {
      console.error("Login failed:", error)
      setErrors((prev) => ({ ...prev, password: "Invalid credentials" }))
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
            src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=1200&fit=crop&crop=center"
            alt="Person tracking fitness progress on phone"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="text-center text-white p-8">
              <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">
                Welcome Back to EdgeFit
              </h1>
              <p className="text-xl drop-shadow-lg italic w-[80%] mx-auto">
                Continue your fitness journey with personalized AI-powered workouts and nutrition plans.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 md:p-16 xl:p-24">
          <div className="w-full max-w-2xl">
            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Dumbbell className="h-8 w-8 text-brand-green" />
                <h1 className="text-3xl font-bold text-brand-green">EdgeFit-AI</h1>
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Welcome Back</h2>
              <p className="text-brand-dark/70">Login to continue your fitness journey</p>
            </div>

            <Link href="/" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-all duration-300 z-50">
              <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 hidden md:block">Back to Home</span>
              </Button>
            </Link>

            <Card className="w-full shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center hidden lg:block">Welcome Back</CardTitle>
                <CardDescription className="text-center hidden lg:block">
                  Login to your account to continue your fitness journey
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-brand-green hover:text-green-700">
                        Forgot password?
                      </Link>
                    </div>
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-brand-green hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-brand-green hover:text-green-700 font-medium">
                    Sign up
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
