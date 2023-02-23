// Practica 1

const http = require('http');
const fs = require('fs'); // pARA ACCEDER A LOS FICHEROS DE NUESTRO ORDENADOR

const PUERTO = 9000;
//Realizamos la lectura del documento.
const indice = fs.readFileSync('tienda.html','utf8')
const page_error = fs.readFileSync('error.html','utf8')
//-- Texto HTML
const recurso = ""
const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");
    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = indice;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud

    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname == '/') {
        recurso += indice;
        console.log(recurso);
    }
    else {
        recurso += myURL.pathname.substring(1);
        console.log("hola " + recurso)
    }
    fs.stat(recurso, error => {  
        fs.readFile(pag_error,(error,page) => {
              res.writeHead(404, {'Content-Type': mime});
              res.write(page);
              res.end(); 
        });
    });



    //-- Generar la respusta en función de las variables
    //-- code, code_msg y pag
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type','text/html');
    res.write(pagina);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 6. Happy Server HTML!. Escuchando en puerto: " + PUERTO);