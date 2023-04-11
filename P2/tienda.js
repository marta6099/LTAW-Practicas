// Practica 1. Tienda

// Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

// Definición de archivos
const pagina = 'tienda.html';
const pag_error = 'error.html';
const favicon = 'favicon-16x16.png';
//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('inicio.html','utf-8');

//-- HTML de la página de respuesta
const RESPUESTA = fs.readFileSync('usuario.html', 'utf-8');

// Definición de tipos MIME
const mime = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpg",
  "png": "image/png",
  "PNG": "image/PNG",
  "ico": "image/ico",
  "css": "text/css",
  "gif": "image/gif"
};

// Lectura sincrónica del favicon
const faviconData = fs.readFileSync(favicon);

// Definimos el tipo MIME del favicon
const faviconType = mime[favicon.split('.').pop()];

// Creamos el servidor
const server = http.createServer((req, res) => {
  // Indicamos que se ha recibido una petición
  console.log("Petición recibida!");

  // Construimos la URL para posteriormente mostrar su URL
  let myURL = new URL(req.url, 'http://' + req.headers['host'])
  console.log("Esta es tu url! " + myURL.href);

  // Creamos una variable vacia para almacenar las peticiones
  let recurso = "";

  if (myURL.pathname == '/') {
    recurso += pagina;
    console.log(recurso);
  } else {
    recurso += myURL.pathname.substring(1);
    console.log("hola " + recurso);
  }

  if (myURL.pathname == '/favicon.ico') {
    // Petición 200 OK
    res.writeHead(200, {'Content-Type': faviconType});
    console.log("Petición 200 OK para favicon");
    res.write(faviconData);
    res.end();
    return;
  }

  fs.stat(recurso, (error, stats) => {
    if (!error) {
      // Lectura asíncrona
      fs.readFile(recurso, (error, page) => {
        // Petición 200 OK
        res.writeHead(200, {'Content-Type': mime[recurso.split('.').pop()]});
        console.log("Petición 200 OK");
        res.write(page);
        res.end();
      }); 
    } else {
      // Lectura asíncrona
      fs.readFile(pag_error, (error, page) => {
        res.writeHead(404, {'Content-Type': mime['html']});
        res.write(page);
        res.end();    
      }); 
    }
  });
   // Entregar el formulario
   let content = FORMULARIO;
   //-- Leer los parámetros
  let correo = myURL.searchParams.get('Correo');
  let contraseña = myURL.searchParams.get('Contraseña');
  console.log(" Correo: " + correo);
  console.log(" Contraseña: " + contraseña);

  //-- si el usuario es Chuck Norris se añade HTML extra
  let html_extra = "";
  if (nombre=="Marta6099" && apellidos=="12345marta") {
     html_extra = "<h2>Marta6099 no necesita registrarse</h2>";
  }
  content = content.replace("HTML_EXTRA", html_extra);
});

// El servidor escucha, y pasamos una línea que nos lo muestre y además nos diga el puerto.
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto " + PUERTO);