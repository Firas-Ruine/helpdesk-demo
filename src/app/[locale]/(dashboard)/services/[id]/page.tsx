"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Edit, FileUp } from "lucide-react"
import Link from "next/link"
import { getServiceById, getSupportsByServiceId } from "@/lib/sample-data"
import { SupportDialog } from "@/components/support-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const service = getServiceById(params.id)
  const supports = getSupportsByServiceId(params.id)

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSupport, setEditingSupport] = useState<any>(null)

  if (!service) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Service not found</h2>
          <p className="text-muted-foreground">The service you're looking for doesn't exist.</p>
          <Button className="mt-4 bg-primary-500 hover:bg-primary-600" onClick={() => router.push("/services")}>
            Back to Services
          </Button>
        </div>
      </div>
    )
  }

  const filteredSupports = supports.filter((support) => support.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleEdit = (support: any) => {
    setEditingSupport(support)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingSupport(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
            <Badge
              variant="outline"
              className={
                service.status === "active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {service.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="text-muted-foreground">Department: {service.departmentName}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="supports">Support Categories</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Department</h3>
                  <p className="text-sm text-muted-foreground mt-1">{service.departmentName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.status === "active" ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supports" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Support Categories</h2>
            <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Support Category
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Support Categories</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search categories..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>Support categories associated with this service.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSupports.length > 0 ? (
                    filteredSupports.map((support) => (
                      <TableRow key={support.id}>
                        <TableCell className="font-medium">
                          <Link href={`/supports/${support.id}`} className="hover:text-primary-500">
                            {support.name}
                          </Link>
                        </TableCell>
                        <TableCell>{support.description}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(support)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Link href={`/supports/${support.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No support categories found for this service.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Attachments</h2>
            <Button className="bg-primary-500 hover:bg-primary-600">
              <FileUp className="mr-2 h-4 w-4" /> Upload File
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Attachments</CardTitle>
              <CardDescription>Files and documents related to this service.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileUp className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">No attachments yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload files related to this service for documentation and reference.
                </p>
                <Button className="mt-4 bg-primary-500 hover:bg-primary-600">
                  <FileUp className="mr-2 h-4 w-4" /> Upload File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SupportDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        support={editingSupport}
        serviceId={service.id}
      />
    </div>
  )
}

