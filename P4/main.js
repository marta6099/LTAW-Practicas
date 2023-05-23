//Fichero main.js
// Cargamos el modulo de electron
const electron = require('electron');
// Cargamos dependencias para el chat
const socketio = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

// Puerto
const PUERTO = 9000;

// Creamos una nueva aplicación
const app = express();

// -- Creamos el servidor, asociado a la aplicación de Express
const server = http.createServer(app);

// -- Creamos el servidor de WebSockets asociado al servidor HTTP
const io = socketio(server);

// Definimos una lista de usuarios conectados
const connectedUsers = {};
let typingUsers = {};

// Variable para acceder a la ventana principal
let win = null;

// Cuando Electron esté listo
electron.app.on('ready', () => {
  console.log("Evento Ready!");
  // Creamos la ventana principal de nuestra aplicación
  win = new electron.BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("menu.html");

  // Puntos de entrada de la aplicación web
  app.get('/', (req, res) => {
    path = __dirname + '/chat.html';
    res.sendFile(path);
  });

  app.use('/', express.static(__dirname + '/'));
  app.use(express.static('public'));

  // Gestión de WebSockets
  io.on('connect', (socket) => {
    console.log('** NUEVA CONEXIÓN **'.yellow);
    socket.emit('message', 'Bienvenido al chat');
    socket.broadcast.emit('message', 'Un nuevo usuario se ha conectado');

    connectedUsers[socket.id] = {};
    win.webContents.send('users', Object.keys(connectedUsers).length);

    socket.on('message', (msg) => {
      if (msg.startsWith('/')) {
        const comando = msg.slice(1);
        switch (comando) {
          case 'help':
            socket.send('Comandos del chat disponibles: /help, /list, /hello, /date');
            break;
          case 'list':
            const num_usuarios = Object.keys(connectedUsers).length;
            socket.send(`Hay ${num_usuarios} usuarios conectados`);
            break;
          case 'hello':
            socket.send('Lo primero de todo, ¿cómo están los maquinas?');
            break;
          case 'date':
            const date = new Date().toLocaleDateString();
            socket.send(`La fecha actual es: ${date}`);
            break;
          default:
            socket.send(`El comando "${comando}" no es válido`);
        }
      } else {
        io.send(msg);

        const typingUserIds = Object.keys(typingUsers);
        if (typingUserIds.length > 0) {
          const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
          const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
          socket.emit('typing', typingMessage);
        }
      }
    });

    socket.on('disconnect', function () {
      console.log('** CONEXIÓN TERMINADA **'.yellow);
      delete connectedUsers[socket.id];
      delete typingUsers[socket.id];

      const typingUserIds = Object.keys(typingUsers);
      if (typingUserIds.length > 0) {
        const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
        const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
        io.emit('typing', typingMessage);
      } else {
        io.emit('typing', '');
      }

      win.webContents.send('users', Object.keys(connectedUsers).length);
    });

    socket.on('typingStart', () => {
      typingUsers[socket.id] = true;

      const typingUserIds = Object.keys(typingUsers);
      if (typingUserIds.length > 0) {
        const typingUsernames = typingUserIds.map(id => connectedUsers[id].username);
        const typingMessage = typingUsernames.join(', ') + ' están escribiendo...';
        io.emit('typing', typingMessage);
      }
    });

    socket.on("message", (msg) => {
      console.log("Mensaje Recibido!: " + msg.blue);
      win.webContents.send('msg_client', msg);
    });
  });

  win.on('ready-to-show', () => {
    win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
  });

  win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

});

electron.ipcMain.handle('test', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  electron.BrowserWindow.getAllWindows().forEach(window => {
    window.webContents.send('test', msg);
    io.send(msg);
  });
});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
