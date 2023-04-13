// Servidor JSON

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

// Página web principal
const MAIN = fs. readFileSync('Ej-02.html', 'utf8');

// Leer JSON con los productos
const PRODUCTOS_JSON = fs.readFileSync('Ej-01.json');

// Bucle principal del servidor
const server = http.createServer((req, res) => {

    // URL de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);

    // Página principal por defecto
    let content_type = "text/html";
    let content = MAIN;

    // Leer recurso y eliminar la /
    let recurso = myURL.pathname;
    recurso = recurso.slice(1);

    switch (recurso) {
        case 'productos':
            content_type = "application/json";
            content = PRODUCTOS_JSON;
            break;
    
        case 'cliente-1.js':
            // Leer javascript
            console.log("recurso: " + recurso);
            fs.readFile(recurso, 'utf-8', (err, data) => {
                if (err) {
                    console.log("Error: " + err);
                    return;
                } else {
                    res.setHeader('Content-Type', 'application/javascript');
                    res.write(data);
                    res.end();
                }
            });

            return;
            break;
    }

    // Respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();

})

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);