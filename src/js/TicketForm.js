import Ticket from "./Ticket.js";
import TicketView from "./TicketView.js";
import TicketService from "./TicketService.js";

/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
    constructor() {
        this.ticketService = new TicketService();
    }

    cancelForForm(form) {
        const cancelBtn = form.querySelector(".cancel");
        cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            form.remove()
        })
    }

    createTicket() {
        const container = document.querySelector("body");
        container.insertAdjacentHTML("beforeend", `
        <div class="form">
            <form class="form-create">
            <h2>Добавить Тикет</h2>
                <div class="form-name">
                        <label for="name">Краткое описание</label>
                        <input type="text" name="name" id="name" />
                </div>
                    <div class="form-description">
                        <label for="description">Подробное описание </label>
                        <textarea name="description" id="description" cols="10" rows="3"></textarea>
                    </div>
                    <div class="form-example">
                        <button class="cancel">Отмена</button>
                        <button type="submit" class="cancel">OK</button>
                    </div>
                </form>
        </div>`)

        const form = document.querySelector('.form');
        const formCreate = document.querySelector(".form-create");
        formCreate.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formCreate);
            const ticketForm = {
                id: null,
                name: formData.get("name"),
                description: formData.get("description"),
                status: false,
                created: Date.now(),
            }
            const ticket = new Ticket(ticketForm);
            this.ticketService.create(ticket, data => console.log(data))
                .then(() => this.ticketService.list(tickets => TicketView.renderTickets(tickets)))
                .then(() => form.remove())
        })
        this.cancelForForm(form)

    }

    updateTicket(ticketId) {
        const container = document.querySelector("body");
        container.insertAdjacentHTML("beforeend", `
        <div class="form">
            <form class="form-update">
            <h2>Изменить описание</h2>
                <div class="form-name">
                        <label for="name">Краткое описание</label>
                        <input type="text" name="name" id="name" />
                </div>
                    <div class="form-description">
                        <label for="description">Подробное описание </label>
                        <textarea name="description" id="description" cols="10" rows="3"></textarea>
                    </div>
                    <div class="form-example">
                    <button class="cancel">Отмена</button>
                    <button type="submit" class="cancel">OK</button>
                    </div>
                </form>
        </div>`)

        const form = document.querySelector('.form');
        const formUpdate = document.querySelector(".form-update");
        formUpdate.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formUpdate);
            const ticketForm = {
                id: ticketId,
                name: formData.get("name"),
                description: formData.get("description"),
                status: false,
                created: Date.now(),
            }
            const ticket = new Ticket(ticketForm);
            this.ticketService.update(ticketId, ticket, data => console.log(data))
                .then(() => this.ticketService.list(tickets => TicketView.renderTickets(tickets)))
                .then(() => form.remove())
        })
        this.cancelForForm(form)

    }
}
