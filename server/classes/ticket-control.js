const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;


    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0; // PARA SABER CUAL FUE EL ULTIMO TICKET
        this.hoy = new Date().getDate(); // La fecha exacta
        this.tickets = [];
        this.ultimos4 = [];


        let data = require('../data/data.json'); // Aqui estamos llamando la informacion del data.json

        console.log(data);

        if (data.hoy === this.hoy) { // preguntamos esto para que cada dia se reinicie el conteo.
            //si sigue siendo el mismo dia, entonces entra a este if
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {

            this.reiniciarConteo();
        }

    }

    siguienteTicket() {


        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `ticket ${this.ultimo}`


    }

    getUltimoTicket() {

        return `ticket ${this.ultimo}`

    }

    getUltimos4() {

        return this.ultimos4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.pop(); //borra el ultimo del array
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se a inicializado el Sistema');
        this.grabarArchivo();




    }

    grabarArchivo() {

        let jsonData = { //tenemos que reiniciar los valores agregandole los nuevos datos
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        //pero recordemos que se necesita enviar un json como tal perfecto para guardarla en el archivo data.json

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);




    }


}







module.exports = {
    TicketControl
}