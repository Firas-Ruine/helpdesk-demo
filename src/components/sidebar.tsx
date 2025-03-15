"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Ticket,
  CheckCircle,
  Clock,
  Trash2,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  PlusCircle,
  Building2,
  Layers,
  FolderTree,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState({
    tickets: true,
    staff: false,
    departments: false,
  })

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  return (
    <div className={cn("pb-12 w-64 bg-white border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/dashboard">
            <h2 className="text-2xl font-semibold tracking-tight text-primary-500 flex items-center">
              <span className="mr-2">🎫</span> HelpDesk
            </h2>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-9rem)]">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <Link href="/dashboard">
                <Button
                  variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === "/dashboard" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                  )}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              {/* Tickets Section */}
              <div>
                <Button variant="ghost" className="w-full justify-between" onClick={() => toggleMenu("tickets")}>
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-4 w-4" />
                    Tickets
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openMenus.tickets && "transform rotate-180")}
                  />
                </Button>

                {openMenus.tickets && (
                  <div className="ml-4 space-y-1 pt-1">
                    <Link href="/tickets/new">
                      <Button
                        variant={pathname === "/tickets/new" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/tickets/new" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New
                      </Button>
                    </Link>
                    <Link href="/tickets/in-progress">
                      <Button
                        variant={pathname === "/tickets/in-progress" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/tickets/in-progress" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        In Progress
                      </Button>
                    </Link>
                    <Link href="/tickets/solved">
                      <Button
                        variant={pathname === "/tickets/solved" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/tickets/solved" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Solved
                      </Button>
                    </Link>
                    <Link href="/tickets/trash">
                      <Button
                        variant={pathname === "/tickets/trash" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/tickets/trash" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Trash
                      </Button>
                    </Link>
                    <Link href="/tickets/statistics">
                      <Button
                        variant={pathname === "/tickets/statistics" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/tickets/statistics" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Statistics
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Staff Section */}
              <div>
                <Button variant="ghost" className="w-full justify-between" onClick={() => toggleMenu("staff")}>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Concerned Staff
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openMenus.staff && "transform rotate-180")}
                  />
                </Button>

                {openMenus.staff && (
                  <div className="ml-4 space-y-1 pt-1">
                    <Link href="/staff/all">
                      <Button
                        variant={pathname === "/staff/all" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/staff/all" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        All
                      </Button>
                    </Link>
                    <Link href="/staff/new">
                      <Button
                        variant={pathname === "/staff/new" ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          pathname === "/staff/new" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Departments Section */}
              <div>
                <Button variant="ghost" className="w-full justify-between" onClick={() => toggleMenu("departments")}>
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    Organization
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", openMenus.departments && "transform rotate-180")}
                  />
                </Button>

                {openMenus.departments && (
                  <div className="ml-4 space-y-1 pt-1">
                    <Link href="/departments">
                      <Button
                        variant={
                          pathname === "/departments" || pathname.startsWith("/departments/") ? "secondary" : "ghost"
                        }
                        className={cn(
                          "w-full justify-start",
                          (pathname === "/departments" || pathname.startsWith("/departments/")) &&
                            "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <Building2 className="mr-2 h-4 w-4" />
                        Departments
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button
                        variant={pathname === "/services" || pathname.startsWith("/services/") ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          (pathname === "/services" || pathname.startsWith("/services/")) &&
                            "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <Layers className="mr-2 h-4 w-4" />
                        Services
                      </Button>
                    </Link>
                    <Link href="/supports">
                      <Button
                        variant={pathname === "/supports" || pathname.startsWith("/supports/") ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          (pathname === "/supports" || pathname.startsWith("/supports/")) &&
                            "bg-primary-100 text-primary-800 hover:bg-primary-200",
                        )}
                      >
                        <FolderTree className="mr-2 h-4 w-4" />
                        Support Categories
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/settings">
                <Button
                  variant={pathname === "/settings" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === "/settings" && "bg-primary-100 text-primary-800 hover:bg-primary-200",
                  )}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

