"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, Clock, CheckCircle, BarChart3, Download, Mail } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useAuth } from "@/providers/auth-provider"

export default function DashboardPage() {
  const t = useTranslations()
  const { user } = useAuth();
  console.log(user)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight"> {t('dashboard')} </h1>
        <Button className="bg-primary-500 hover:bg-primary-600">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89</div>
            <p className="text-xs text-gray-500">+2.5% from last month</p>
            <Link href="/tickets/in-progress">
              <Button variant="link" className="p-0 h-auto text-primary-500 mt-2">
                View Tickets →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tickets</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">19</div>
            <p className="text-xs text-gray-500">-5% from last month</p>
            <Link href="/tickets/in-progress">
              <Button variant="link" className="p-0 h-auto text-primary-500 mt-2">
                View Tickets →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
            <Link href="/tickets/statistics">
              <Button variant="link" className="p-0 h-auto text-primary-500 mt-2">
                View Statistics →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Solved Tickets</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">75</div>
            <p className="text-xs text-gray-500">+18% from last month</p>
            <Link href="/tickets/solved">
              <Button variant="link" className="p-0 h-auto text-primary-500 mt-2">
                View Tickets →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ticket Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary-500" />
                  <span className="text-sm">Satisfied</span>
                </div>
                <span className="text-sm font-medium">84%</span>
              </div>
              <Progress value={84} className="h-2 bg-gray-200" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300" />
                  <span className="text-sm">Neutral</span>
                </div>
                <span className="text-sm font-medium">11%</span>
              </div>
              <Progress value={11} className="h-2 bg-gray-200" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="text-sm">Dissatisfied</span>
                </div>
                <span className="text-sm font-medium">5%</span>
              </div>
              <Progress value={5} className="h-2 bg-gray-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 text-sm font-medium text-gray-500">
                <div className="col-span-1">No.</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-3">Country</div>
                <div className="col-span-4">No. of Tickets</div>
              </div>

              {[
                { id: 1, name: "Chris Do", country: "🇨🇳", tickets: 32 },
                { id: 2, name: "Wilson Fisk", country: "🇬🇧", tickets: 32 },
                { id: 3, name: "Matt Murdock", country: "🇨🇳", tickets: 32 },
                { id: 4, name: "Janelle Monae", country: "🇩🇪", tickets: 32 },
                { id: 5, name: "Rosa Parker", country: "🇺🇸", tickets: 32 },
              ].map((customer) => (
                <div key={customer.id} className="grid grid-cols-12 items-center py-3 border-b">
                  <div className="col-span-1 text-primary-500 font-medium">#{customer.id}</div>
                  <div className="col-span-4 font-medium">{customer.name}</div>
                  <div className="col-span-3">{customer.country}</div>
                  <div className="col-span-4">{customer.tickets} tickets</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Jacob Fey", tickets: 67, image: "/placeholder.svg" },
                { name: "Charlie Thompson", tickets: 62, image: "/placeholder.svg" },
                { name: "Sandra San", tickets: 58, image: "/placeholder.svg" },
              ].map((agent, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <Avatar>
                    <AvatarImage src={agent.image} alt={agent.name} />
                    <AvatarFallback className="bg-primary-100">
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{agent.name}</h4>
                    <p className="text-xs text-gray-500">{agent.tickets} tickets resolved</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

