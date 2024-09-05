import TicketService from "./TicketService";
import TicketView from "./TicketView.js";
import Ticket from "./Ticket.js";
import TicketForm from "./TicketForm.js";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error("This is not HTML element!");
        }
        this.container = container;
        this.ticketService = new TicketService()
        this.ticketForm = new TicketForm();
    }

    init() {
        const addTicketBtn = this.container.querySelector(".add-ticket");
        console.log(addTicketBtn);
        const tickets = this.ticketService.list(tickets => TicketView.renderTickets(tickets, this.container))

        addTicketBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.ticketForm.createTicket()
        })
    }
}
