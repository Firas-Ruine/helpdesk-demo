"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"
import { getTicketsByStatus } from "@/lib/mock/ticket-data"

// Sample data for solved tickets
const ticketsData = getTicketsByStatus("Solved")

export default function SolvedTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTickets = ticketsData.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Solved Tickets</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Resolved Tickets</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>View all tickets that have been successfully resolved.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket No.</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Created on</TableHead>
                <TableHead>Solved on</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned to</TableHead>
                <TableHead>Cruciality</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                  <Link href={`/tickets/${ticket.id}`} className="contents">
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.country}</TableCell>
                    <TableCell>{ticket.service}</TableCell>
                    <TableCell>{ticket.createdOn}</TableCell>
                    <TableCell>{ticket.solvedOn}</TableCell>
                    <TableCell>{ticket.type}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.cruciality === "Critical"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : ticket.cruciality === "High"
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                              : ticket.cruciality === "Medium"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {ticket.cruciality}
                      </Badge>
                    </TableCell>
                  </Link>
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
                          <Link href={`/tickets/${ticket.id}`} className="w-full">
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Reopen ticket</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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

