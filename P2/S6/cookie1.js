const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

const PRUEBA_HTML = fs.readFileSync('prueba_html.html', 'utf-8');

const server = http.createServer((req, res) => {

    const cookie = req.headers.cookie;
    if (cookie) {
        console.log('Cookie: ' + cookie);
    } else {
        console.log('Peticion sin cookie');
    }

    let content_type = 'text/html';
    let content =  PRUEBA_HTML;

    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);