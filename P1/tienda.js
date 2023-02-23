// Practica 1. Tienda

//Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 9000;

//-- Creamos el servidor. 
const pagina = 'tienda.html';
const pag_error = 'error.html';

const server = http.createServer((req, res) => {
  //-- Indicamos que se ha recibido una petición
console.log("Petición recibida!");

//Construimos la url para posteriormente mostrar su URL
let myURL = new URL(req.url, 'http://' + req.headers['host'])
console.log("Esta es tu url! "+ myURL.href);
// Creamos una variable vacia para almacenar las peticiones
let recurso = "";
if(myURL.pathname == '/'){
  recurso += pagina;
  console.log(recurso);
  console.log(myURL.pathname + recurso)
}
else{
  recurso += myURL.pathname.substring(1);
  console.log(recurso)
}

//Definicion de todos los tipos de archivo
const mime = {
  "html" : "text/html",
  "jpeg" : "image/jpeg",
  "jpg" : "image/jpg",
  "png" : "image/png",
  "PNG" : "image/PNG",
  "ico" : "image/ico",
  "css" : "text/css",
};

fs.stat(recurso, error => {   
  if (!error) {
    //Obtenemos la extension del archivo
    let extension = recurso.split(".").pop();
    //Obtenemos el tipo MIME del archivo
    let mimeType = mime[extension] || 'text/plain';
    //-- Lectura asíncrona
    fs.readFile(recurso, (error, page) => {
        //-- Petición 200 OK
        res.writeHead(200, {'Content-Type': mimeType});
        console.log("Petición 200 OK");
        res.write(page);
        res.end();
    }); 
  } else {
      //-- Lectura asíncrona
      fs.readFile(pag_error,(error,page) => {
          res.writeHead(404, {'Content-Type': mime.html});
          res.write(page);
          res.end();    
      }); 
  }
});
  //El servidor escucha, y pasamos una linea que nos lo muestre y ademas nos diga el puerto.
  server.listen(PUERTO);
  console.log("Servidor activado. Escuchando en puerto " + PUERTO);
});