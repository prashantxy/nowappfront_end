import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface ChatMessageProps {
  content: string
  sender: string
  timestamp: string
  isCurrentUser: boolean
}

export function ChatMessage({ content, sender, timestamp, isCurrentUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${sender}`} />
          <AvatarFallback>{sender[0]}</AvatarFallback>
        </Avatar>
        <div className={`mx-2 ${isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200"} rounded-lg p-3 max-w-xs`}>
          <p>{content}</p>
          <span className="text-xs text-gray-500 mt-1 block">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}

