// Practica 1. Tienda

//Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 9000;

//-- Construir un objeto URL
//const myURL = new URL(req.url, 'http://' + req.headers['host']);;
//-- Creamos el servidor. 
const pagina = 'tienda.html';
const pag_error = 'error.html';

const server = http.createServer((req, res) => {
    
    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");

    //Construimos la url para posteriormente mostrar su URL
    let myURL = new URL(req.url, 'http://' + req.headers['host'])
    console.log("Esta es tu url! "+ myURL.href);


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