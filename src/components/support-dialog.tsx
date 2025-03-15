"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { services } from "@/lib/sample-data"

interface SupportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  support?: any
  serviceId?: string
}

export function SupportDialog({ open, onOpenChange, support, serviceId }: SupportDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    nameAr: "",
    descriptionAr: "",
    status: "active",
    serviceId: serviceId || "",
  })

  useEffect(() => {
    if (support) {
      setFormData({
        name: support.name || "",
        description: support.description || "",
        nameAr: support.nameAr || "",
        descriptionAr: support.descriptionAr || "",
        status: support.status || "active",
        serviceId: support.serviceId || serviceId || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        nameAr: "",
        descriptionAr: "",
        status: "active",
        serviceId: serviceId || "",
      })
    }
  }, [support, serviceId, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, status: checked ? "active" : "inactive" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{support ? "Edit Support Category" : "Add Support Category"}</DialogTitle>
            <DialogDescription>
              {support
                ? "Update the support category information below."
                : "Fill in the details to create a new support category."}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="english" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="arabic">Arabic</TabsTrigger>
            </TabsList>

            <TabsContent value="english" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="arabic" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">Name (Arabic)</Label>
                <Input id="nameAr" name="nameAr" value={formData.nameAr} onChange={handleChange} dir="rtl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  rows={4}
                  dir="rtl"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="serviceId">Service</Label>
              <Select
                value={formData.serviceId}
                onValueChange={(value) => handleSelectChange("serviceId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status">Active</Label>
              <Switch id="status" checked={formData.status === "active"} onCheckedChange={handleStatusChange} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary-500 hover:bg-primary-600">
              {support ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

