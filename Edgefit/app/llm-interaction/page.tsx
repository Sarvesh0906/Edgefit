
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">LLM Prompt Interaction</h1>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
      />
      <Button onClick={sendPrompt} disabled={isLoading} className="bg-green-600">
        {isLoading ? "Generating..." : "Generate & Save"}
      </Button>
      {response && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2 className="font-semibold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
