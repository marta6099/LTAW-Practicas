//Fichero index.js
const electron = require('electron');
const ip = require('ip');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz

const btn_test = document.getElementById("btn_test");

//const display = document.getElementById("display");
//Arquitectura
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
// Puerto
const PUERTO = 9000;

//Veriones
const nodeVersionElement = document.getElementById('nodeVersionElement');
const electronVersionElement = document.getElementById('electronVersionElement');
const chromeVersionElement = document.getElementById('chromeVersionElement');
const qrcode = require('qrcode');
console.log(ip.address());
//Chat
/* const msg_entry = document.getElementById("msg_entry");
const usernameInput = document.getElementById("username"); */
//
const num_usuarios = document.getElementById("users");
const ipAddressElement = document.getElementById('ip-address');
/* const mensajes = document.getElementById("displays"); */
const code = document.getElementById("qrcode");

//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso principal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();
nodeVersionElement.textContent = process.version;
electronVersionElement.textContent = process.versions.electron;
chromeVersionElement.textContent = process.versions.chrome;
//


let user = "";

electron.ipcRenderer.on('informacion', (event, message) => {
  console.log("Recibido: " + message);

});

//-- Numero de usuarios
electron.ipcRenderer.on('users', (event, message) => {
  console.log("Recibido: " + message);
  num_usuarios.textContent = message;
  /* mensajes.innerHTML = msg + '/chat.html';
  mensajes.href = msg + '/chat.html'; */
});
//--IP
electron.ipcRenderer.on('serverIp', (event, message) => {
  const url = `http://${message}:${PUERTO}/chat.html`;
  ipAddressElement.textContent = url;
  console.log("entras?")
  qrcode.toDataURL(url, function(err, qrUrl) {
    if (err) {
      console.error(err);
      return;
    }
    code.src = qrUrl;
});
});

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('msg_client', (event, message) => {
  console.log("Recibido: " + message);
  displays.innerHTML += message + '</br>';
});

//Mensajes enviados al proceso MAIN
btn_test.onclick = () => {
  console.log("Botón apretado!");
  //-- Enviar mensaje al proceso principal
  electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
};

