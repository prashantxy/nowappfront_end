"use client"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [resolvedMessages, setResolvedMessages] = useState<any[]>([])
  const [users] = useState(["Alice", "Bob", "Charlie", "You"])

  // Handle async message content (if it's a Promise)
  useEffect(() => {
    const resolveMessages = async () => {
      const resolved = await Promise.all(
        messages.map(async (message: any) => {
          
          const content = message.content instanceof Promise ? await message.content : message.content
          return { ...message, content }
        })
      )
      setResolvedMessages(resolved)
    }

    resolveMessages()
  }, [messages]) // Re-run when messages change

  return (
    <div className="flex h-screen bg-gray-100">
      <Card className="w-64 m-4">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {users.map((user, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user}`} />
                  <AvatarFallback>{user[0]}</AvatarFallback>
                </Avatar>
                <span>{user}</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex-grow m-4">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            {resolvedMessages.map((m: { id: Key | null | undefined; role: string; content: ReactNode }) => (
              <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
