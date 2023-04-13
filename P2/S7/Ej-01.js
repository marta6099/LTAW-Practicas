// Servidor JSON

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

// Página web principal
const MAIN = fs. readFileSync('Ej-01.html', 'utf8');

// Leer JSON con los productos
const PRODUCTOS_JSON = fs.readFileSync('Ej-01.json');

// Bucle principal del servidor
const server = http.createServer((req, res) => {

    // URL de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);

    // Página principal por defecto
    let content_type = "text/html";
    let content = MAIN;

    if (myURL.pathname == '/productos') {
        content_type = "application/json";
        content = PRODUCTOS_JSON;
    }

    // Respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();

})

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);