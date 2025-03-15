"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Edit } from "lucide-react"
import Link from "next/link"
import { getSupportById, getSubSupportsBySupportId, getServiceById } from "@/lib/sample-data"
import { SubSupportDialog } from "@/components/subsupport-dialog"
import { Separator } from "@/components/ui/separator"

export default function SupportDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const support = getSupportById(params.id)
  const subSupports = getSubSupportsBySupportId(params.id)

  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSubSupport, setEditingSubSupport] = useState<any>(null)

  if (!support) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Support category not found</h2>
          <p className="text-muted-foreground">The support category you're looking for doesn't exist.</p>
          <Button className="mt-4 bg-primary-500 hover:bg-primary-600" onClick={() => router.push("/supports")}>
            Back to Support Categories
          </Button>
        </div>
      </div>
    )
  }

  const service = getServiceById(support.serviceId)

  const filteredSubSupports = subSupports.filter((subSupport) =>
    subSupport.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (subSupport: any) => {
    setEditingSubSupport(subSupport)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingSubSupport(null)
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
            <h1 className="text-3xl font-bold tracking-tight">{support.name}</h1>
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
          <p className="text-muted-foreground">
            Service:{" "}
            <Link href={`/services/${support.serviceId}`} className="hover:text-primary-500">
              {support.serviceName}
            </Link>
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Category Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm text-muted-foreground mt-1">{support.description}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Service</h3>
              <p className="text-sm text-muted-foreground mt-1">{support.serviceName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Status</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {support.status === "active" ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="mr-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit Support Category
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sub-Categories</h2>
        <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Sub-Category
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Sub-Categories</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search sub-categories..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Sub-categories associated with this support category.</CardDescription>
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
              {filteredSubSupports.length > 0 ? (
                filteredSubSupports.map((subSupport) => (
                  <TableRow key={subSupport.id}>
                    <TableCell className="font-medium">{subSupport.name}</TableCell>
                    <TableCell>{subSupport.description}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(subSupport)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No sub-categories found for this support category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <SubSupportDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        subSupport={editingSubSupport}
        supportId={support.id}
      />
    </div>
  )
}

