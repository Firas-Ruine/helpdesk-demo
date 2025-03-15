export interface TicketNaturesResponse {
    id: string;
    name: string;
}

interface QueryKeys {
    ticketNatures: readonly ["ticketNatures"];
}
  
export const ticketNaturesQueryKeys: QueryKeys = {
    ticketNatures: ["ticketNatures"] as const,
  };