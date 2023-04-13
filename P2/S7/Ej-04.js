// Servidor JSON

const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

// Página de error
const ERROR = fs.readFileSync('error_page.html');

// Página web principal
const MAIN = fs. readFileSync('Ej-04.html', 'utf-8');

// Leer JSON con los productos
const PRODUCTOS_JSON = fs.readFileSync('Ej-01.json');

// Bucle principal del servidor
const server = http.createServer((req, res) => {

    // URL de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);

    // Leer parámetros
    let param1 = myURL.searchParams.get('param1');
    let param2 = myURL.searchParams.get('param2');

    // Variables respuesta
    let content_type = "text/html";
    let content = "";

    // Leer recurso y eliminar la /
    let recurso = myURL.pathname;
    recurso = recurso.slice(1);

    switch (recurso) {
        case '':
            console.log("Main Page");
            content = MAIN;
            break;

        case 'productos':
            console.log("Petición de productos");
            content_type = "application/json";
            content = PRODUCTOS_JSON;
            console.log('param1: ' + param1);
            console.log('param2: ' + param2);
            break;
    
        case 'cliente-3.js':
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
        default:
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }

    // Respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();

})

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);