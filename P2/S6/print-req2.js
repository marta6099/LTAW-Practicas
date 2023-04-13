const http = require('http');
const fs = require('fs');
const { url } = require('inspector');

const PUERTO = 8080;

const FORMULARIO = fs.readFileSync('form2.html', 'utf-8');
const RESPUESTA = fs.readFileSync('form1-resp.html', 'utf-8');

const server = http.createServer((req, res) => {

    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log('');
    console.log('Metodo: ' + req.method);
    console.log('Recurso: ' + req.url);
    console.log('  Ruta: ', myURL.pathname);
    console.log('  Parametros: ' + myURL.searchParams);

    let content_type = 'text/html';
    let content = FORMULARIO;

    if (myURL.pathname == '/procesar') {
        content_type = 'text/html';
        content = RESPUESTA;
    }

    req.on('data', (cuerpo) => {

        req.setEncoding('utf-8');
        console.log(`Cuerpo (${cuerpo.length} bytes)`);
        console.log(`${cuerpo}`);
    })

    req.on('end', () => {
        res.setHeader('content-Type', content_type);
        res.write(content);
        res.end();
    })
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);