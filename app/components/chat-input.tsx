import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
      />
      <Button type="submit">
        <PaperAirplaneIcon className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  )
}

