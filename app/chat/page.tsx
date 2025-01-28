"use client"
import { useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp?: string
  isRead?: boolean
}

interface User {
  name: string
  status: 'online' | 'offline'
  lastSeen: string
}

const Icons = {
  Users: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Send: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [resolvedMessages, setResolvedMessages] = useState<Message[]>([])
  const [users] = useState<User[]>([
    { name: "Alice", status: "online", lastSeen: "Just now" },
    { name: "Bob", status: "offline", lastSeen: "2h ago" },
    { name: "Charlie", status: "online", lastSeen: "Just now" },
    { name: "You", status: "online", lastSeen: "Just now" }
  ])
  const [showUserList, setShowUserList] = useState(true)

  useEffect(() => {
    const resolveMessages = async () => {
      const resolved = await Promise.all(
        messages.map(async (message: any) => {
          const content = message.content instanceof Promise ? await message.content : message.content
          return {
            ...message,
            content,
            timestamp: new Date().toLocaleTimeString(),
            isRead: true
          }
        })
      )
      setResolvedMessages(resolved)
    }
    resolveMessages()
  }, [messages])

  return (
    <div className="flex h-screen bg-gray-950">
      <div className={`${showUserList ? 'w-72' : 'w-16'} transition-all duration-300 ease-in-out`}>
        <Card className="h-full m-2 bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center text-gray-200">
              <span className="mr-2"><Icons.Users /></span>
              {showUserList && "Users"}
            </CardTitle>
            <Button 
              variant="outline"
              onClick={() => setShowUserList(!showUserList)}
              className="text-gray-400 hover:text-gray-200"
            >
              <Icons.Users />
            </Button>
          </CardHeader>
          {showUserList && (
            <CardContent>
              <ScrollArea className="h-[calc(100vh-140px)]">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 mb-4 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback className="bg-gray-700">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 
                        ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-200">{user.name}</span>
                      <span className="text-xs text-gray-400">{user.lastSeen}</span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          )}
        </Card>
      </div>

      <Card className="flex-grow m-2 bg-gray-900 border-gray-800">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-gray-200">Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4 p-4">
              {resolvedMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col max-w-[70%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        m.role === "user"
                          ? "bg-blue-600 text-gray-100"
                          : "bg-gray-800 text-gray-200"
                      }`}
                    >
                      {m.content}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{m.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t border-gray-800">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500"
            />
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-gray-100"
            >
              <span className="mr-2"><Icons.Send /></span>
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
