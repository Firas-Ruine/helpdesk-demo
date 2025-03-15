export interface Ticket {
    id: number
    subject: string
    slug: string
    message: string
    solution: string
    criticality: string
    status: string
    frequency: number
    observation: string
    country: string
    department: string
    service: string
    ticket_reason: string
    user: string
    created_by?: string 
    assigned_to?: string 
    solved_by?: string 
    pending_at?: string 
    solved_at?: string 
    closed_at?: string 
    created_at?: string
    updated_at?: string
  }
  
  export interface TicketsResponse {
    data: Ticket[]
    links: {
      first: string
      last: string
      prev: string 
      next: string 
    }
    meta: {
      current_page: number
      from: number
      last_page: number
      links: Array<{
        url: string 
        label: string
        active: boolean
      }>
      path: string
      per_page: number
      to: number
      total: number
    }
  }

  interface QueryKeys {
    tickets: readonly ["tickets"];
}
  
export const ticketsQueryKeys: QueryKeys = {
    tickets: ["tickets"] as const,
  };
  
  