import { ticketNaturesQueryKeys, TicketNaturesResponse } from "@/interfaces/ticket/ticketNatures.interface";
import TicketService from "@/services/ticketService";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";


const useTicketNaturesQuery = () => {
  const fetchTicketTypes = useCallback(() => TicketService.getTicketNatures(), []);

    return useQuery<TicketNaturesResponse[], Error>({
        queryKey: ticketNaturesQueryKeys.ticketNatures,
        queryFn: fetchTicketTypes,
  });
};

export default useTicketNaturesQuery;
