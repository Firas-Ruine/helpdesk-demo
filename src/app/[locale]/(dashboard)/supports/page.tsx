"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronRight, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { supports, getSubSupportsBySupportId, services } from "@/lib/sample-data"
import { SupportDialog } from "@/components/support-dialog"
import { SubSupportDialog } from "@/components/subsupport-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function SupportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false)
  const [isSubSupportDialogOpen, setIsSubSupportDialogOpen] = useState(false)
  const [editingSupport, setEditingSupport] = useState<any>(null)
  const [editingSubSupport, setEditingSubSupport] = useState<any>(null)
  const [currentSupportId, setCurrentSupportId] = useState<string | null>(null)

  const filteredSupports = supports.filter((support) => {
    const matchesSearch = support.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || support.status === statusFilter
    const matchesService = serviceFilter === "all" || support.serviceId === serviceFilter
    return matchesSearch && matchesStatus && matchesService
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleEditSupport = (support: any) => {
    setEditingSupport(support)
    setIsSupportDialogOpen(true)
  }

  const handleCreateSupport = () => {
    setEditingSupport(null)
    setIsSupportDialogOpen(true)
  }

  const handleEditSubSupport = (subSupport: any) => {
    setEditingSubSupport(subSupport)
    setIsSubSupportDialogOpen(true)
  }

  const handleCreateSubSupport = (supportId: string) => {
    setEditingSubSupport(null)
    setCurrentSupportId(supportId)
    setIsSubSupportDialogOpen(true)
  }

  // Get unique services for filter
  const uniqueServices = Array.from(new Set(supports.map((support) => support.serviceId))).map((id) => {
    const service = services.find((s) => s.id === id)
    return { id, name: service?.name || "Unknown" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Support Categories</h1>
        <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleCreateSupport}>
          <Plus className="mr-2 h-4 w-4" /> Add Support Category
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Support Hierarchy</CardTitle>
          <CardDescription>Manage support categories and their sub-categories.</CardDescription>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {uniqueServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSupports.length > 0 ? (
              filteredSupports.map((support) => {
                const subSupports = getSubSupportsBySupportId(support.id)
                const isOpen = openItems.includes(support.id)

                return (
                  <Collapsible
                    key={support.id}
                    open={isOpen}
                    onOpenChange={() => toggleItem(support.id)}
                    className="border rounded-md"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                        <div>
                          <div className="flex items-center gap-2">
                            <Link href={`/supports/${support.id}`} className="font-medium hover:text-primary-500">
                              {support.name}
                            </Link>
                            <Badge
                              variant="outline"
                              className={
                                support.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {support.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Service: {support.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditSupport(support)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleCreateSubSupport(support.id)}>
                          <Plus className="h-3 w-3 mr-1" /> Sub-Category
                        </Button>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="border-t px-4 py-2 bg-gray-50">
                        <div className="text-sm font-medium mb-2">Sub-Categories</div>
                        {subSupports.length > 0 ? (
                          <div className="space-y-2 pl-6">
                            {subSupports.map((subSupport) => (
                              <div
                                key={subSupport.id}
                                className="flex items-center justify-between py-2 px-4 bg-white rounded border"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{subSupport.name}</span>
                                    <Badge
                                      variant="outline"
                                      className={
                                        subSupport.status === "active"
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : "bg-red-100 text-red-800 hover:bg-red-100"
                                      }
                                    >
                                      {subSupport.status === "active" ? "Active" : "Inactive"}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{subSupport.description}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => handleEditSubSupport(subSupport)}>
                                  Edit
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">No sub-categories found.</div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No support categories found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SupportDialog open={isSupportDialogOpen} onOpenChange={setIsSupportDialogOpen} support={editingSupport} />

      <SubSupportDialog
        open={isSubSupportDialogOpen}
        onOpenChange={setIsSubSupportDialogOpen}
        subSupport={editingSubSupport}
        supportId={currentSupportId}
      />
    </div>
  )
}

