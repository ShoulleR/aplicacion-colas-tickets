var socket = io();


socket.on('connect', function() {
    console.log('Conectado al Servidor');
});


socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});


var labelticket1 = $('#lblTicket1');
var labelticket2 = $('#lblTicket2');
var labelticket3 = $('#lblTicket3');
var labelticket4 = $('#lblTicket4');

var labelEscritorio1 = $('#lblEscritorio1'); //HACEMOS REFERENCIA A PUBLICO.HTML LOS ID CORRESPONDIENTES
var labelEscritorio2 = $('#lblEscritorio2');
var labelEscritorio3 = $('#lblEscritorio3');
var labelEscritorio4 = $('#lblEscritorio4');


var lblTickets = [labelticket1, labelticket2, labelticket3, labelticket4];
var lblEscritorios = [labelEscritorio1, labelEscritorio2, labelEscritorio3, labelEscritorio4];

function actualizaPublic(ultimos4) {

    for (var i in ultimos4) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }

}




socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaPublic(data.ultimos4);
});


socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3'); //aqui le decimos que cuanto se haga click y se genere un nuevo ticket de atencion suene el audio
    audio.play();
    actualizaPublic(data)
});