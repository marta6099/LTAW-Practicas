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

    win.on('ready-to-show', () => {
        console.log("HOLA?");
        win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
      });
      win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

    });

      electron.ipcMain.handle('test', (event, msg) => {
        console.log("-> Mensaje: " + msg);
      });

