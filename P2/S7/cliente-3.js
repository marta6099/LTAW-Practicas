console.log("Ejecutando Javascript...");

// Elementos HTML para mostrar info
const display1 = document.getElementById("display1");
const display2 = document.getElementById("display2");

// Botones
const boton_test = document.getElementById("boton_test");
const boton_ajax = document.getElementById("boton_ajax");

// Retrollamada botón de test
boton_test.onclick = () => {
    display1.innerHTML += "<p>Hola desde JS!</p>";
}

// Retrollamada del boton de ver productos
boton_ajax.onclick = () => {

    display2.innerHTML += "<p>Haciendo petición...</p>";

    // Objeto para hacer peticiones AJAX
    const m = new XMLHttpRequest();

    // Función de callback cuando hay cambios en la petición
    m.onreadystatechange = () => {

        // Petición enviada y recibida
        if (m.readyState == 4) {

            console.log("Petición recibida");
            console.log("status: " + m.status);

            // Si la respuesta es correcta
            if (m.status = 200) {

                // La respuesta es un JSON
                let productos = JSON.parse(m.responseText);

                // Meter resultado en HTML
                display2.innerHTML += "<p>";

                // Recorrer los productos del JSON
                for (let i = 0; i < productos.length; i++) {
                    display2.innerHTML += productos[i];

                    // Separamos los productos con ,
                    if (i < productos.length - 1) {
                        display2.innerHTML += ', ';
                    }
                }

                // Cerrar el párrafo
                display2.innerHTML += "</p>";
            } else {

                // Hay un error en la petición
                console.log("Error en la petición: " + m.status + " " + m.statusText);
                display2.innerHTML += "<p>ERROR</p>";
            }
        }
    }

    // Configurar y enviar la petición
    m.open("GET", "/productos?param1=hola&param2=wei", true);
    m.send();
}