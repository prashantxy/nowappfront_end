import Link from "next/link"
import { Button } from "./components/ui/button"
export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-6xl font-bold text-white mb-8">Welcome to ChatStream</h1>
      <p className="text-xl text-white mb-8">Connect, chat, and stream with friends in real-time!</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/chat">Start Chatting</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/stream">Go Live</Link>
        </Button>
      </div>
    </div>
  )
}

    

