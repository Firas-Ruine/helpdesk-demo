"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { TicketConversation } from "@/components/ticket-conversation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, User, Building2, Tag, AlertCircle } from "lucide-react"
import { getTicketById } from "@/lib/mock/ticket-data"

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const myParams = useParams();
  
  const ticketData = getTicketById(myParams?.id)

  const [status, setStatus] = useState(ticketData ? ticketData?.status : "New")
  const [messages, setMessages] = useState(ticketData ? ticketData?.conversation || [] : [])

  if (!ticketData) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Ticket not found</h2>
          <p className="text-muted-foreground">The ticket you're looking for doesn't exist or has been deleted.</p>
          <Button
            className="mt-4 bg-primary-500 hover:bg-primary-600"
            onClick={() => router.push("/tickets/in-progress")}
          >
            Back to Tickets
          </Button>
        </div>
      </div>
    )
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        content: `Status changed to ${newStatus}`,
        sender: ticketData?.assignee,
        timestamp: new Date(),
        type: "status",
      },
    ])
  }

  const handleSendMessage = (content: string, type: "email" | "comment") => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: ticketData?.assignee,
      timestamp: new Date(),
      type,
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{ticketData?.subject}</h1>
            <p className="text-sm text-muted-foreground">Ticket #{ticketData?.id}</p>
          </div>
        </div>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Solved">Solved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
              <CardDescription>View and respond to the ticket conversation</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <TicketConversation messages={messages} onSendMessage={handleSendMessage} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Priority</span>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-800">
                  {ticketData?.priority}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{ticketData?.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Created {ticketData?.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{ticketData?.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{ticketData?.customer.email}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{ticketData?.customer.company}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

