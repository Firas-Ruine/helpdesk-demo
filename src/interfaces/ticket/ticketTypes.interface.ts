export interface TicketTypesResponse {
    id: string;
    name: string;
}

interface QueryKeys {
    ticketTypes: readonly ["ticketTypes"];
}
  
export const ticketTypesQueryKeys: QueryKeys = {
    ticketTypes: ["ticketTypes"] as const,
  };