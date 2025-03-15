// Department
export interface Department {
  id: string
  name: string
  description: string
  services?: Service[]
}

// Service
export interface Service {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  departmentId: string
  departmentName?: string
  supports?: Support[]
  attachments?: Attachment[]
}

// Support
export interface Support {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  serviceId: string
  serviceName?: string
  subSupports?: SubSupport[]
}

// SubSupport
export interface SubSupport {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  supportId: string
  supportName?: string
}

// Attachment
export interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

