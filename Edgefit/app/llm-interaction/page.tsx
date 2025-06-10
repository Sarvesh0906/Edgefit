"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LLMInteractionPage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendPrompt = async () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch("https://f1fc-35-240-175-32.ngrok-free.app/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      setResponse(data.response)

      // Send to MongoDB (via your own FastAPI endpoint)
      await fetch("http://localhost:8000/bot/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, response: data.response }),
      })
    } catch (err) {
      console.error("Failed:", err)
      setResponse("Error getting response")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-4 bg-brand-light min-h-screen">
      <div className="flex justify-between mx-2">
      <h1 className="text-3xl font-bold text-brand-green">LLM Prompt Interaction</h1>

        <Link href="/chat" className="">
          <Button className="bg-black hover:bg-brand-dark/90">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
        </Link>
      </div>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
      />

      <Button onClick={sendPrompt} disabled={isLoading} className="bg-brand-green mx-2">
        {isLoading ? "Generating..." : "Generate & Save"}
      </Button>

      {response && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2 text-brand-dark italic">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
