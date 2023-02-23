// Practica 1. Tienda

// Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

// Definición de archivos
const pagina = 'tienda.html';
const pag_error = 'error.html';

// Definición de tipos MIME
const mime = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "PNG": "image/PNG",
  "ico": "image/ico",
  "css": "text/css",
};

// Creamos el servidor
const server = http.createServer((req, res) => {
  // Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  // Construimos la URL para posteriormente mostrar su URL
  let myURL = new URL(req.url, 'http://' + req.headers['host'])
  console.log("Esta es tu url! " + myURL.href);

  // Creamos una variable vacia para almacenar las peticiones
  let recurso = "";

  if (myURL.pathname == '/') {
    recurso += pagina;
    console.log(recurso);
  } else {
    recurso += myURL.pathname.substring(1);
    console.log("hola " + recurso);
  }

  fs.stat(recurso, (error, stats) => {
    if (!error) {
      // Lectura asíncrona
      fs.readFile(recurso, (error, page) => {
        // Petición 200 OK
        res.writeHead(200, {'Content-Type': mime[recurso.split('.').pop()]});
        console.log("Petición 200 OK");
        res.write(page);
        res.end();
      }); 
    } else {
      // Lectura asíncrona
      fs.readFile(pag_error, (error, page) => {
        res.writeHead(404, {'Content-Type': mime['html']});
        res.write(page);
        res.end();    
      }); 
    }
  });
});

// El servidor escucha, y pasamos una línea que nos lo muestre y además nos diga el puerto.
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto " + PUERTO);