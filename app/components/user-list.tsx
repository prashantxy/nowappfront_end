import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface User {
  id: string
  name: string
  status: "online" | "offline"
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className={`text-xs ${user.status === "online" ? "text-green-500" : "text-gray-500"}`}>{user.status}</p>
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}

