// Practica 1. Tienda

//Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 9000;
//-- Creamos el servidor. 

const server = http.createServer((req, res) => {
    
    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");
  });
  // Activamos el servidor

  server.listen(PUERTO);
  console.log("Servidor activado. Escuchando en puerto" + PUERTO);