"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, Send, Menu, LogOut, User, Settings, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your personal fitness assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendToBackend = async (prompt: string): Promise<string> => {
    const res = await fetch("http://localhost:8000/bot/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust if token stored elsewhere
      },
      body: JSON.stringify({ prompt }),
    })

    if (!res.ok) {
      throw new Error("Failed to get response from server")
    }

    const data = await res.json()
    return data.response
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const botReply = await sendToBackend(userMessage.content)

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botReply,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Oops! Something went wrong. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    // In a real app, you would clear the token and call the logout API
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className="flex h-screen">
      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-10">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Dumbbell className="h-5 w-5 text-brand-green mr-2" />
              EdgeFit-AI
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between h-full py-4">
            <div className="space-y-4 mt-8">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Link>
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-brand-dark text-white border-r">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
          <div className="flex items-center gap-4 flex-shrink-0 px-6">
            <Dumbbell className="h-6 w-6" />
            <span className="text-2xl font-bold">EdgeFit-AI</span>
          </div>

          {/* divider */}
          <div className="bg-brand-light my-5 w-[90%] mx-auto">
            <div className="border-b-2 border-white"></div>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <nav className="flex-1 px-2 space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/llm-interaction">
                  <Send className="mr-2 h-5 w-5" />
                  LLM Interface
                </Link>
              </Button>

            </nav>
            <div className="p-6">
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
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-10 bg-brand-green text-white border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/bot-img.svg" alt="Bot" className="invert" />
                <AvatarFallback className="text-black font-semibold">FC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Fitness Assistant</h1>
                <p className="text-xs text-gray-200">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={handleLogout}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-brand-light">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-brand-green text-white" : "bg-white border"
                    }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-white border">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t bg-br- p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, diet plans, or fitness tips..."
              className="flex-1 bg-brand-a"
              disabled={isLoading}
            />
            <Button type="submit" className="bg-brand-green hover:bg-green-700" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
