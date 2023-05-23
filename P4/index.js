const electron = require('electron');


console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz

const btn_test = document.getElementById("btn_test");

const display = document.getElementById("display");
//Arquitectura
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
//
const print = document.getElementById("print");

//Veriones
const nodeVersionElement = document.getElementById('nodeVersionElement');
const electronVersionElement = document.getElementById('electronVersionElement');
const chromeVersionElement = document.getElementById('chromeVersionElement');

//Chat
const msg_entry = document.getElementById("msg_entry");
const usernameInput = document.getElementById("username");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();
nodeVersionElement.textContent = process.version;
electronVersionElement.textContent = process.versions.electron;
chromeVersionElement.textContent = process.versions.chrome;

//-- Crear un websocket. Se establece la conexión con el servidor
/* const io = require('socket.io-client');
const socket = io('http://localhost:9000'); */
let user = "";

electron.ipcRenderer.on('informacion', (event, message) => {
  console.log("Recibido: " + message);
});


//-- Numero de usuarios
electron.ipcRenderer.on('users', (event, message) => {
  console.log("Recibido: " + message);
  num_usuarios.textContent = message;
});

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('msg_client', (event, message) => {
    console.log("Recibido: " + message);
    display.innerHTML += message + '</br>';
  });

//Mensajes enviados al proceso MAIN
  btn_test.onclick = () => {
    console.log("Botón apretado!");
     //-- Enviar mensaje al proceso principal
     electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}