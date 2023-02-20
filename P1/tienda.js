// Practica 1. Tienda

//Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');

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

    }
    else{
      recurso += myURL.pathname.substring(1);
      
    }
    fs.stat(recurso, error => {    
      if (!error) {    
          //-- Lectura asíncrona
          fs.readFile(recurso, (error, page) => {
              //-- Petición 200 OK
              res.writeHead(200, {'Content-Type': mime});
              console.log("Petición 200 OK");
              res.write(page);
              res.end();
          });
  
      }else{
          //-- 404 ERROR
          console.log("404 ERROR");
          //-- Lectura asíncrona
          fs.readFile(pag_error,(error,page) => {
              res.writeHead(404, {'Content-Type': mime});
              res.write(page);
              res.end();    
          });
      }; 
  });
  });

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

  //El servidor escucha, y pasamos una linea que nos lo muestre y ademas nos diga el puerto.
  server.listen(PUERTO);
  console.log("Servidor activado. Escuchando en puerto " + PUERTO);