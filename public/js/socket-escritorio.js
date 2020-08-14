var socket = io();




var searchParams = new URLSearchParams(window.location.search); // ESTO TRAE TODOS LOS PARAMETROS DEL URL 
console.log(searchParams);

if (!searchParams.has('escritorio')) { //retorna true si tiene la propiedad escritorio
    window.location = 'index.html'; // con esto le decimos que salga de esa pantalla
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //con esto le decimos que tome el escritorio de los params

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio); //jquery hace referencia al h1 y cambia el texto
var label = $('small');

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No Hay Tickets') {
            alert(resp);
            return;
        }

        label.text(`Ticket ${resp.numero}`);

    });

});