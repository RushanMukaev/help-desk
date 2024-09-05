import Ticket from "./Ticket.js";
import {format} from "date-fns";
import TicketForm from "./TicketForm.js";
import TicketService from "./TicketService.js";

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
    constructor() {
    }

    static renderTickets(tickets, container = document) {
        const ticketsList = container.querySelector('.tickets-list');
        ticketsList.innerHTML = '';

        tickets.forEach(item => {
            const ticket = new Ticket(item);
            ticket.created = format(new Date(ticket.created), "yyyy.MM.dd hh:mm")
            let checked = ""
            if(ticket.status === false) {
                checked = "unChecked";
            } else {
                checked = "isChecked";
            }

            ticketsList.insertAdjacentHTML("beforeend", `
                <div class="ticket" data-id="${ticket.id}">
                    <button class=${checked} id="checkedBtn">&#10003</button>
                    <div class="ticket-text">
                        <div class="ticket-name">${ticket.name}</div>
                    </div>
                    <div class="ticket-created">${ticket.created}</div>
                    <button class="update-ticket">&#9998;</button>
                    <button class="remove-ticket">X</button>
                </div>
            `)
            const ticketItem = document.querySelector(`[data-id="${ticket.id}"]`)
            const checkedBtn = ticketItem.querySelector("#checkedBtn")

            checkedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(e)
                ticket.status = !ticket.status;

                    checkedBtn.classList.toggle('isChecked');
                    checkedBtn.classList.toggle('unChecked');
                    this.ticketService.update(ticket.id, ticket, data => console.log(data))

            })
        });

        this.ticketService = new TicketService();

        const removeBtnList = document.querySelectorAll('.remove-ticket');
        removeBtnList.forEach(btn => {
            const ticketId = btn.parentElement.getAttribute('data-id');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.ticketService.delete(ticketId)
                    .then(() => {
                        return this.ticketService.list((tickets) => TicketView.renderTickets(tickets));
                    })

            })
        })

        const updateBtnList = document.querySelectorAll('.update-ticket');
        updateBtnList.forEach(btn => {
            const ticketId = btn.parentElement.getAttribute('data-id');
            const form = new TicketForm()
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                form.updateTicket(ticketId);
            })
        })

        const ticketBtnList = document.querySelectorAll('.ticket');
        ticketBtnList.forEach(ticket => {
            const ticketId = ticket.getAttribute('data-id');
            ticket.addEventListener('click', (e) => {
                const ticketText = ticket.querySelector('.ticket-text');
                if (e.target.tagName !== 'BUTTON') {
                    if (!(ticketText.querySelector(".ticket-description"))) {
                        this.ticketService.get(ticketId, (data) => {
                            console.log(data);
                            ticketText.insertAdjacentHTML("beforeend",
                                `<div class="ticket-description">${data.description}</div>`)
                        });

                    } else {
                        ticketText.querySelector(".ticket-description").remove()
                    }
                }
            });
        })

    }
}
