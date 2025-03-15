import { TicketsResponse } from "@/interfaces/ticket/ticket.interface";
import { TicketNaturesResponse } from "@/interfaces/ticket/ticketNatures.interface";
import { TicketReasonsResponse } from "@/interfaces/ticket/ticketReasons.interface";
import { TicketTypesResponse } from "@/interfaces/ticket/ticketTypes.interface";
import apiClient from "@/lib/apiInterceptor";

const apiUrls = {
    ticketTypes: '/ticket-types',
    ticketNatures: '/ticket-natures',
    ticketReasons: (ticketTypeId: string, ticketNatureId: string) =>
        `/ticket-reasons?ticket_type_id=${ticketTypeId}&ticket_nature_id=${ticketNatureId}`,
    tickets: '/admin/tickets'

}
const  TicketService = {
    async getTicketTypes(): Promise<TicketTypesResponse[]> {
        const response = await apiClient.get<TicketTypesResponse[]>(apiUrls.ticketTypes);
        return response.data;
    },
    async getTicketNatures(): Promise<TicketNaturesResponse[]> {
        const response = await apiClient.get<TicketNaturesResponse[]>(apiUrls.ticketNatures);
        return response.data;
    },
    async getTicketReason({ticketTypeId,ticketNatureId}:{ticketTypeId:string,ticketNatureId:string}): Promise<TicketReasonsResponse[]> {
        const response = await apiClient.get<TicketReasonsResponse[]>(apiUrls.ticketReasons(ticketTypeId,ticketNatureId));
        return response.data;
    },
    async getTickets(): Promise<TicketsResponse> {
        const response = await apiClient.get(apiUrls.tickets);
        return response.data;
    }
}
export default TicketService 