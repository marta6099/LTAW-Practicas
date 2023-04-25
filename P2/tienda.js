// Practica 1. Tienda

// Importamos módulos y definimos puerto
const http = require('http');
const fs = require('fs');
const PUERTO = 9000;

// Definición de archivos
const pagina = 'tienda.html';
const pag_error = 'error.html';
const favicon = 'favicon-16x16.png';

// Cookies
let cookie = '';
const PRUEBA_HTML = fs.readFileSync('cookie.html', 'utf-8');

//-- Cargar pagina web del formulario
const FORMULARIO = fs.readFileSync('inicio.html', 'utf-8');
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
// Crteamos la constante para el fichero json
const usu_registrados = 'tienda.json';
let tienda_json = fs.readFileSync(usu_registrados);
let tienda = JSON.parse(tienda_json);
let tproductos =  [];

// Extraer cookies
function get_user(req) {
const cookie = req.headers.cookie; // Leemos la cookie
if (cookie) {
  console.log("Cookie: " + cookie);
  //-- Obtener un array con todos los pares nombre-valor
  let pares = cookie.split(";");

  //-- Variable para guardar el usuario
  let user;

  //-- Recorrer todos los pares nombre-valor
  pares.forEach((element, index) => {
    //-- Obtener los nombres y valores por separado
    let [nombre, valor] = element.split('=');
  });
  return user || null;
} 
}

// SERVIDOR: Atención clientes.
tienda.productos.forEach((element) => {
  tproductos.push(element.nombre);
})

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
  let nombre = myURL.searchParams.get('nickname');
  let apellidos = myURL.searchParams.get('nombre');


  // Para el formulario
  console.log('  Nombre o correo: ' + nombre);
  console.log('  Apellidos: ' + apellidos);
  let user = get_user(req);
  console.log("User: " + user);

  let content_type = 'text/html';
  let content = '';

  user_registrado = get_user(req);
  
  if (myURL.pathname == '/registrar') {
    content_type = 'text/html';

    content = RESPUESTA.replace('NOMBRE', nombre);
    content = content.replace('APELLIDOS', apellidos);

    tienda["usuarios"].forEach(element => {
      if (nombre == element["nickname"] && apellidos == element["nombre"]) {
        console.log("USUARIO CORRECTO");
        res.writeHead(302,{'location': '/tienda.html'});
        res.end();
        if(user){
          res.setHeader('Set-Cookie', "user="+ nombre);
          res.write('/tienda.html');
          res.end();
        }
      }

      else if(nombre != element["nickname"] && apellidos != element["nombre"]) {
        console.log("No registrado");
        res.writeHead(302,{'location': '/usuario.html'});
        res.end();
      }
    });
    
  }
  else{
    console.log("algo");
  } 

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
        res.writeHead(404,{'Content-Type': mime['html']});
        res.write(page);
        res.end();    
      }); 
    }

  }
  );
});


// El servidor escucha, y pasamos una línea que nos lo muestre y además nos diga el puerto.
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto " + PUERTO);