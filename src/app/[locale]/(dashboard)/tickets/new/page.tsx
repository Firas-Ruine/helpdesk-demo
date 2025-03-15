"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import useTicketTypesQuery from "@/hooks/ticket/useTicketType"
import useTicketNaturesQuery from "@/hooks/ticket/useTicketNature"
import useTicketReasonQuery from "@/hooks/ticket/useTicketReason"

export default function NewTicketPage() {
    const [formData, setFormData] = useState({
        subject: "",
        type: "",
        nature: "",
        reason: "",
        subSupport: "",
        description: "",
        attachment: null as File | null,
      })
    const { data: ticketTypeData } = useTicketTypesQuery()
    const { data: ticketNatureData } = useTicketNaturesQuery()
    const { data:ticketReasonData } = useTicketReasonQuery({ticketTypeId:formData.type,ticketNatureId:formData.nature})
    
    
  const router = useRouter()
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
    router.push("/tickets/in-progress")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create New Ticket</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
            <CardDescription>Create a new support ticket. Fill in all the required information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Brief description of the issue"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="partner">Ticket Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                                  <SelectContent>
                                      {ticketTypeData?.map(({ id, name }) => 
                                      {
                                          return (
                                                <SelectItem key={id}  value={id}>{name}</SelectItem>
                                          )
                                    }
                                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Ticket Nature</Label>
                <Select
                  value={formData.nature}
                  onValueChange={(value) => handleSelectChange("nature", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                  {ticketNatureData?.map(({ id, name }) => 
                                      {
                                          return (
                                              <SelectItem key={id} value={id}>{name}</SelectItem>
                                          )
                                    }
                                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support">Ticket Reason </Label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => handleSelectChange("reason", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select support type" />
                  </SelectTrigger>
                  <SelectContent>
                                      {ticketReasonData?.map(({id,name }) => {
                                          return (
                                            <SelectItem key={id} value={id}>{name}</SelectItem>
                        )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subSupport">Choice of sub-support</Label>
                <Select
                  value={formData.subSupport}
                  onValueChange={(value) => handleSelectChange("subSupport", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sub-support type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="login">Login Issues</SelectItem>
                    <SelectItem value="error">Error Messages</SelectItem>
                    <SelectItem value="performance">Performance Problems</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the issue or request"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment</Label>
              <div className="flex items-center gap-2">
                <Input id="attachment" type="file" onChange={handleFileChange} />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">Attach any relevant files (screenshots, documents, etc.)</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary-500 hover:bg-primary-600">
              Submit Ticket
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

