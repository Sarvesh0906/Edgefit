"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Dumbbell, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" 
import { BackButton } from "@/components/BackButton"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Login failed")
      }

      // Store token and user data
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // If remember me is checked, store the token in localStorage with a longer expiry
      if (formData.rememberMe) {
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 30) // 30 days from now
        localStorage.setItem("tokenExpiry", expiryDate.toISOString())
      }

      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Login failed")
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
            alt="Person starting their fitness journey"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="text-center text-white p-8">
              <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">
                Welcome Back!
              </h1>
              <p className="text-xl drop-shadow-lg italic w-[80%] mx-auto">
                Continue your fitness journey with EdgeFit's AI-powered workouts and nutrition plans.
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
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Sign In</h2>
              <p className="text-brand-dark/70">Welcome back to your fitness journey</p>
            </div>

            {/* Back to Home */}
            <BackButton href="/" text="Back to Home" className="absolute top-4 left-4"/>

            <Card className="w-full shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center hidden lg:block">Sign In</CardTitle>
                <CardDescription className="text-center hidden lg:block">
                  Welcome back to your fitness journey
                </CardDescription>
              </CardHeader>

              <CardContent>
                {isLoading && <LoadingSpinner fullScreen text="Signing in..." />}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      className={`${errors.username ? "border-red-500" : ""} bg-white`}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${errors.password ? "border-red-500" : ""} bg-white`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={handleCheckboxChange}
                        className="border-brand-green data-[state=checked]:bg-brand-green data-[state=checked]:text-white"
                      />
                      <Label htmlFor="remember" className="text-sm font-normal">
                        Remember me for 30 days
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-brand-green hover:text-green-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full bg-brand-green hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
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
