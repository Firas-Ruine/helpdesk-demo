"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Paperclip, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  sender: {
    name: string
    avatar: string
    email: string
  }
  timestamp: Date
  type: "email" | "comment" | "status"
}

interface TicketConversationProps {
  messages: Message[]
  onSendMessage: (content: string, type: "email" | "comment") => void
}

export function TicketConversation({ messages, onSendMessage }: TicketConversationProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messageType, setMessageType] = useState<"email" | "comment">("comment")

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, messageType)
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
              <AvatarFallback>
                {message.sender.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{message.sender.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
                {message.type !== "email" && (
                  <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded">
                    {message.type === "comment" ? "Internal Note" : "Status Change"}
                  </span>
                )}
              </div>
              <Card className="mt-2 p-4">
                <div className="whitespace-pre-wrap">{message.content}</div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 space-y-4">
        <div className="flex gap-4">
          <Select value={messageType} onValueChange={(value: "email" | "comment") => setMessageType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select message type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Reply to Customer</SelectItem>
              <SelectItem value="comment">Internal Note</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder={messageType === "email" ? "Type your reply..." : "Add an internal note..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSend} className="bg-primary-500 hover:bg-primary-600">
            <Send className="mr-2 h-4 w-4" />
            {messageType === "email" ? "Send Reply" : "Add Note"}
          </Button>
        </div>
      </div>
    </div>
  )
}

