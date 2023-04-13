const http = require('http');
const fs = require('fs');
const { url } = require('inspector');

const PUERTO = 8080;

const FORMULARIO = fs.readFileSync('form1.html', 'utf-8');
const RESPUESTA = fs.readFileSync('form1-resp2.html', 'utf-8');

const server = http.createServer((req, res) => {

    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    let nombre = myURL.searchParams.get('nombre');
    let apellidos = myURL.searchParams.get('apellidos');
    console.log('  Nombre: ' + nombre);
    console.log('  Apellidos: ' + apellidos);

    let content_type = 'text/html';
    let content = FORMULARIO;

    if (myURL.pathname == '/procesar') {
        content_type = 'text/html';

        content = RESPUESTA.replace('NOMBRE', nombre);
        content = content.replace('APELLIDOS', apellidos);

        let html_extra = '';
        if (nombre == 'Chuck' && apellidos == 'Norris') {
            html_extra = '<h2>Chuck Norris no necesita registrarse</h2>';
        }
        content = content.replace('HTML_EXTRA', html_extra);
    }

    res.setHeader('content-Type', content_type);
    res.write(content);
    res.end();
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);