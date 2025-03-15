import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ticketTypesQueryKeys, TicketTypesResponse } from "@/interfaces/ticket/ticketTypes.interface";
import TicketService from "@/services/ticketService";

const useTicketTypesQuery = () => {
  const fetchTicketTypes = useCallback(() => TicketService.getTicketTypes(), []);
    return useQuery<TicketTypesResponse[], Error>({
        queryKey: ticketTypesQueryKeys.ticketTypes,
        queryFn: fetchTicketTypes,
  });
};

export default useTicketTypesQuery;
