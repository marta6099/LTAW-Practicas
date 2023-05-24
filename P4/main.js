//Fichero main.js
// Cargamos el módulo de electron
const electron = require('electron');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const colors = require('colors');

// Puerto
const PUERTO = 9000;

// Creamos una nueva aplicación de Express
const app = express();

// Servidor HTTP asociado a la aplicación de Express
const server = http.createServer(app);

// Servidor de WebSockets asociado al servidor HTTP
const io = socketio(server);

// Definimos una lista de usuarios conectados
const connectedUsers = {};

// Variable para acceder a la ventana principal
let win = null;

// Puntos de entrada de la aplicación web
app.get('/', (req, res) => {
  const path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Solicitando acceso al chat");
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
    }
  });

  socket.on("message", (msg) => {
    console.log("Mensaje Recibido!: " + msg.blue);
    win.webContents.send('msg_client', msg);
  });

  socket.on('disconnect', function () {
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    delete connectedUsers[socket.id];
    win.webContents.send('users', Object.keys(connectedUsers).length);
  });
});


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

/*   win.on('ready-to-show', () => {
    win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
    console.log("entras?")
  }); */
});

// Escuchando en el puerto especificado
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

electron.ipcMain.handle('test', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  electron.BrowserWindow.getAllWindows().forEach(window => {
    window.webContents.send('test', msg);
    io.send(msg);
  });
});
