//COMANDO PARA ESTABLECER UNA COMUNICACION ACTIVA CON EL SERVIDOR  // esto es front

var socket = io();

var label = $('#lblNuevoTicket'); // ESTO ES JQUERY INVESTIGAR. LE DECIMOS QUE HAGA REFERENCIA A ESE LABEL CON ESE ID


socket.on('connect', function() {
    console.log('Conectado al Servidor');
});


socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});


socket.on('estadoActual', function(siguienteTicket) {
    label.text(siguienteTicket.actual);

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);
    });

});