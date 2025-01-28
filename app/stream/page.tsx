"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"

interface StreamStats {
  viewers: number
  duration: number
  isLive: boolean
  isMuted: boolean
  isCameraOn: boolean
}

const Icons = {
  Record: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  Mic: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

export default function StreamPage() {
  const [streamTitle, setStreamTitle] = useState("")
  const [streamStats, setStreamStats] = useState<StreamStats>({
    viewers: 0,
    duration: 0,
    isLive: false,
    isMuted: false,
    isCameraOn: true
  })

  const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStream = () => {
    setStreamStats(prev => ({ ...prev, isLive: true }))
    const interval = setInterval(() => {
      setStreamStats(prev => ({
        ...prev,
        viewers: prev.viewers + Math.floor(Math.random() * 3),
        duration: prev.duration + 1
      }))
    }, 1000)
    return () => clearInterval(interval)
  }

  const endStream = () => {
    setStreamStats(prev => ({ ...prev, isLive: false, viewers: 0, duration: 0 }))
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-4xl bg-gray-900 border-gray-800">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-200">Live Stream</CardTitle>
            {streamStats.isLive && (
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-red-500">
                  <Icons.Record />
                  <span className="ml-2">LIVE</span>
                </span>
                <span className="text-gray-400">{formatDuration(streamStats.duration)}</span>
                <span className="text-gray-400">{streamStats.viewers} viewers</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="aspect-video bg-gray-950 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              {streamStats.isLive ? "Broadcasting..." : "Stream Preview"}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 to-transparent">
              <div className="flex items-center space-x-4">
                <Button
                  variant="default"
                  onClick={() => setStreamStats(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                  className={`text-gray-200 hover:text-gray-100 ${streamStats.isMuted ? 'bg-red-500/20' : ''}`}
                >
                  <Icons.Mic />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStreamStats(prev => ({ ...prev, isCameraOn: !prev.isCameraOn }))}
                  className={`text-gray-200 hover:text-gray-100 ${!streamStats.isCameraOn ? 'bg-red-500/20' : ''}`}
                >
                  <Icons.Camera />
                </Button>
              </div>
            </div>
          </div>
          <Input
            placeholder="Enter stream title..."
            value={streamTitle}
            onChange={(e) => setStreamTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-blue-500"
            disabled={streamStats.isLive}
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-800 p-6">
          {!streamStats.isLive ? (
            <Button
              onClick={startStream}
              className="bg-blue-600 hover:bg-blue-700 text-gray-100"
              disabled={!streamTitle}
            >
              Start Stream
            </Button>
          ) : (
            <Button
              onClick={endStream}
              variant="default"
              className="bg-red-600 hover:bg-red-700 text-gray-100"
            >
              End Stream
            </Button>
          )}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600"
            >
              Schedule
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600"
            >
              Settings
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
