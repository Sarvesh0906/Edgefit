"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dumbbell, Send, Menu, LogOut, User, Mail, X } from "lucide-react"
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
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
                <Link href="/llm-interaction">
                  <Send className="mr-2 h-5 w-5" />
                  LLM Interface
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

      {/* Chat area */}
      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-brand-green to-green-700 text-white border-b border-brand-accent/20 shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
                <AvatarImage src="/bot-img.svg" alt="Bot" className="invert" />
                <AvatarFallback className="text-black font-semibold bg-white">FC</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Fitness Assistant</h1>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>

            {/* mobile sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10">
                  <Menu className="h-5 w-5" />
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
                      <Link href="/llm-interaction">
                        <Send className="mr-2 h-5 w-5" />
                        LLM Interface
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
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-brand-light/50 via-white to-brand-light/50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${message.sender === "user"
                    ? "bg-gradient-to-r from-brand-green to-green-700 text-white"
                    : "bg-white border border-brand-accent/20"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <div className="space-y-4">
                      {message.content.split('\n').map((paragraph, index) => {
                        // Check if the paragraph is a numbered list item
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
                        // Regular paragraph
                        return (
                          <p key={index} className="text-gray-700">
                            {paragraph.split('**').map((part, i) => 
                              i % 2 === 0 ? part : <strong key={i} className="text-brand-green">{part}</strong>
                            )}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base">{message.content}</p>
                  )}
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/80" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] md:max-w-[70%] rounded-2xl p-4 bg-white border border-brand-accent/20 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-brand-green animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-brand-accent/20 bg-white p-4">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <Input
              type="text"
              placeholder="Ask about workouts, diet plans, or fitness tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-brand-accent/20 rounded-xl shadow-sm"
            />
            <Button
              type="submit"
              className="bg-brand-green hover:bg-green-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
