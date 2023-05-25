// Practica 3 - Marta Garrido 

//Cargamos el modulo socket.io
const socketio = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

//Creamos una nueva aplicación web
const app = express();

//Declaramos el puerto
const PUERTO = 9000;


//-- Crear un servidor, asosiaco a la App de express
const server = http.createServer(app);

//-- Crear el servidor de websockets asociado a un servidor http (previamente creado)
const io = socketio(server);

// Definimos una lista de usuarios conectados
const connectedUsers = {};
let typingUsers = {}; // Declaración de la variable


//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.send('Bienvenido a mi chat Web!!!' + '<p><a href="/chat.html">Pruebame</a></p>');
  });
  
  //-- Esto es necesario para que el servidor le envíe al cliente la
  //-- biblioteca socket.io para el cliente
  app.use('/', express.static(__dirname +'/'));
  
  //-- El directorio publico contiene ficheros estáticos
  app.use(express.static('public'));
  
  //------------------- GESTION SOCKETS IO
  //-- Evento: Nueva conexion recibida
  io.on('connect', (socket) => {
    
    console.log('** NUEVA CONEXIÓN **'.yellow);
    
    socket.emit('message', 'Bienvenido al chat');
    
    // Avisamos a todos los demás usuarios de que ha entrado un nuevo usuario
    socket.broadcast.emit('message', 'Un nuevo usuario se ha conectado');
  
    //Añadimos el usuario a la lista
    connectedUsers[socket.id] = {};

    //Mensaje que llega al cliente
    socket.on('message', (msg) =>{
      
      //Debemos añadir los comandos
      if(msg.split('/')[1]){
        //Creamos una variable que obtendra el valor de lo que va despues del /
        const comando = msg.split("/")[1];
        switch (comando){
          case 'help':
            socket.send('Comandos del chat disponibles: /help, /list, /hello, /date');
            break;
          case 'list':
            const num_usuarios = Object.keys(connectedUsers).length;
            socket.send(`Hay ${num_usuarios} usuarios conectados`);
            break;
          case 'hello':
            socket.send('Lo primero de todo, como estan los maquinas?');
          break;
          case 'date':
          const date = new Date().toLocaleDateString();
          socket.send(`La fecha actual es: ${date}`);
          break;
        default:
          socket.send(`El comando "${comando}" no es válido`);
          break;
        }
      } else {
         // Si el mensaje no es un comando, lo reenviamos a todos los usuarios
        io.send(msg);

      const typingUserIds = Object.keys(typingUsers);
      if (typingUserIds.length > 0) {
        const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
        const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
        socket.emit('typing', typingMessage);
      }
    }
    }); 
  //-- Evento de desconexión
    socket.on('disconnect', function(){
      console.log('** CONEXIÓN TERMINADA **'.yellow);
      // Borramos al usuario de la lista de usuarios conectados
  /*   delete connectedUsers[socket.id];
    delete typingUsers[socket.id]; */
     // Enviar mensaje de usuarios escribiendo actualizado
     const typingUserIds = Object.keys(typingUsers);
     if (typingUserIds.length > 0) {
       const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
       const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
       io.emit('typing', typingMessage);
     } else {
       io.emit('typing', '');
     }
    // Avisamos a todos los demás usuarios de que ha entrado un nuevo usuario
    io.emit('message', 'Un usuario se ha desconectado');
   }); 
    // Eventos de escribir o dejar de escribir
  socket.on('typingStart', () => {
    typingUsers[socket.id] = true;

    // Enviar mensaje de usuarios escribiendo actualizado
    const typingUserIds = Object.keys(typingUsers);
    if (typingUserIds.length > 0) {
      const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
      const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
      io.emit('typing', typingMessage);
    }
  });
  
    //-- Mensaje recibido: Hacer eco
    socket.on("message", (msg)=> {
      console.log("Mensaje Recibido!: " + msg.blue);
  
      //-- Reenviarlo a todos los clientes conectados
      /* io.send(msg); */
    });
  });
  
  //-- Lanzar el servidor HTTP
  //-- ¡Que empiecen los juegos de los WebSockets!
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);