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
import { Switch } from "@/components/ui/switch"

interface SubSupportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subSupport?: any
  supportId?: string | null
}

export function SubSupportDialog({ open, onOpenChange, subSupport, supportId }: SubSupportDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    nameAr: "",
    descriptionAr: "",
    status: "active",
    supportId: supportId || "",
  })

  useEffect(() => {
    if (subSupport) {
      setFormData({
        name: subSupport.name || "",
        description: subSupport.description || "",
        nameAr: subSupport.nameAr || "",
        descriptionAr: subSupport.descriptionAr || "",
        status: subSupport.status || "active",
        supportId: subSupport.supportId || supportId || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        nameAr: "",
        descriptionAr: "",
        status: "active",
        supportId: supportId || "",
      })
    }
  }, [subSupport, supportId, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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
            <DialogTitle>{subSupport ? "Edit Sub-Category" : "Add Sub-Category"}</DialogTitle>
            <DialogDescription>
              {subSupport
                ? "Update the sub-category information below."
                : "Fill in the details to create a new sub-category."}
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
              {subSupport ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

