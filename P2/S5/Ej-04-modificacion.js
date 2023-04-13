const fs = require('fs');

// nombre del fichero json que queremos leer
const FICHERO_JSON = "Ej-03-fichero-json.json";

// nombre del fichero json de salida
const FICHERO_JSON_OUT = "Ej-04-modificacion.json";

// leer el fichero
const tienda_json = fs.readFileSync(FICHERO_JSON);

// crear la estructura a partir del fichero
const tienda = JSON.parse(tienda_json);

// modificamos algun dato, en este caso el nombre del P2
tienda[1]["nombre"] = "Producto2Nuevo";

// Mostrar cosas de la tienda
console.log("Productos en la tienda: " + tienda.length);

tienda.forEach((element, index)=>{
    console.log("Producto " + (index + 1) + ": " + element["nombre"]);
});

// volver a convertir la cadena nueva a JSON
let myJSON = JSON.stringify(tienda);

// guardarla en el fichero de salida
fs.writeFileSync(FICHERO_JSON_OUT, myJSON);
console.log("Información guardada en el fichero: " + FICHERO_JSON_OUT);