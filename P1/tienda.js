// Practica 1. Tienda

//Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');

const PUERTO = 9000;

//-- Construir un objeto URL
const myURL = new URL(req.url, 'http://' + req.headers['host']);;
//-- Creamos el servidor. 

const server = http.createServer((req, res) => {
    
    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");
  });
  // Activamos el servidor

  server.listen(PUERTO);
  console.log("Servidor activado. Escuchando en puerto " + PUERTO);

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