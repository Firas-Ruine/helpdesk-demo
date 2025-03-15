"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, PieChart } from "lucide-react"

// Sample data for statistics
const statisticsData = [
  { type: "Information Technology", requests: 13403, complaints: 2046 },
  { type: "Shipment", requests: 9074, complaints: 8504 },
  { type: "Financial", requests: 20788, complaints: 6397 },
  { type: "Product", requests: 2544, complaints: 8047 },
  { type: "Others", requests: 682, complaints: 302 },
  { type: "Direction Nabeul", requests: 7, complaints: 5 },
  { type: "Direction Sfax", requests: 31, complaints: 43 },
  { type: "Direction Tunis", requests: 41, complaints: 85 },
  { type: "Customer Relations", requests: 108538, complaints: 29565 },
  { type: "Business Development", requests: 16089, complaints: 5286 },
  { type: "Corporate", requests: 5677, complaints: 310 },
  { type: "Algeria branches", requests: 9621, complaints: 147 },
]

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ticket Statistics</h1>
        <Button className="bg-primary-500 hover:bg-primary-600">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-3">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Problem Type Distribution</CardTitle>
              <CardDescription>Breakdown of tickets by problem type and category</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Problem Type</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Complaints</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statisticsData.map((item) => (
                    <TableRow key={item.type}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell className="text-right">{item.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.complaints.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">
                        {(item.requests + item.complaints).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {statisticsData.reduce((sum, item) => sum + item.requests, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {statisticsData.reduce((sum, item) => sum + item.complaints, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {statisticsData.reduce((sum, item) => sum + item.requests + item.complaints, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle>Problem Type Distribution - Bar Chart</CardTitle>
              <CardDescription>Visual representation of tickets by problem type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Bar chart visualization would go here</p>
                  <p className="text-sm text-gray-400">
                    This would show the distribution of requests and complaints across different problem types
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie">
          <Card>
            <CardHeader>
              <CardTitle>Problem Type Distribution - Pie Chart</CardTitle>
              <CardDescription>Percentage breakdown of tickets by problem type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <PieChart className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Pie chart visualization would go here</p>
                  <p className="text-sm text-gray-400">
                    This would show the relative proportion of each problem type in the total ticket volume
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

