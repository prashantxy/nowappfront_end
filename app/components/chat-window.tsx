import { ScrollArea } from "./ui/scroll-area"
import { ChatMessage } from "./chat-message"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
}

interface ChatWindowProps {
  messages: Message[]
  currentUser: string
}

export function ChatWindow({ messages, currentUser }: ChatWindowProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
          isCurrentUser={message.sender === currentUser}
        />
      ))}
    </ScrollArea>
  )
}

