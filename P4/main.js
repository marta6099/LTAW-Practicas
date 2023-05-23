//Practica 4 Marta Garrido

// Cargamos el modulo de electron
const electron = require('electron');
//Cargamos dependencias para el chat
const socketio = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

//Puerto
const PUERTO = 9000;

//Cargamos lo del qr
//const qrcode = require('qrcode');

// Creamos una nueva aplicacion
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.createServer(app);

//-- Crear el servidor de websockets asociado a un servidor http (previamente creado)
const io = socketio(server)

//Imprimimos el mensaje en la consola
console.log("Hola desde el proceso de la web...");

// Definimos una lista de usuarios conectados
const connectedUsers = {};
let typingUsers = {}; // Declaración de la variable

//Variable para acceder a la ventana principal
let win = null;


// Cuando electron este listo
electron.app.on('ready', () => {
    console.log("Evento Ready!");
    // Creamos la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,  //-- Anchura 
        height: 600,  //-- Altura

    //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
        
    });
    // Para quitar el menu
    // win.setMenuBarVisibility(false)
    win.loadFile("menu.html");
//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    path = __dirname + '/chat.html';
    res.sendFile(path);
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
    //Enviamos numero usuarios al renderer
    win.webContents.send('users', user_count);

    //Mensaje que llega al cliente
    socket.on('message', (msg) =>{
      
      //Debemos añadir los comandos
      if(msg.startsWith('/')){
        //Creamos una variable que obtendra el valor de lo que va despues del /
        const comando = msg.slice(1);
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
          socket.send(`El comando "${command}" no es válido`);
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
      //Enviamos numero usuarios al renderer
    win.webContents.send('users', user_count);
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
      win.webContents.send('msg_client', msg);
      //-- Reenviarlo a todos los clientes conectados
      /* io.send(msg); */
    });
  });
  
    win.on('ready-to-show', () => {
        win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
      });
      win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

    });

      electron.ipcMain.handle('test', (event, msg) => {
        console.log("-> Mensaje: " + msg);
        // Reenviar el mensaje a todos los clientes (ventanas) abiertos
       electron.BrowserWindow.getAllWindows().forEach(window => {
       window.webContents.send('test', msg);
       io.send(msg);
      });
    });
   /*  let fichero = "menu.html"
    win.loadFile(fichero); */
  

  
  //-- Lanzar el servidor HTTP
  //-- ¡Que empiecen los juegos de los WebSockets!
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);
