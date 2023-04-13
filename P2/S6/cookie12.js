const http = require('http');
const fs = require('fs');
const PUERTO = 8080;

const PRUEBA_HTML = fs.readFileSync('prueba_html2.html', 'utf-8');

const server = http.createServer((req, res) => {

    let content_type = 'text/html';
    let content =  PRUEBA_HTML.replace('HTML_EXTRA', '');

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

        if (user) {
            
            console.log('user: ' + user);
            content = PRUEBA_HTML.replace('HTML_EXTRA', '<h2>Usuario: ' + user + '</h2>');
        }
    }

    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);