/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
    constructor() {
        this.baseUrl = "http://localhost:7070"
    }

    list(callback) {
        const url = this.baseUrl + "/?method=allTickets"
        return fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => {
                console.log(error);
            });

    }

    get(id, callback) {
        const url = this.baseUrl + `?method=ticketById&id=${id}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
    }

    create(data, callback) {
        return fetch(this.baseUrl + "?method=createTicket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text)
            .then(data => callback(data))
    }

    update(id, data, callback) {
        return fetch(this.baseUrl + `?method=updateById&id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => callback(data))
    }

    delete(id, callback) {
        const url = this.baseUrl + `?method=deleteById&id=${id}`;
        return fetch(url)
            .then(response => response.text)
            .then(data => console.log(data))
    }
}
