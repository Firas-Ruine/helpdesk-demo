export interface TicketReasonsResponse {
    id: string;
    name: string;
}

interface QueryKeys {
    ticketReasons: (ticketTypeId: string, ticketNatureId: string) => readonly ["ticketReasons", string, string]; 
}
  
export const ticketReasonsQueryKeys: QueryKeys = {
    ticketReasons: (ticketTypeId: string, ticketNatureId: string) => ["ticketReasons", ticketTypeId, ticketNatureId],
  };