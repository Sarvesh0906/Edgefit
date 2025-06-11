"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, Send, Menu, LogOut, User, Mail, X, ArrowLeft, AlertCircle } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  error?: boolean
}

export default function LLMInteractionPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isServerError, setIsServerError] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const sendPrompt = async () => {
    if (!prompt.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt("")
    setIsLoading(true)
    setIsServerError(false)

    try {
      // Get LLM response
      const llmResponse = await fetch('http://localhost:8000/bot/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ prompt: prompt })
      });

      if (!llmResponse.ok) {
        const errorData = await llmResponse.json().catch(() => ({}));
        throw new Error(`LLM service error: ${llmResponse.status} - ${errorData.detail || 'Unknown error'}`);
      }

      const data = await llmResponse.json();
      const response = data.response;

      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Then, save to MongoDB
      try {
        const saveRes = await fetch("http://localhost:8000/bot/save", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ prompt, response }),
        })

        if (!saveRes.ok) {
          console.error("Failed to save to database:", saveRes.status)
        }
      } catch (saveError) {
        console.error("Error saving to database:", saveError)
        // Don't throw here, as the main functionality (getting response) was successful
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later."
      
      if (errorMessage.includes("401")) {
        router.push("/")
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "I'm having trouble connecting to the LLM service. Please try again in a moment.",
          sender: "bot",
          timestamp: new Date(),
          error: true,
        },
      ])
      setIsServerError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-10 hover:bg-brand-green/10">
            <Menu className="h-5 w-5 text-brand-green" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-brand-dark text-white border-l border-brand-accent/20">
          {/* mobile sidebar title */}
          <SheetHeader>
            <SheetTitle className="flex items-center text-white px-4 gap-2">
              <Dumbbell className="h-6 w-6" />
              <span className="text-2xl font-bold">EdgeFit-AI</span>
            </SheetTitle>
          </SheetHeader>

          {/* divider */}
          <div className="bg-brand-light/20 mt-5 w-full mx-auto rounded-full">
            <div className="border-b border-brand-accent/20"></div>
          </div>

          {/* mobile sidebar content */}
          <div className="flex flex-col justify-between h-[90%]">
            <div className="space-y-4 mt-6">
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/dashboard">
                  <User className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/chat">
                  <Send className="mr-2 h-5 w-5" />
                  Chat
                </Link>
              </Button>
            </div>

            {/* mobile sidebar logout button */}
            <div className="p-6">
              <Button
                variant="outline"
                className="w-full bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-500/50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-brand-dark text-white border-r border-brand-accent/20">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center gap-4 flex-shrink-0 px-6">
            <Dumbbell className="h-6 w-6" />
            <span className="text-2xl font-bold">EdgeFit-AI</span>
          </div>

          {/* divider */}
          <div className="bg-brand-light/20 my-5 w-[90%] mx-auto rounded-full">
            <div className="border-b border-brand-accent/20"></div>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <nav className="flex-1 px-2 space-y-2">
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/dashboard">
                  <User className="mr-2 h-5 w-5" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-brand-green/10 hover:text-brand-green" asChild>
                <Link href="/chat">
                  <Send className="mr-2 h-5 w-5" />
                  Chat
                </Link>
              </Button>
            </nav>
            <div className="p-6">
              <Button
                variant="outline"
                className="w-full bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-500/50"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-brand-green to-green-700 text-white border-b border-brand-accent/20 shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
                <AvatarImage src="/bot-img.svg" alt="Bot" className="invert" />
                <AvatarFallback className="text-black font-semibold bg-white">FC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">LLM Interface</h1>
                <p className="text-xs text-white/80">Advanced AI Interaction</p>
              </div>
            </div>
            <Link href="/chat" className="absolute top-4 left-4 flex items-center text-brand-green hover:text-green-700 transition-all duration-300 z-50">
              <Button className="bg-brand-green hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 hidden md:block">Back to Chat</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-brand-light/50 via-white to-brand-light/50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-brand-green to-green-700 text-white"
                      : message.error
                      ? "bg-red-50 border border-red-200"
                      : "bg-white border border-brand-accent/20"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <div className="space-y-4">
                      {message.error ? (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="h-5 w-5" />
                          <p>{message.content}</p>
                        </div>
                      ) : (
                        message.content.split('\n').map((paragraph, index) => {
                          const listItemMatch = paragraph.match(/^(\d+)\.\s+(.+)$/);
                          if (listItemMatch) {
                            return (
                              <div key={index} className="flex gap-2">
                                <span className="font-semibold text-brand-green">{listItemMatch[1]}.</span>
                                <p className="text-gray-700">
                                  {listItemMatch[2].split('**').map((part, i) => 
                                    i % 2 === 0 ? part : <strong key={i} className="text-brand-green">{part}</strong>
                                  )}
                                </p>
                              </div>
                            );
                          }
                          return (
                            <p key={index} className="text-gray-700">
                              {paragraph.split('**').map((part, i) => 
                                i % 2 === 0 ? part : <strong key={i} className="text-brand-green">{part}</strong>
                              )}
                            </p>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base">{message.content}</p>
                  )}
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/80" : message.error ? "text-red-500" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-brand-accent/20 bg-white p-4">
          <div className="flex flex-col gap-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={4}
              className="resize-none border-brand-accent/20 rounded-xl shadow-sm"
            />
            <Button
              onClick={sendPrompt}
              disabled={isLoading}
              className="bg-brand-green hover:bg-green-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? "Generating..." : "Generate & Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
