import type { Department, Service, Support, SubSupport } from "./types"

// Sample Departments
export const departments: Department[] = [
  {
    id: "dept-1",
    name: "Information Technology",
    description: "IT department handling all technology-related issues",
  },
  {
    id: "dept-2",
    name: "Customer Relations",
    description: "Department handling customer inquiries and support",
  },
  {
    id: "dept-3",
    name: "Financial Services",
    description: "Department handling financial and billing matters",
  },
  {
    id: "dept-4",
    name: "Shipping & Logistics",
    description: "Department handling product delivery and logistics",
  },
]

// Sample Services
export const services: Service[] = [
  {
    id: "serv-1",
    name: "Technical Support",
    description: "Support for technical issues with our products",
    status: "active",
    departmentId: "dept-1",
    departmentName: "Information Technology",
  },
  {
    id: "serv-2",
    name: "Software Development",
    description: "Custom software development services",
    status: "active",
    departmentId: "dept-1",
    departmentName: "Information Technology",
  },
  {
    id: "serv-3",
    name: "Account Management",
    description: "Services related to customer account management",
    status: "active",
    departmentId: "dept-2",
    departmentName: "Customer Relations",
  },
  {
    id: "serv-4",
    name: "Billing Support",
    description: "Support for billing and payment issues",
    status: "active",
    departmentId: "dept-3",
    departmentName: "Financial Services",
  },
  {
    id: "serv-5",
    name: "Delivery Tracking",
    description: "Services for tracking product deliveries",
    status: "active",
    departmentId: "dept-4",
    departmentName: "Shipping & Logistics",
  },
  {
    id: "serv-6",
    name: "Returns Processing",
    description: "Services for handling product returns",
    status: "inactive",
    departmentId: "dept-4",
    departmentName: "Shipping & Logistics",
  },
]

// Sample Support Categories
export const supports: Support[] = [
  {
    id: "sup-1",
    name: "Hardware Issues",
    description: "Support for hardware-related problems",
    status: "active",
    serviceId: "serv-1",
    serviceName: "Technical Support",
  },
  {
    id: "sup-2",
    name: "Software Issues",
    description: "Support for software-related problems",
    status: "active",
    serviceId: "serv-1",
    serviceName: "Technical Support",
  },
  {
    id: "sup-3",
    name: "Web Development",
    description: "Web application development services",
    status: "active",
    serviceId: "serv-2",
    serviceName: "Software Development",
  },
  {
    id: "sup-4",
    name: "Mobile Development",
    description: "Mobile application development services",
    status: "active",
    serviceId: "serv-2",
    serviceName: "Software Development",
  },
  {
    id: "sup-5",
    name: "Account Creation",
    description: "Support for creating new accounts",
    status: "active",
    serviceId: "serv-3",
    serviceName: "Account Management",
  },
  {
    id: "sup-6",
    name: "Payment Processing",
    description: "Support for payment processing issues",
    status: "active",
    serviceId: "serv-4",
    serviceName: "Billing Support",
  },
]

// Sample SubSupport Categories
export const subSupports: SubSupport[] = [
  {
    id: "sub-1",
    name: "Desktop Issues",
    description: "Issues with desktop computers",
    status: "active",
    supportId: "sup-1",
    supportName: "Hardware Issues",
  },
  {
    id: "sub-2",
    name: "Laptop Issues",
    description: "Issues with laptop computers",
    status: "active",
    supportId: "sup-1",
    supportName: "Hardware Issues",
  },
  {
    id: "sub-3",
    name: "Printer Issues",
    description: "Issues with printers",
    status: "inactive",
    supportId: "sup-1",
    supportName: "Hardware Issues",
  },
  {
    id: "sub-4",
    name: "Operating System Issues",
    description: "Issues with operating systems",
    status: "active",
    supportId: "sup-2",
    supportName: "Software Issues",
  },
  {
    id: "sub-5",
    name: "Application Issues",
    description: "Issues with software applications",
    status: "active",
    supportId: "sup-2",
    supportName: "Software Issues",
  },
  {
    id: "sub-6",
    name: "Frontend Development",
    description: "Frontend web development services",
    status: "active",
    supportId: "sup-3",
    supportName: "Web Development",
  },
  {
    id: "sub-7",
    name: "Backend Development",
    description: "Backend web development services",
    status: "active",
    supportId: "sup-3",
    supportName: "Web Development",
  },
  {
    id: "sub-8",
    name: "iOS Development",
    description: "iOS application development",
    status: "active",
    supportId: "sup-4",
    supportName: "Mobile Development",
  },
  {
    id: "sub-9",
    name: "Android Development",
    description: "Android application development",
    status: "active",
    supportId: "sup-4",
    supportName: "Mobile Development",
  },
]

// Helper functions to get data
export function getDepartmentById(id: string): Department | undefined {
  return departments.find((dept) => dept.id === id)
}

export function getServicesByDepartmentId(departmentId: string): Service[] {
  return services.filter((service) => service.departmentId === departmentId)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

export function getSupportsByServiceId(serviceId: string): Support[] {
  return supports.filter((support) => support.serviceId === serviceId)
}

export function getSupportById(id: string): Support | undefined {
  return supports.find((support) => support.id === id)
}

export function getSubSupportsBySupportId(supportId: string): SubSupport[] {
  return subSupports.filter((subSupport) => subSupport.supportId === supportId)
}

export function getSubSupportById(id: string): SubSupport | undefined {
  return subSupports.find((subSupport) => subSupport.id === id)
}

