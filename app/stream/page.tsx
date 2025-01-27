"use client"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"

export default function StreamPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Live Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-black mb-4 flex items-center justify-center text-white">
            Live Stream Placeholder
          </div>
          <Input placeholder="Stream Title" className="mb-4" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Start Stream</Button>
          <Button>End Stream</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

