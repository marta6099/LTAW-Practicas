//Practica 4 Marta Garrido

// Cargamos el modulo de electron
const electron = require('electron');

//Cargamos lo del qr
//const qrcode = require('qrcode');

//Imprimimos el mensaje en la consola
console.log("Hola desde el proceso de la web...");

//Variable para acceder a la ventana principal
let win = null;

// Cuando electron este listo
electron.app.on('ready', () => {
    console.log("Evento Ready!");
    // Creamos la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,  //-- Anchura 
        height: 400  //-- Altura
    });
    // Para quitar el menu
    // win.setMenuBarVisibility(false)
    win.loadFile("menu.html");
});
