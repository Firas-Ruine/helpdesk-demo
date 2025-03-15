import { useQuery } from "@tanstack/react-query";
import { ticketReasonsQueryKeys, TicketReasonsResponse } from "@/interfaces/ticket/ticketReasons.interface";
import TicketService from "@/services/ticketService";
import { useCallback } from "react";

const useTicketReasonQuery = ({
  ticketTypeId,
  ticketNatureId
}: { ticketTypeId: string, ticketNatureId: string }) => {
  const fetchTicketReasons = useCallback(async () => {
    return TicketService.getTicketReason({ ticketTypeId, ticketNatureId });
  }, [ticketTypeId, ticketNatureId]); 

  return useQuery<TicketReasonsResponse[], Error>(
    {
      queryKey: ticketReasonsQueryKeys.ticketReasons(ticketTypeId, ticketNatureId),
      queryFn: fetchTicketReasons,
    }
  );
};

export default useTicketReasonQuery;
