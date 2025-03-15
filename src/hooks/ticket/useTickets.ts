import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import TicketService from "@/services/ticketService";
import { ticketsQueryKeys, TicketsResponse } from "@/interfaces/ticket/ticket.interface";

const useTicketsQuery = () => {
  const fetchTickets = useCallback(() => TicketService.getTickets(), []);
    return useQuery({
        queryKey: ticketsQueryKeys.tickets,
        queryFn: fetchTickets,
  });
};

export default useTicketsQuery;
