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

// Extraer cookies
// let contenido =  PRUEBA_HTML.replace('HTML_EXTRA', '');
const cookie = req.headers.cookie;
    if (cookie) {

        let pares = cookie.split(';');

        let user;

        pares.forEach((element, index) => {

            let [nombre, valor] = element.split('=');

            if (nombre.trim() === 'user') {
                user = valor;
            }
        });

       /*  if (user) {
            
            console.log('user: ' + user);
            contenido = PRUEBA_HTML.replace('HTML_EXTRA', '<h2>Usuario: ' + user + '</h2>');
        } */
    }
// Para el formulario
  let nombre = myURL.searchParams.get('nombre');
    let apellidos = myURL.searchParams.get('apellidos');
    console.log('  Nombre: ' + nombre);
    console.log('  Apellidos: ' + apellidos);

    let content_type = 'text/html';
    let content = FORMULARIO;

    if (myURL.pathname == '/registrar') {
        content_type = 'text/html';

        content = RESPUESTA.replace('NOMBRE', nombre);
        content = content.replace('APELLIDOS', apellidos);

        let html_extra = '';
        if (nombre == 'Chuck' && apellidos == 'Norris') {
            html_extra = '<h2>Chuck Norris no necesita registrarse</h2>';
        }
        content = content.replace('HTML_EXTRA', html_extra);
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
        res.writeHead(404, {'Content-Type': mime['html']});
        res.write(page);
        res.end();    
      }); 
    }

  }
  );
 
 /*  // Registramos usuarios
  if (myURL.pathname == '/registrar') {
    let contenido = '';
  //Leer los datos del formulario
  req.on('data', data => {
    contenido += data;
  });
  // Procesar los datos del formulario
req.on('end', () => {
  const datos = new URLSearchParams(contenido);
  const nombre = datos.get('nombre');
  const apellidos = datos.get('apellidos');
  const correo = datos.get('correo');
  const contrasena = datos.get('contrasena');

  // Verificar si el usuario ya está registrado
  if (USUARIOS.some(u => u.correo === correo)) {
    res.writeHead(409, { 'Content-Type': 'text/plain' });
    res.end('El usuario ya está registrado');
    return;
  }

  // Agregar el nuevo usuario
  USUARIOS.push({ nombre, apellidos, correo, contrasena });
  console.log('Usuario registrado:', { nombre, apellidos, correo, contrasena });

  // Redirigir a la página de inicio de sesión
  res.writeHead(302, { 'Location': '/inicio-sesion' });
  res.end();
});

return;
  }

// Inicio de sesión
if (myURL.pathname == '/iniciar-sesion') {
  let contenido = '';
// Leer los datos del formulario
req.on('data', data => {
  contenido += data;

});

// Procesar los datos del formulario
req.on('end', () => {
  const datos = new URLSearchParams(contenido);
  const correo = datos.get('correo');
  const contrasena = datos.get('contrasena');

  // Verificar si el usuario existe y las credenciales son correctas
  const USUARIOS = USUARIOS.find(u => u.correo === correo && u.contrasena === contrasena);
 
});
}; */


});


// El servidor escucha, y pasamos una línea que nos lo muestre y además nos diga el puerto.
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto " + PUERTO);