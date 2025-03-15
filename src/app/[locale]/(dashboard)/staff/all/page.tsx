"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, Plus, Mail, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Sample data for staff
const staffData = [
  {
    id: 1,
    name: "Michael Scott",
    email: "michael.scott@example.com",
    service: "Information Technology",
    role: "Admin",
    country: "USA",
    image: "/placeholder.svg",
    dispatchedTickets: 45,
    ticketsSolved: 38,
  },
  {
    id: 2,
    name: "Jim Halpert",
    email: "jim.halpert@example.com",
    service: "Customer Relations",
    role: "Agent",
    country: "USA",
    image: "/placeholder.svg",
    dispatchedTickets: 32,
    ticketsSolved: 29,
  },
  {
    id: 3,
    name: "Pam Beesly",
    email: "pam.beesly@example.com",
    service: "Financial",
    role: "Agent",
    country: "USA",
    image: "/placeholder.svg",
    dispatchedTickets: 28,
    ticketsSolved: 25,
  },
  {
    id: 4,
    name: "Dwight Schrute",
    email: "dwight.schrute@example.com",
    service: "Product",
    role: "Supervisor",
    country: "USA",
    image: "/placeholder.svg",
    dispatchedTickets: 52,
    ticketsSolved: 48,
  },
  {
    id: 5,
    name: "Angela Martin",
    email: "angela.martin@example.com",
    service: "Financial",
    role: "Agent",
    country: "USA",
    image: "/placeholder.svg",
    dispatchedTickets: 30,
    ticketsSolved: 27,
  },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Concerned Staff</h1>
        <Link href="/staff/new">
          <Button className="bg-primary-500 hover:bg-primary-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Staff
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Staff Members</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Manage your support team and track their performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Dispatched Tickets</TableHead>
                <TableHead>Tickets Solved</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.image} alt={staff.name} />
                        <AvatarFallback className="bg-primary-100">
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{staff.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.service}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        staff.role === "Admin"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          : staff.role === "Supervisor"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                      }
                    >
                      {staff.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{staff.country}</TableCell>
                  <TableCell>{staff.dispatchedTickets}</TableCell>
                  <TableCell>{staff.ticketsSolved}</TableCell>
                  <TableCell>{Math.round((staff.ticketsSolved / staff.dispatchedTickets) * 100)}%</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Contact</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

